export default function personReducer(state = [], action) {
  switch(action.type) {
    case 'CREATE_PERSON':
      return [...state, Object.assign({}, action.person)];
    default:
      return state;
  }
}
