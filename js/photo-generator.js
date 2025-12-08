// ВЕСЬ твой код генерации здесь

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const createUniqueIdGenerator = () => {
  const generatedIds = [];

  return () => {
    let newId;
    do {
      newId = getRandomInteger(1, 1000);
    } while (generatedIds.includes(newId));

    generatedIds.push(newId);
    return newId;
  };
};

const generateCommentId = createUniqueIdGenerator();

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = ['Артём', 'Мария', 'Дмитрий', 'Анна', 'Сергей', 'Елена', 'Алексей', 'Ольга', 'Иван', 'Наталья'];

const DESCRIPTIONS = [
  'Прекрасный закат на море',
  'Горный пейзаж в утреннем тумане',
  'Улочки старого города',
  'Кофе и книга в уютном кафе',
  'Прогулка по осеннему парку',
  'Архитектура современного мегаполиса',
  'Морской причал в лунном свете',
  'Цветущий сад весной',
  'Зимняя сказка в лесу',
  'Уличное искусство и граффити'
];

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
  id,
  url: `photos/${id}.jpg`,
  description: DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)],
  likes: getRandomInteger(15, 200),
  comments: generateComments()
});

const generatePhotosArray = () => Array.from(
  { length: 25 },
  (_, index) => generatePhoto(index + 1)
);

const photos = generatePhotosArray();

export { photos };

