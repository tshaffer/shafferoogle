const initialState =
  {
    photos: {}
  };


export default function(state = initialState, action) {
  console.log(action);
  return state;
}

