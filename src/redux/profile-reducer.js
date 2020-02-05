let initialState = {
  name: 'Dmitry',
  surname: 'Kharchenko',
  birthday: '1995-06-30',
  age: getAge(new Date(Date.parse('1995-06-30'))),
  professions: [
    'frontend developer',
    'engineer'
  ]
};

function getAge(birthday) {
  return birthday ? Math.abs(new Date(new Date() - birthday).getFullYear() - 1970) : null;
}

const profileReducer = (state = initialState, action) => {
  return state;
};

export default profileReducer;
