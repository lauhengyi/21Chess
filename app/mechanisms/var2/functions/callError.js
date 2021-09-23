function callError(error, details) {
  //Switch on error for 4 seconds before dissappearing
  details.error = error;
  setTimeout(() => {
    details.error = "";
  }, 4000);
}

export default callError;
