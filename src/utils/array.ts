export const nextInArray = (arr: Array<string>, from: string) => {
  const index = arr.indexOf(from);
  let value = '';
  if (index === -1) return '';
  if (arr[index + 1]) {
    value = arr[index + 1];
  } else {
    value = arr[0];
  }
  return value;
};

export const previousInArray = (arr: Array<string>, from: string) => {
  const index = arr.indexOf(from);
  let value = '';
  if (index === -1) return '';
  if (arr[index - 1]) {
    value = arr[index - 1];
  } else {
    value = arr[arr.length - 1];
  }
  return value;
};
