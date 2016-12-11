import {combineReducers} from 'redux';
import PhotosReducer from './reducerPhotos';

const rootReducer = combineReducers({
  photos: PhotosReducer,
});

export default rootReducer;
