
let results = document.querySelector("#results");
const addtoList = (link, name ) => {
  // results.empty();
  const newListItem = `<li><a href="${link}">${name}</a></li>`;
  results.insertAdjacentHTML("beforeend", newListItem);
};

const fetchUserString = () => {
  fetch(`https://api.github.com/orgs/openinnovationlifesciences/repos`)
  .then(response => response.json())
  .then((data) => {
      addtoList(data[0].html_url, data[0].name);
    });
};

fetchUserString();
