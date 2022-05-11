const apiKey = "Bu0_OVe4HMM1G8KCTKD_bxjBdOKzDhKz84H6_0jScHE";

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

export { apiKey, getElement, formatDate, getJSON };
