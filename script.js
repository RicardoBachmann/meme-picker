import { catsData } from "./data.js";

const emotionRadios = document.getElementById("emotion-radios");
const getImageBtn = document.getElementById("get-image-btn");
const gifsOnlyOption = document.getElementById("gifs-only-option");
const modalInner = document.getElementById("modal-inner");
const modal = document.getElementById("modal");

emotionRadios.addEventListener("change", highlightCheckedOption);

getImageBtn.addEventListener("click", renderCat);

function highlightCheckedOption(e) {
  const radios = document.getElementsByClassName("radio");

  for (let radio of radios) {
    radio.classList.remove("highlight");
  }

  // remove all instances of the highlight class
  document.getElementById(e.target.id).parentElement.classList.add("highlight");
}

function getMatchingCatsArray() {
  if (document.querySelector('input[type="radio"]:checked')) {
    const selectedEmotion = document.querySelector(
      'input[type="radio"]:checked'
    ).value;
    const isGif = gifsOnlyOption.checked;

    const matchingCatsArray = catsData.filter(function (cat) {
      if (isGif) {
        return cat.emotionTags.includes(selectedEmotion) && cat.isGif;
      } else {
        return cat.emotionTags.includes(selectedEmotion);
      }
    });

    return matchingCatsArray;
  }
}

function getSingleCatObject() {
  const catsArray = getMatchingCatsArray();

  if (catsArray.length === 1) {
    return catsArray[0];
  } else {
    const randomCats = Math.floor(Math.random() * catsArray.length);
    return catsArray[randomCats];
  }
}

function renderCat() {
  const catbObject = getSingleCatObject();

  modalInner.innerHTML = `<img
    class="cat-img"
    src="./images/${catbObject.image}"
    alts="${catbObject.alt}""
    >`;

  modal.style.display = "flex";
}

function getEmotionsArray(cats) {
  const emotionsArray = [];

  for (let cat of cats) {
    for (let emotion of cat.emotionTags) {
      if (!emotionsArray.includes(emotion)) {
        emotionsArray.push(emotion);
      }
    }
  }

  return emotionsArray;
}

function renderEmotionsRadios(cats) {
  let radioItems = ``;
  const emotions = getEmotionsArray(cats);

  for (let emotion of emotions) {
    radioItems += `
    <div class="radio">
        <lable for="${emotion}">${emotion}</lable>
        <input 
            type="radio" 
            id="${emotion}" 
            value="${emotion}"
            name="emotions"
            >
    </div>
        `;
  }
  emotionRadios.innerHTML = radioItems;
}

renderEmotionsRadios(catsData);
