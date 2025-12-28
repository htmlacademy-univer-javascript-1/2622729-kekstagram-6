import { resetScale, resetEffects } from './image-edit.js';
import { sendData } from './api.js';
import { showSuccessMessage, showErrorMessage } from './message.js';

const MAX_HASHTAG_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const overlay = form.querySelector('.img-upload__overlay');
const cancelButton = form.querySelector('.img-upload__cancel');
const fileField = form.querySelector('.img-upload__input');
const hashtagField = form.querySelector('.text__hashtags');
const commentField = form.querySelector('.text__description');
const submitButton = form.querySelector('.img-upload__submit');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const showModal = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const hideModal = () => {
  form.reset();
  resetScale();
  resetEffects();
  pristine.reset();
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    const isTextFieldFocused =
      document.activeElement === hashtagField ||
      document.activeElement === commentField ||
      evt.target === hashtagField ||
      evt.target === commentField;

    if (isTextFieldFocused) {
      evt.stopPropagation();
      return;
    }

    evt.preventDefault();
    const isErrorMessageExists = document.querySelector('.error');
    if (!isErrorMessageExists) {
      hideModal();
    }
  }
}

const onCancelButtonClick = () => {
  hideModal();
};

const onFileInputChange = () => {
  showModal();
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const normalizeTags = (tagString) => tagString
  .trim()
  .split(' ')
  .filter((tag) => Boolean(tag.length));

const hasValidTags = (value) => normalizeTags(value).every((tag) => VALID_SYMBOLS.test(tag));

const hasValidCount = (value) => normalizeTags(value).length <= MAX_HASHTAG_COUNT;

const hasUniqueTags = (value) => {
  const lowerCaseTags = normalizeTags(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

pristine.addValidator(
  hashtagField,
  hasValidCount,
  'Максимум 5 хэштегов'
);

pristine.addValidator(
  hashtagField,
  hasUniqueTags,
  'Хэштеги не должны повторяться'
);

pristine.addValidator(
  hashtagField,
  hasValidTags,
  'Неправильный формат хэштега'
);

const validateComment = (value) => value.length <= 140;

pristine.addValidator(
  commentField,
  validateComment,
  'Длина комментария не может составлять больше 140 символов'
);

const onFormSubmit = (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    blockSubmitButton();
    sendData(new FormData(evt.target))
      .then(() => {
        showSuccessMessage();
        hideModal();
      })
      .catch(() => {
        showErrorMessage();
      })
      .finally(unblockSubmitButton);
  }
};

fileField.addEventListener('change', onFileInputChange);
cancelButton.addEventListener('click', onCancelButtonClick);
form.addEventListener('submit', onFormSubmit);
