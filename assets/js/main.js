"use strict";
const unitedStatesContainer = document.querySelector(".united__container");
const stateContainer = document.querySelector(".state__api-list"); //get another container so the select element does not disapear
const usNums = document.querySelector(".US_nums")
const usNames = document.querySelector(".US_names")
const stateNums = document.querySelector(".State_nums")
const stateNames = document.querySelector(".State_names")

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
    usNums.innerHTML = loadingText;
    const response = await axios.get(api);
    console.log(response);
    console.log(response.data);
    const { countrydata } = response.data;
    console.log(countrydata);

    countrydata.forEach((item) => {
      const {
        total_cases,
        total_recovered,
        total_deaths,
        total_new_cases_today,
      } = item;
      usNums.innerHTML = `
      <ul class=united-data__api>
      <li><span class="num">${toFormat(total_cases)}</span></li>
      <li><span class="num">${toFormat(total_recovered)}</span></li>
      <li><span class="num">${toFormat(total_deaths)}</span></li>
      <li><span class="num">${toFormat(total_new_cases_today)}</span></li>
      </ul>
        `;
        usNames.innerHTML =
        `
        <ul>
        <li>Total Cases</li>
        <li>Recoveries</li>
        <li>Deaths</li>
        <li>New Cases Today</li>
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
    width: "75%",
  });

  const clickHandler = (e) => {
    // console.log(e);
    dontContainer.scrollIntoView(true, { behavior: "smooth", block: "center" });
  };

  const stateBox = document.querySelector(".state__box");
  const dontContainer = document.querySelector(".dont__container");


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
    stateNums.innerHTML = `
<ul >
<li ><span class="num">${toFormat(totalTestResults)}</span></li>
<li ><span class="num">${toFormat(positive)}</span></li>
<li ><span class="num">${toFormat(hospitalized)}</span> </li>
<li ><span class="num">${toFormat(death)}</span>  </li>
</ul>
`;
stateNames.innerHTML=`
<ul>
<li>Total Tested</li>
<li>Positive</li>
<li>Hospitalized</li>
<li>Deaths</li>
</ul>
`;

  } catch (error) {
    console.error(error);
  }
};
