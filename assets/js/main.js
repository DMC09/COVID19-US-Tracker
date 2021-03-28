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
  // const api = "https://api.covidtracking.com/v1/us/current.json";
  const api = "https://disease.sh/v3/covid-19/countries/USA?yesterday=true&twoDaysAgo=false&strict=false&allowNull=true";
  try {
    const response = await axios.get(api);
    const data = await response.data
    console.log(data);
    usNums.innerHTML = loadingText;
    const {
      cases,
      active,
      critical,
      todayCases,
      deaths,
      recovered,
    } = await data;
    console.log(cases,
    active,
    critical,
    todayCases,
    deaths,
    recovered);
      usNums.innerHTML = `
       <ul class=united-data__api>
      <li>${toFormat(cases)}</li>
      <li>${toFormat(recovered)}</li>
      <li>${toFormat(active)}</li>
      <li>${toFormat(critical)}</li>
      <li>${toFormat(todayCases)}</li>
      <li>${toFormat(deaths)}</li>
      </ul>
        `;
      usNames.innerHTML =`
        <ul>
        <li><span class="num">Total Cases</span></li>
        <li><span class="num">Recovered</span></li>
        <li><span class="num">Active Cases</span></li>
        <li><span class="num">Critical Cases</span></li>
        <li><span class="num">Todays Cases</span></li>
        <li><span class="num">Deaths</span></li>
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



  const stateBox = document.querySelector(".state__box");
  const dontContainer = document.querySelector(".dont__container");


  $("#select").on("select2:select", function getSelect(e) {
    const id = e.params.data.id;
    stateData(id, name);
  });
});

// function to retreive ID from dropdown and match with state data
const stateData = async (id) => {
  console.log(id,'this is the id!');
  // const api = `https://api.covidtracking.com/v1/states/${id.toLowerCase()}/current.json`;
  const api = `https://disease.sh/v3/covid-19/states/${id}?yesterday=true&allowNull=1`;

  try {

    const response = await axios.get(api);
    console.log(response);
    console.log(response.data);
    const { cases,active,deaths,recovered,todayCases } = await response.data;
console.log(cases,recovered,active,todayCases,deaths);
    stateNums.innerHTML = `
<ul >
<li >${toFormat(cases)}</li>
<li >${toFormat(recovered)}</li>
<li >${toFormat(active)}  </li>
<li >${toFormat(todayCases)} </li>
<li >${toFormat(deaths)} </li>
</ul>
`;
stateNames.innerHTML=`
<ul>
<li><span class="num">Total Cases</span></li>
<li><span class="num">Recovered</span></li>
<li><span class="num">Active Cases</span></li>
<li><span class="num">Todays Cases</span></li>
<li><span class="num">Deaths</span></li>
</ul>
`;

  } catch (error) {
    console.error(error);
  }
};
