import { getRandomInteger, createUniqueIdGenerator } from './util.js';
import { MESSAGES, NAMES, DESCRIPTIONS } from './data.js';

const generateCommentId = createUniqueIdGenerator();

const generateComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: MESSAGES[getRandomInteger(0, MESSAGES.length - 1)],
  name: NAMES[getRandomInteger(0, NAMES.length - 1)]
});

const generateComments = () => {
  const commentsCount = getRandomInteger(0, 30);
  return Array.from({ length: commentsCount }, generateComment);
};

const generatePhoto = (id) => ({
  id: id,
  url: `photos/${id}.jpg`,
  description: DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)],
  likes: getRandomInteger(15, 200),
  comments: generateComments()
});

const generatePhotosArray = () => {
  return Array.from({ length: 25 }, (_, index) => generatePhoto(index + 1));
};

export { generatePhotosArray };
