"use strict"
const unitedStatesContainer = document.querySelector('.united__container');
const stateContainer = document.querySelector('.state__api-list'); //get another container so the select element does not disapear


// Gets United State Data on load
const getUSData = (async () => {
  try {
    unitedStatesContainer.innerHTML = '<h2 class="loading-text">Loading Data</h2>'
    const response = await axios.get('https://api.thevirustracker.com/free-api?countryTotal=US')
    response.data.countrydata.forEach(item => {
      console.log(item);
      const {total_cases,total_recovered,total_deaths,total_new_cases_today} = item;
      unitedStatesContainer.innerHTML = `
      <ul class=united-data__api>
      <li class="orange-text">${total_cases.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} Total Cases</li>
      <li class="green-text">${total_recovered.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}  Recovered</li>
      <li class="red-text">${total_deaths.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} Deaths </li>
      <li class="yellow-text">${total_new_cases_today.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} New Cases Today</li>
      </ul>
        `
    });

  } catch (error) {
    console.error(error)
    unitedStatesContainer.innerHTML = `<h3 class="error-text"> API data unable to load please try again later</h3>`
  }
})();




// Function to initlize Select dropdown and retreive selection
$(document).ready(function() {
  $('#select').select2({
    placeholder: "Select a state",
    debug: true,
    containerCssClass: 'state__box',
    dropdownCssClass: 'state__dropdown',
    dropdownParent: $('.state__api-list'),
    width: '75%'
  });
  $('#select').on('select2:select', function getSelect(e) {
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
<ul class = "states__api-data">
<li class="yellow-text">${stateStats.totalTestResults.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} Total tested</li>
<li class="white-text">${stateStats.positive.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} positive cases</li>
<li class="orange-text">${stateStats.hospitalized.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') || 0} hospitalized</li>
<li class="red-text">${stateStats.death.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} Deaths </li>

</ul>

`
  } catch (error) {
    console.error(error)
  }
};
