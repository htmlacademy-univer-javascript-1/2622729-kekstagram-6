
function checkStringLength(string, maxLength) {
  return string.length <= maxLength;
}
// Строка короче 20 символов
checkStringLength('проверяемая строка', 20); // true

// Длина строки ровно 18 символов
checkStringLength('проверяемая строка', 18); // true

// Строка длиннее 10 символов
checkStringLength('проверяемая строка', 10); // false

function isPalindrome(str) {
  // Приводим строку к нижнему регистру и удаляем все пробелы
  const cleanedStr = str.toLowerCase().replace(/\s/g, '');

  // Сравниваем строку с её перевернутой версией
  const reversedStr = cleanedStr.split('').reverse().join('');

  return cleanedStr === reversedStr;
}

// Тестируем функцию
isPalindrome('топот'); // true
isPalindrome('Довод'); // true
isPalindrome('Кекс'); // false
isPalindrome('Лёша на полке клопа нашёл'); // true

function extractNumber(input) {
  // Преобразуем входные данные в строку (на случай, если пришло число)
  const str = input.toString();
  let result = '';

  // Перебираем все символы строки
  for (let i = 0; i < str.length; i++) {
    const char = str[i];

    // Проверяем, является ли символ цифрой от 0 до 9
    if (char >= '0' && char <= '9') {
      result += char;
    }
  }

  // Если цифр не найдено, возвращаем NaN
  if (result === '') {
    return NaN;
  }

  // Преобразуем полученную строку цифр в число
  return parseInt(result, 10);
}
extractNumber('2023 год');        // 2023
extractNumber('ECMAScript 2022'); // 2022
extractNumber('1 кефир, 0.5 батона'); // 105
extractNumber('агент 007');       // 7
extractNumber('a я томат');       // NaN

extractNumber(2023);              // 2023
extractNumber(-1);                // 1
extractNumber(1.5);               // 15
