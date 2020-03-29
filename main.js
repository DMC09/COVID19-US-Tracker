"use strict"
const btn = document.querySelector('.main');
const container = document.querySelector('.data__container');




const getData  = (async () => {
  try {
    container.innerHTML = '<h2 class="loading-text">Loading Data</h2>'
    const response = await axios.get('https://thevirustracker.com/free-api?countryTotal=US')
    console.log(response);
    console.log(response.data.countrydata);
    console.log(response.data.countrydata[0].total_cases);
    response.data.countrydata.forEach((item) => {
      // console.log(item);
      container.innerHTML = `
      <ul>
      <li class="orange-text">${item.total_cases} Total Cases</li>
      <li class="green-text">${item.total_recovered}  Recovered</li>
      <li class="red-text">${item.total_deaths} Deaths </li>
      <li class="yellow-text">${item.total_new_cases_today} New Cases Today</li>
      </ul>  `;
    });

  } catch (error) {
    console.error(error)
    container.innerHTML = `<h3 class="error-text"> API data unable to load please try again later</h3>`
  }
})()
