/** Given a query string, return array of matching shows:
 *     { id, name, summary, episodesUrl }
 */


/** Search Shows
 *    - given a search term, search for tv shows that
 *      match that query.  The function is async show it
 *       will be returning a promise.
 *
 *   - Returns an array of objects. Each object should include
 *     following show information:
 *    {
        id: <show id>,
        name: <show name>,
        summary: <show summary>,
        image: <an image from the show data, or a default imege if no image exists, (image isn't needed until later)>
      }
 */
async function searchShows(query) {
  // TODO: Make an ajax request to the searchShows api.  Remove
  // hard coded data.
  const showQuery = await axios.get(`http://api.tvmaze.com/search/shows?q=${query}`);
  const queryData = showQuery.data;

  const showQueryResults = [];

  for (const show of queryData) {
      showQueryResults.push({
        id: show.show.id,
        name: show.show.name,
        summary: show.show.summary,
        image: show.show.image === null ? 
        'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.clker.com%2Fcliparts%2Fn%2FT%2F5%2Fz%2Ff%2FY%2Fimage-missing-hi.png&f=1&nofb=1' :
        show.show.image.original
      })
  };
  return showQueryResults;
};



/** Populate shows list:
 *     - given list of shows, add shows to DOM
 */

function populateShows(shows) {
  const $showsList = $("#shows-list");
  $showsList.empty();

  for (let show of shows) {
    let $item = $(
      `<img class="card-img-top m-auto" src="${show.image}">
        <div class="row-md-6 m-auto col-lg-3 Show" data-show-id="${show.id}">
         <div class="card" data-show-id="${show.id}">
           <div class="card-body">
             <h5 class="card-title">${show.name}</h5>
             <p class="card-text">${show.summary}</p>
             <button class="btn btn-secondary">Episodes</button>
           </div>
         </div>
       </div>
      `);

    $showsList.append($item);
  };
};


/** Handle search form submission:
 *    - hide episodes area
 *    - get list of matching shows and show in shows list
 */

$("#search-form").on("submit", async function handleSearch (evt) {
  evt.preventDefault();
  
  let query = $("#search-query").val();
  if (!query) return;
  
  $("#episodes-area").hide();
  
  let shows = await searchShows(query);
  
  populateShows(shows);
});


function populateEpisodes(episodes) {
  const $episodesList = $("#episodes-list");
  const $episodesArea = $("#episodes-area");
  $episodesList.empty();
  $episodesArea.show();

  for (let episode of episodes) {
    let $item = $(`
    <li>Episode #${episode.number}</li>
    <li>Name: ${episode.name}</li>
    <li>Season: ${episode.season}</li>
    <li>ID: ${episode.id}</li>
    <br>
    `);

    $episodesList.append($item);
  };
};

/** Given a show ID, return list of episodes:
 *      { id, name, season, number }
 */

$("#shows-list").on('click', async function getEpisodes(e) {
  // TODO: get episodes from tvmaze
  //       you can get this by making GET request to
  if(e.target.innerText !== 'Episodes') return

  const id = e.target.parentElement.parentElement.dataset.showId;
  const episodeRequest = await axios.get(`http://api.tvmaze.com/shows/${id}/episodes`);
  const episodeData = episodeRequest.data;
  console.log(episodeRequest);
  // TODO: return array-of-episode-info, as described in docstring above
  const episodeQueryResults = [];
  
  for (const episode of episodeData) {
    episodeQueryResults.push({
      id: episode.id,
          name: episode.name,
          season: episode.season,
          number: episode.number
    })};

    populateEpisodes(episodeQueryResults);
  });
