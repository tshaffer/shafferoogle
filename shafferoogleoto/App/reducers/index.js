import {combineReducers} from 'redux';
import AlbumsReducer from './reducerAlbums';

const rootReducer = combineReducers({
  albums: AlbumsReducer,
});

export default rootReducer;
