const parseAPIError = (errorMessage: string) => {
  const errorArray = errorMessage.split(" ");
  if (errorArray.includes("duplicate")) {
    const index = errorArray.indexOf("key:");
    if (errorArray.includes("personalNum:")) {
      errorArray[index + 2] = "Personal number";
    }
    const returnError = `${errorArray[index + 2]} ${
      errorArray[index + 3]
    } already exists in database.`;
    return returnError;
  }
  return null;
};

export default parseAPIError;