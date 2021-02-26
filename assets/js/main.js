// targets the results section on the page
let results = document.querySelector("#results");

//adds HTML to the results section for each workflow in the GH community
const addtoList = (link, name, contributorInfo, updated, stars, watchers, description) => {
  const newListItem =
    `
    <a class="card col-xs-12 col-sm-12 col-md-12 col-lg-3 col-xl-3 d-flex align-items-center justify-content-around" id="workflow" target="_blank" href="${link}">
        <h5 style="font-size:medium;" class="mt-1">${name}</h5>
        <div class="container">
        <p class="mb-0" style="font-size:small;"><em>Contributor:</em><br>${contributorInfo.join(', ')}</p>
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
    if (name != "FEZ-Main-Info" && name != "advlanding"){
    results.insertAdjacentHTML("beforeend", newListItem);
    };
};

// Using the GH API, this function fetches information on all of the repositories on the FEZ community
const fetchRepoString = () => {
  fetch(`https://api.github.com/orgs/FEZ-Finite-Element-Zurich/repos`)
  .then(response => response.json())
  .then((data) => {
      data.forEach(element => processRepoData(element.html_url, element.name, element.owner.login, element.updated_at, element.stargazers_count, element.watchers_count, element.description, element.contributors_url)) ;
    });
};

// calls the function above
fetchRepoString();

// takes the data from one repo from th fetchRepoString function to use the GH API to get the individual repo's information,
// it uses the fetchContributorString function to get the contributor list for the specific repo
// then feeds that info into the addtoList function
const processRepoData = (html_url, name, owner_login, updated_at, watchers_count, stargazers_count, description, contributors_url) => {
        fetchContributorString(contributors_url)
          .then((contributorInfo) => {
            console.log(contributorInfo);
            addtoList(html_url, name, contributorInfo, updated_at, watchers_count, stargazers_count, description);
          });
};

// uses the GH API to get contributor names of a specific repo
let fetchContributorString = async (contributorApi) => {
  let response = await fetch (contributorApi);
  let data = await response.json();
  let contributorInfo = [];
  data.forEach(element => contributorInfo.push(element.login));
  return contributorInfo;
}

// This function checks if the description exists or not and returns the appropriate HTML for the addtoList function above for the description section
const formatDescription = (description) => {
  if (description == null) {
    return `<p class="container mb-1" style="height:25vh;"><em>None</em></p>`;
  } else {
    return `<p class="container mb-1" id="workflow-description">${description}</p>`;
  };
};


