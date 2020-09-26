
let results = document.querySelector("#results");
const addtoList = (word) => {
  // results.empty();
  const newListItem = `<li>${word}</li>`;
  results.insertAdjacentHTML("beforeend", newListItem);
};

const fetchUserString = () => {
  fetch(`https://api.github.com/repos/openinnovationlifesciences/OILS-wiki/contributors`)
  .then(response => response.json())
  .then((data) => {
      addtoList(data[0].login);
    });
};

fetchUserString();
