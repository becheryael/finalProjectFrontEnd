const onlyDigitsCheck = (string: string) => {
  const array = [...string];
  return array.every((char) => /^\d$/.test(char));
};

export default onlyDigitsCheck;
