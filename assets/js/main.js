
let results = document.querySelector("#results");
const addtoList = (link, name, owner, updated, stars, watchers, description) => {
  // results.empty();
  const newListItem =
    `
    <a class="card col-xs-12 col-sm-12 col-md-12 col-lg-3 d-flex align-items-center justify-content-around" id="workflow" target="_blank" href="${link}">
        <h5>${name}</h5>
        <div class="container">
        <p class="mb-0" style="font-size:small;""><em>Owner:</em><br>${owner}</p>
        <p class="mb-0" style="font-size:small;"><em>last updated:</em> ${updated.split('T')[0]}</p>
        </div>
        <div class="container-fluid d-flex align-items-center justify-content-around ">
          <p><em>Stars</em> <br><i class="far fa-star"></i> ${stars}</p>
          <p><em>Watching</em> <br><i class="far fa-eye"></i> ${watchers}</p>
        </div>
        <div class="container">
        <p class="mb-0"><em>Description:</em></p>
        ${formatDescription(description)}
        </div>
    </a>
    `;
  results.insertAdjacentHTML("beforeend", newListItem);
};

const fetchRepoString = () => {
  fetch(`https://api.github.com/orgs/FEZ-Finite-Element-Zurich/repos`)
  .then(response => response.json())
  .then((data) => {
      data.forEach(element => processRepoData(element.html_url, element.name, element.owner.login, element.updated_at, element.stargazers_count, element.watchers_count, element.description, element.contributors_url)) ;
    });
};

fetchRepoString();

const processRepoData = (html_url, name, owner_login, updated_at, watchers_count, stargazers_count, description, contributors_url) => {
        addtoList(html_url, name, owner_login, updated_at, watchers_count, stargazers_count, description);
        // console.log(contributors_url);
        fetchContributorString(contributors_url);
};

const fetchContributorString = (contributorApi) => {
  fetch(contributorApi)
  .then(response=> response.json())
  .then((data) => {
    let contributorInfo = [];
    data.forEach(element => contributorInfo.push([element.login, element.html_url]));
    console.log(contributorInfo);
  });
}

const formatDescription = (description) => {
  if (description == null) {
    return `<p class="container" style="height:25vh;"><em>None</em></p>`;
  } else {
    return `<p class="container" id="workflow-description">${description}</p>`;
  };
};


