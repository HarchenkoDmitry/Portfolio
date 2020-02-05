const ADD_POST = 'ADD_POST';
const CHANGE_INPUT = 'CHANGE_INPUT';

let initialState = {
  current: {
    name: '',
    email: '',
    message: ''
  },
  history: [
    {
      name: 'test',
      email: 'test@test.com',
      message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aliquid animi debitis doloremque earum enim, error fugiat hic nam nobis odit optio perspiciatis, quam quo soluta voluptates, voluptatibus! Facere, praesentium.'
    }
  ]
};

const feedbackReducer = (state = initialState, action) => {

  switch (action.type) {
    case ADD_POST:
      let newMessage = {
        name: state.current.name,
        email: state.current.email,
        message: state.current.message
      };

      alert(`
          name: ${newMessage.name} 
          email: ${newMessage.email} 
          message: ${newMessage.message}
        `);

      let copyState = {...state};
      copyState.history = [
        ...state.history,
        newMessage
      ];

      copyState.current.email = '';
      copyState.current.message = '';
      copyState.current.name = '';

      return copyState;
    case CHANGE_INPUT:
      let copyState2 = {...state};
      copyState2.current = {...state.current};
      copyState2.current[action.dataType] = action.data;
      return copyState2;
    default:
      return state;
  }
};

export const addPostActionCreator = () => {
  return ({
    type: ADD_POST
  })
};

export const changeInputActionCreator = (type, value) => {
  return ({
    type: CHANGE_INPUT,
    dataType: type,
    data: value
  })
};

export default feedbackReducer;
