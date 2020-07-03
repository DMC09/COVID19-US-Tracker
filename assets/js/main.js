"use strict";
const unitedStatesContainer = document.querySelector(".united__container");
const stateContainer = document.querySelector(".state__api-list"); //get another container so the select element does not disapear

const toFormat = (number) =>
  number == null
    ? 0
    : number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");

// Gets United State Data on load
const getUSData = (async () => {
  const loadingText =
    '<div class="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>';
  const errorText = `<h3 class="error-text"> API data unable to load please try again later</h3>`;
  const api = "https://api.thevirustracker.com/free-api?countryTotal=US";
  try {
    unitedStatesContainer.innerHTML = loadingText;
    const response = await axios.get(api);
    // console.log(response)
    // console.log(response.data)
    const { countrydata } = response.data;
    // console.log(countrydata)

    countrydata.forEach((item) => {
      const {
        total_cases,
        total_recovered,
        total_deaths,
        total_new_cases_today,
      } = item;
      unitedStatesContainer.innerHTML = `
      <ul class=united-data__api>
      <li class="orange-text">${toFormat(total_cases)} Total Cases</li>
      <li class="green-text">${toFormat(total_recovered)}  Recovered</li>
      <li class="red-text">${toFormat(total_deaths)} Deaths </li>
      <li class="yellow-text">${toFormat(
        total_new_cases_today
      )} New Cases Today</li>
      </ul>
        `;
    });
  } catch (error) {
    console.error(error);
    unitedStatesContainer.innerHTML = errorText;
  }
})();

// Function to in Select dropdown and retreive selection
$(document).ready(function () {
  $("#select").select2({
    placeholder: "Select a state",
    debug: true,
    containerCssClass: "state__box",
    dropdownCssClass: "state__dropdown",
    dropdownParent: $(".state__api-list"),
    width: "75%",
  });

  const clickHandler = (e) => {
    // console.log(e);
    dontContainer.scrollIntoView(true,{behavior:'smooth',block:"center"});

  };

  const stateBox = document.querySelector(".state__box");
  const dontContainer = document.querySelector(".dont__container");


  //   $(".state__box").mousedown(function (e) {
  //     console.log(e);
  //     dontContainer.scrollIntoView();
  //     window.scrollBy({
  //     "behavior": "smooth",
  //     "top": 500
  // });
  //
  //   });

  $("#select").on("select2:select", function getSelect(e) {
    const name = e.params.data.text;
    const id = e.params.data.id;
    stateData(id, name);
  });
});

// function to retreive ID from dropdown and match with state data
const stateData = async (id, name) => {
  const api = `https://covidtracking.com/api/states?state=${id.toLowerCase()}`;
  try {
    console.log(id);
    const response = await axios.get(api);
    const { ...stateStats } = response.data;
    const { death, totalTestResults, positive, hospitalized } = stateStats;
    stateContainer.innerHTML = `
<ul class = "states__api-data">
<li class="yellow-text">${toFormat(totalTestResults)} Total tested</li>
<li class="white-text">${toFormat(positive)} positive cases</li>
<li class="orange-text">${toFormat(hospitalized)} hospitalized</li>
<li class="red-text">${toFormat(death)} Deaths </li>
</ul>
`;
  } catch (error) {
    console.error(error);
  }
};
