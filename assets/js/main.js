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
  const api2 = "https://api.covidtracking.com/v1/us/current.json";
  console.log(api2)
  try {
    const response2 = await axios.get(api2);
    // to get the united states
    const data = response2.data
    console.log(data);
    usNums.innerHTML = loadingText;
    const response = await axios.get(api);
    const { countrydata } = response.data;
    console.log(countrydata[0]);
    const {
      positive,
      recovered,
      death,
      positiveIncrease,
    } = data[0];
      usNums.innerHTML = `
      <ul class=united-data__api>
      <li>${toFormat(positive)}</li>
      <li>${toFormat(recovered)}</li>
      <li>${toFormat(death)}</li>
      <li>${toFormat(positiveIncrease)}</li>
      </ul>
        `;
        usNames.innerHTML =
        `
        <ul>
        <li><span class="num">Total Cases</span></li>
        <li><span class="num">Recoveries</span></li>
        <li><span class="num">Deaths</span></li>
        <li><span class="num">Cases Today</span></li>
        </ul>
        `;

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
<li >${toFormat(totalTestResults)}</li>
<li >${toFormat(positive)}</li>
<li >${toFormat(death)}  </li>
<li >${toFormat(hospitalized)} </li>
</ul>
`;
stateNames.innerHTML=`
<ul>
<li><span class="num">Total Tested</span></li>
<li><span class="num">Positive</span></li>
<li><span class="num">Deaths</span></li>
<li><span class="num">Hospitalized</span></li>
</ul>
`;

  } catch (error) {
    console.error(error);
  }
};
