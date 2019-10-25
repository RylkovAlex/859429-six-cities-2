// делает первую букву в строке заглавной
export const firstToUpperCase = (str) => {
  if (!str) {
    return str;
  }
  return str[0].toUpperCase() + str.slice(1);
};

// возвращает слово буз префикса
export const removePrefix = (string, prefix) => {
  const prefixLength = prefix.length;
  if (prefixLength && string) {
    return string.split(prefixLength);
  }
  return string;
};
