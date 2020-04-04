"use strict"
const unitedStatesContainer = document.querySelector('.data__container');
const stateContainer = document.querySelector('.state__list'); //get another container so the select element does not disapear


// Gets United State Data on load
const getData = (async () => {
  try {
    unitedStatesContainer.innerHTML = '<h2 class="loading-text">Loading Data</h2>'
    const response = await axios.get('https://api.thevirustracker.com/free-api?countryTotal=US')
    response.data.countrydata.forEach((item) => {
      unitedStatesContainer.innerHTML = `
      <ul class=data__section>
      <li class="orange-text">${item.total_cases} Total Cases</li>
      <li class="green-text">${item.total_recovered}  Recovered</li>
      <li class="red-text">${item.total_deaths} Deaths </li>
      <li class="yellow-text">${item.total_new_cases_today} New Cases Today</li>
      </ul>
        `
    });

  } catch (error) {
    console.error(error)
    container.innerHTML = `<h3 class="error-text"> API data unable to load please try again later</h3>`
  }
})();




// Function to initlize Select dropdown and retreive selection
$(document).ready(function() {
  $('#state__select').select2({
    placeholder: "Select a state",
    debug: true,
    containerCssClass: 'state__box',
    dropdownCssClass: 'state__dropdown',
    dropdownParent: $('.state__list'),
    width: '75%'
  });
  $('#state__select').on('select2:select', function getSelect(e) {
    const name = e.params.data.text;
    const id = e.params.data.id;
    stateData(id,name);
  })
});
// function to retreive ID from dropdown and match with state data
const stateData = async (id,name) => {
  try {
    const response = await axios.get(`https://covidtracking.com/api/states?state=${id}`)
    const {...stateStats} = response.data;
    console.log(stateStats.state); // abbreviation of state
    console.log(name); // name of state
    console.log(stateStats); //  state obj
    console.log(stateStats.death); //  deaths in state
    console.log(stateStats.totalTestResults); // Total tested in state
    console.log(stateStats.positive); // Positive cases
    console.log(stateStats.hospitalized || 0); // # of hospitalized

stateContainer.innerHTML = `
<ul>
<li>${name} State</li>
<li>${stateStats.state} State abreviation</li>
<li>${stateStats.death} Deaths </li>
<li>${stateStats.totalTestResults} Total tested</li>
<li>${stateStats.positive} positives</li>
<li>${stateStats.hospitalized || 0} hospitalized</li>
</ul>

`
  } catch (error) {
    console.error(error)
  }
};
