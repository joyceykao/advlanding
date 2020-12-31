
let results = document.querySelector("#results");
const addtoList = (link, name, owner, updated, stars, watchers, description) => {
  // results.empty();
  const newListItem =
    `
    <a class="card col-xs-12 col-sm-12 col-md-12 col-lg-3 d-flex align-items-center justify-content-around" id="workflow" href="${link}">
      <h3>${name}</h3>
      <h4>Owner: ${owner}</h4>
      <p><em>last updated:</em> ${updated}</p>
      <div class="container-fluid d-flex align-items-center justify-content-around">
        <p><em>Stars</em> <br><i class="far fa-star"></i> ${stars}</p>
        <p><em>Watching</em> <br><i class="far fa-eye"></i> ${watchers}</p>
      </div>
      <p>${description}</p>
    </a>
    `;
  results.insertAdjacentHTML("beforeend", newListItem);
};

const fetchUserString = () => {
  fetch(`https://api.github.com/orgs/openinnovationlifesciences/repos`)
  .then(response => response.json())
  .then((data) => {
      data.forEach(element => addtoList(element.html_url, element.name, element.owner.login, element.updated_at, element.stargazers_count, element.watchers_count, element.description)) ;
    });
};

fetchUserString();
