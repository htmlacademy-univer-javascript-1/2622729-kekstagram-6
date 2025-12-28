const ALERT_SHOW_TIME = 5000;

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '500';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.classList.add('data-error');

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const showMessage = (type) => {
  const template = document.querySelector(`#${type}`).content.querySelector(`.${type}`);
  const messageElement = template.cloneNode(true);
  messageElement.style.zIndex = '100';
  const button = messageElement.querySelector(`.${type}__button`);

  const onMessageEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeMessage();
    }
  };

  const onOutsideClick = (evt) => {
    if (evt.target === messageElement) {
      closeMessage();
    }
  };

  function closeMessage() {
    messageElement.remove();
    document.removeEventListener('keydown', onMessageEscKeydown);
    document.removeEventListener('click', onOutsideClick);
  }

  button.addEventListener('click', () => {
    closeMessage();
  });

  document.addEventListener('keydown', onMessageEscKeydown);
  document.addEventListener('click', onOutsideClick);
  document.body.append(messageElement);
};

const showSuccessMessage = () => showMessage('success');
const showErrorMessage = () => showMessage('error');

export { showAlert, showSuccessMessage, showErrorMessage };
