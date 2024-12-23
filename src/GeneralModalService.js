import {
  cleanDialogInstance
} from "./utilityServices.js";


const loadGeneralSelectDialog = (title, selectItems) => {
  cleanDialogInstance("dialog-location");

  const dialogLocation = document.getElementById("dialog-location");
  const bulkTemplate = document.getElementById('general-selection-modal-template');

  const clonedTemplate = bulkTemplate.content.cloneNode(true);
  dialogLocation.appendChild(clonedTemplate);

  const theSelect = document.getElementById('selection-type');

  for (const [key, value] of Object.entries(selectItems)) {
    theSelect.options[theSelect.options.length] = new Option(value.name, key);
  }

  const theModal = document.getElementById("general-selection-modal");
  theModal.querySelector("form").querySelector("#selection-type").labels[0].textContent = title;

  theModal.open();
}

const generalSelectDialogEvents = (callback, extraData = null) => {
  const theGeneralSelectForm = document.querySelector('#general-selection-form');
  const cancelButton = document.querySelector('.cancel');
  // const formModal = document.querySelector('#general-selection-modal');
  theGeneralSelectForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const theForm = document.getElementById(`${event.target.id}`);
    const data = new FormData(theForm);

    callback(data.get("selection-type"), extraData);

    cleanDialogInstance("dialog-location");
  });

  cancelButton.addEventListener('click', () => {
    cleanDialogInstance("dialog-location");
  });
}

export const doGeneralSelectDlg =
  (title, selectItems, callback, extraData = null) => {
  loadGeneralSelectDialog(title, selectItems);
  generalSelectDialogEvents(callback, extraData);
}