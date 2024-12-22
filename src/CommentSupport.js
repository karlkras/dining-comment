import {
  tableBody,
  ratingBody,
  headerContent

} from "./templates.js";

import {
  doGeneralSelectDlg
} from "./GeneralModalService.js";

let theDiningLocationSelect;


const ratingLines = [
  {name: "Flavor", starsId: "flavor-star-rating"},
  {name: "Presentation", starsId: "presentation-star-rating"},
  {name: "Temperature", starsId: "temperature-star-rating"},
  {name: "Wait Time", starsId: "wait-time-star-rating"}
];

const createCommentCardHeader = () => {
  const cardHeader = document.createElement("header");
  cardHeader.innerHTML = headerContent;
  return cardHeader;
}

const createCommentCardTable = () => {
  const theRows = [];
  ratingLines.forEach(ratingLine => {
    const textAreaId = ratingLine.name.toLowerCase()
      .replace(" ", "-");
    const aRow = ratingBody
      .replace("{HEADER-NAME}", ratingLine.name)
      .replace("{ID}", ratingLine.starsId)
      .replace("{COMMENT-ID}", textAreaId);

    theRows.push(aRow);
  });
  // and now.
  const theTableBody = tableBody
    .replace("{TABLE-ROWS}", theRows.join("\n"));

  const aTableNode = document.createElement("table");
  aTableNode.innerHTML = theTableBody;
  return aTableNode;

}

const generateCommentCard = () => {
  const cardWrapper = document.createElement("div");
  cardWrapper.id = "comment-card-wrapper";

  cardWrapper.append(createCommentCardHeader());

  const theForm = document.createElement("form");
  // theForm.append(generateCommentCard());
  const submitButtonDiv = document.createElement("div");
  submitButtonDiv.classList.add("center");
  submitButtonDiv.classList.add("submit");
  const submitButton = document.createElement("button");
  submitButton.setAttribute("type", "submit");
  submitButton.innerText = "Collect Information";
  submitButtonDiv.append(submitButton);
  theForm.appendChild(createCommentCardTable());
  theForm.appendChild(submitButtonDiv);
  cardWrapper.appendChild(theForm);
  return cardWrapper;
};

const hookUpRatingControls = () => {
  ratingLines.forEach(aLine => {
    const targetStars = document.getElementById(aLine.starsId).querySelectorAll('.star');
    targetStars.forEach((star, index) => {
      star.addEventListener('click', (e) => {
        // Reset all stars to unselected-->
        targetStars.forEach(s => s.classList.remove('selected'));
        // Select stars up to the clicked one
        for (let i = 0; i <= index; i++) {
          targetStars[i].classList.add('selected');
        }
        e.target.closest("div")
          .querySelector(".rate-count")
          .querySelector("input").value = index + 1;
      });
    });
    const rateCountInput = document.getElementById(aLine.starsId)
      .querySelector(".rate-count")
      .querySelector("input")
    rateCountInput.addEventListener("input", e => {
      const theIndex = e.target.value - 1;
      targetStars.forEach(s => s.classList.remove('selected'));
      for (let i = 0; i <= theIndex; i++) {
        targetStars[i].classList.add('selected');
      }
    })
  })
}

const init = () => {
  doGeneralSelectDlg("This is a title",
    {
      item1: {name: "Item 1 name"},
      item2: {name: "Item 2 name"}
    },
    (theChoice, extra) => {
      console.log(theChoice)
    },
    {extra: "data"}
  )
  // first clear out the root on main page.
  // const theRoot = document.querySelector("#root");
  // theRoot.innerHTML = "";
  // theRoot.append(generateCommentCard());
  // // now hook up ratings.
  // hookUpRatingControls();
  // document.addEventListener("submit", e => {
  //   e.preventDefault();
  //   const theInputs = [...e.target.querySelectorAll(".ratings")];
  //
  //   const theResults = {};
  //
  //   theInputs.forEach(anInput => {
  //     const idName = anInput.closest("tr")
  //       .querySelector(".title")
  //       .value.toLowerCase()
  //       .replace(" ", "-");
  //     theResults[idName] = {
  //       rating: anInput.closest("table").querySelector(`#${idName}-star-rating`).querySelectorAll(".selected").length,
  //       comments: anInput.closest("table").querySelector(`#${idName}-comments`).value.trim()
  //     }
  //   });
  //   alert(JSON.stringify(theResults));
  //
  //   [...document.querySelectorAll(".star")].forEach(aStar => aStar.classList.remove('selected'));
  //   e.target.reset();
  //
  // });
}

init();