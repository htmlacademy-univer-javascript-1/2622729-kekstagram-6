import { renderPictures } from './render-pictures.js';
import { getData } from './api.js';
import { showAlert } from './message.js';
import './form.js';
import './image-edit.js';

getData()
  .then((pictures) => {
    renderPictures(pictures);
  })
  .catch((err) => {
    showAlert(err.message);
  });
