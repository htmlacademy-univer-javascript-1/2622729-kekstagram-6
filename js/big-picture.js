const COMMENTS_PER_PORTION = 5;
let commentsShown = 0;
let comments = [];

const bigPictureElement = document.querySelector('.big-picture');
const bigPictureImgElement = bigPictureElement.querySelector('.big-picture__img img');
const likesCountElement = bigPictureElement.querySelector('.likes-count');
const commentsCountElement = bigPictureElement.querySelector('.comments-count');
const socialCommentsElement = bigPictureElement.querySelector('.social__comments');
const socialCaptionElement = bigPictureElement.querySelector('.social__caption');
const socialCommentCountElement = bigPictureElement.querySelector('.social__comment-count');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
const bodyElement = document.querySelector('body');
const cancelButtonElement = bigPictureElement.querySelector('.big-picture__cancel');

const createCommentElement = (comment) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  const imgElement = document.createElement('img');
  imgElement.classList.add('social__picture');
  imgElement.src = comment.avatar;
  imgElement.alt = comment.name;
  imgElement.width = 35;
  imgElement.height = 35;

  const pElement = document.createElement('p');
  pElement.classList.add('social__text');
  pElement.textContent = comment.message;

  commentElement.appendChild(imgElement);
  commentElement.appendChild(pElement);

  return commentElement;
};

const renderComments = () => {
  commentsShown += COMMENTS_PER_PORTION;

  if (commentsShown >= comments.length) {
    commentsLoaderElement.classList.add('hidden');
    commentsShown = comments.length;
  } else {
    commentsLoaderElement.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < commentsShown; i++) {
    const comment = comments[i];
    const commentElement = createCommentElement(comment);
    fragment.appendChild(commentElement);
  }

  socialCommentsElement.innerHTML = '';
  socialCommentsElement.appendChild(fragment);
  socialCommentCountElement.innerHTML = `${commentsShown} из <span class="comments-count">${comments.length}</span> комментариев`;
};

const closeBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  commentsLoaderElement.removeEventListener('click', onCommentsLoaderClick);
};

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
}

function onCommentsLoaderClick() {
  renderComments();
}

const onCancelButtonClick = () => {
  closeBigPicture();
};

const openBigPicture = (picture) => {
  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');

  bigPictureImgElement.src = picture.url;
  likesCountElement.textContent = picture.likes;
  commentsCountElement.textContent = picture.comments.length;
  socialCaptionElement.textContent = picture.description;

  comments = picture.comments;
  commentsShown = 0;
  renderComments();

  document.addEventListener('keydown', onDocumentKeydown);
  cancelButtonElement.addEventListener('click', onCancelButtonClick);
  commentsLoaderElement.addEventListener('click', onCommentsLoaderClick);
};

export { openBigPicture };
