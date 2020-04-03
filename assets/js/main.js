"use strict"
const btn = document.querySelector('.main');
const container = document.querySelector('.data__container');
const statebox = document.querySelector('.state__select')

// const getData = (async () => {
//   try {
//     container.innerHTML = '<h2 class="loading-text">Loading Data</h2>'
//     const response = await axios.get('https://thevirustracker.com/free-api?countryTotal=US')
//     console.log('Data received');
//     response.data.countrydata.forEach((item) => {
//       // console.log(item);
//       container.innerHTML = `
//       <ul class=data__section>
//       <li class="orange-text">${item.total_cases} Total Cases</li>
//       <li class="green-text">${item.total_recovered}  Recovered</li>
//       <li class="red-text">${item.total_deaths} Deaths </li>
//       <li class="yellow-text">${item.total_new_cases_today} New Cases Today</li>
//       </ul>
//         `
//       console.log('Data loaded');;
//     });
//
//   } catch (error) {
//     console.error(error)
//     container.innerHTML = `<h3 class="error-text"> API data unable to load please try again later</h3>`
//   }
// })();





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
    const id = e.params.data.id.toString();
    stateData(id);
  })
});

const stateData = async (id) => {
  try {
    const response = await axios.get('https://covidtracking.com/api/states')
    const statelist = response.data;
    console.log(statelist);
    console.log(id);
    let stateinfo = statelist.filter(function(e, id) {
      return e.state === "CA";
    });
    console.log(stateinfo[0]);
  } catch (error) {
    console.error(error)
  }
};
