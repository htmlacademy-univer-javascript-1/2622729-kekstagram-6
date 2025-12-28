import { renderPictures } from './render-pictures.js';
import { getData } from './api.js';
import { showAlert } from './message.js';
import { initFilters, getFilteredPictures } from './filters.js';
import './form.js';
import './image-edit.js';

getData()
  .then((pictures) => {
    initFilters(pictures, renderPictures);
    renderPictures(getFilteredPictures());
  })
  .catch((err) => {
    showAlert(err.message);
  });
