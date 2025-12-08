// js/render-pictures.js

import { openBigPicture } from './big-picture.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document
  .querySelector('#picture')
  .content
  .querySelector('.picture');

const createPictureElement = (picture) => {
  const { url, description, likes, comments } = picture;
  const pictureElement = pictureTemplate.cloneNode(true);

  const img = pictureElement.querySelector('.picture__img');
  img.src = url;
  img.alt = description;

  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent =
    Array.isArray(comments) ? comments.length : comments;

  pictureElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    openBigPicture(picture);
  });

  return pictureElement;
};

const renderPictures = (pictures) => {
  const fragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    fragment.append(createPictureElement(picture));
  });

  picturesContainer.append(fragment);
};

export { renderPictures };
