const express = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PORT = 8080;
const app = express();

const cookieParser = require('cookie-parser');
app.use(cookieParser('Banana'));

let cookieId;

app.use((req, res, next) => {
  res.append('Content-Type', 'application/json;charset=UTF-8');
  res.append('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.append('Access-Control-Allow-Credentials', true);
  if (!req.cookies.id) {
    cookieId = new Date().toString();
    res.cookie(
      'id', cookieId, {
        httpOnly: true,
        //signed: true
      })
  } else {
    cookieId = req.cookies.id;
  }

  next();
});

const projectScheme = new Schema({
  name: String,
  annotation: String,
  description: String,
  url: String,
  photo: {
    small: String,
    large: String
  },
  likes: Array,
  data: Date
});

const Project = mongoose.model('Project', projectScheme);

async function start() {
  try {
    await mongoose.connect('mongodb://localhost/portfolio', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    app.listen(PORT, () => {
      console.log('Server started on - ' + PORT);
    });
  } catch (e) {
    console.log(e)
  }
}

app.get('/', function (req, res) {
  res.send('your id: ' + cookieId);
});

app.get('/portfolio', function (req, res) {
  let pageOptions = {
    page: Number(req.query.page) || 1,
    limit: Number(req.query.limit) || 8
  };

  Project
    .find()
    .select('-description -data -photo.large -stack')
    .limit(pageOptions.limit)
    .skip(pageOptions.limit * (pageOptions.page - 1))
    .lean(true)
    .then(projects => {
      projects.map(project => {
        project = addCheckUserLike(project);
        project = getLikesAmount(project);
        return project;
      });
      return projects;
    })
    .then(projects => {
      setTimeout(() => {
        Project
          .estimatedDocumentCount()
          .then(count => {
            res.send({
              projects: projects,
              totalCount: count,
            })
          })
      }, 2000)
    })
    .catch(err => {
      res.send(err)
    })
});


app.get('/portfolio/:id', function (req, res) {
  Project
    .findById(req.params.id)
    .select('-annotation -data -photo.small')
    .lean(true)
    .then(project => {
      project = addCheckUserLike(project);
      project = getLikesAmount(project);
      return project;
    })
    .then(response => {
      setTimeout(() => {
        res.send(response)
      }, 2000)
    });
});

app.post('/like/:id', function (req, res) {
  Project
    .findById(req.params.id)
    .then(response => {
      if (response.likes.includes(cookieId)) {
        res.sendStatus(406)
      } else {
        response.likes.push(cookieId);
        response.save(function (err) {
          if (err) throw err;
          console.log(`project - ${req.params.id} user - ${cookieId} added like`);
        });
        res.sendStatus(200);
      }
    });
});

app.delete('/like/:id', function (req, res) {
  Project
    .findById(req.params.id)
    .then(response => {
      if (!response.likes.includes(cookieId)) {
        res.sendStatus(406)
      } else {
        response.likes = response.likes.filter(id => id !== cookieId);
        response.save(function (err) {
            if (err) throw err;
            console.log(`project - ${req.params.id} user - ${cookieId} remove like`);
          });
        res.sendStatus(200);
      }
    });
});

function getLikesAmount(project) {
  project.likesAmount = project.likes.length;
  delete project.likes;
  return project;
}

function addCheckUserLike(project) {
  project.likes.indexOf(cookieId) !== -1 ?
    project.userLike = true :
    project.userLike = false;
  return project
}

start();
