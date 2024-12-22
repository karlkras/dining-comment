

export const cleanDialogInstance = (dialogLocation) => {
  let child = dialogLocation.lastElementChild;
  while (child) {
    dialogLocation.removeChild(child);
    child = dialogLocation.lastElementChild;
  }
};
