
let results = document.querySelector("#results");
const addtoList = (link, name, owner ) => {
  // results.empty();
  const newListItem =
    `
    <li>
      <a href="${link}">${name} by ${owner}</a>
    </li>
    `;
  results.insertAdjacentHTML("beforeend", newListItem);
};

const fetchUserString = () => {
  fetch(`https://api.github.com/orgs/openinnovationlifesciences/repos`)
  .then(response => response.json())
  .then((data) => {
      data.forEach(element => addtoList(element.html_url, element.name, element.owner.login)) ;
    });
};

fetchUserString();
