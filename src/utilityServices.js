

export const cleanDialogInstance = (dialogLocation) => {
  const theLocation = document.querySelector(`#${dialogLocation}`)
  let child = theLocation.lastElementChild;
  while (child) {
    theLocation.removeChild(child);
    child = theLocation.lastElementChild;
  }
};
