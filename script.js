"use strict";

const initialCount = 5;
const apiKey = "Bu0_OVe4HMM1G8KCTKD_bxjBdOKzDhKz84H6_0jScHE";
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}`;
// prettier-ignore

let isInitialLoad = true;
let ready = false;
let imagesLoaded = 0;
let state = {
  photos: [],
};

function updateAPIURLWithNewCount(picCount) {
  apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${picCount}`;
}

const getElement = function (element) {
  return document.querySelector(element);
};

const formatDate = function (date) {
  const dateObj = new Date(date);
  const newDate = Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
  }).format(dateObj);
  return newDate;
};
const photosContainer = getElement(".image-container");
const loader = getElement(".loader");

const imageLoaded = function () {
  imagesLoaded++;
  if (imagesLoaded === state.photos.length) {
    loader.classList.add("hidden");
    ready = true;
  }
};

const getJSON = async function (url) {
  try {
    const response = await fetch(url);
    if (!response.ok) return new Error(`${response.status}`);
    const data = await response.json();
    return data;
  } catch (err) {
    throw err;
  }
};

const getPhotos = async function () {
  try {
    const photos = await getJSON(apiUrl);
    state.photos = photos.map((photo) => {
      // prettier-ignore
      console.log(photo)
      const {
        likes,
        description,
        urls: { regular: url },
        created_at: date,
        views,
        user: { name, portfolio_url },
      } = photo;
      return {
        likes,
        url,
        date,
        views,
        name,
        portfolio_url,
        description,
      };
    });
    if (isInitialLoad) {
      updateAPIURLWithNewCount(30);
      isInitialLoad = false;
    }
    renderPhotos(state.photos);
  } catch (err) {
    console.log(err);
  }
};

const renderPhotos = function (photos) {
  imagesLoaded = 0;
  const markup = photos.map(generateMarkup).join("");
  photosContainer.insertAdjacentHTML("beforeend", markup);
  const imgs = [...document.querySelectorAll(".photos")];
  imgs.forEach((img) => {
    img.addEventListener("load", imageLoaded);
  });
};

const generateMarkup = function (photo) {
  console.log(photo.date);
  return `
      <div class="img-box">
        <img
          class="photos"
          src="${photo.url}"
          alt="${photo.description}"
        />

        <div class="details">
          <div>
            <span>Date:${formatDate(photo.date)}</span>
            <span>Author:${photo.name}</span>
            <span>Likes:${photo.likes}</span>
            <span>Wiews:${photo.views}</span>
            <span>See more photos of this author <a href="${
              photo.portfolio_url
            }">here</a> </span>
          </div>
        </div>
      </div>

  `;
};
const scrollPage = function (event) {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
};

const init = function () {
  getPhotos();
  window.addEventListener("scroll", scrollPage);
};
window.addEventListener("DOMContentLoaded", init);
