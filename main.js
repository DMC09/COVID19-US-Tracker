const btn = document.querySelector('.main');
const container = document.querySelector('.data');




const getData = async () => {
  try {
    const response = await axios.get('https://thevirustracker.com/free-api?countryTotal=US')
    console.log(response);
    console.log(response.data.countrydata);
    console.log(response.data.countrydata[0].total_cases);
    response.data.countrydata.forEach((item) => {
      // console.log(item);
      container.innerHTML = `
      <li class="gray-text">${item.total_cases} Total Cases</li>
      <li class="green-text">${item.total_recovered}  Recovered</li>
      <li class="gray-text">${item.total_unresolved} Unresolved </li>
      <li class="red-text">${item.total_deaths} Deaths </li>
      <li class="yellow-text">${item.total_new_cases_today} New cases today</li>
        `;
    });

  } catch (error) {
    console.error(error)
  }
}

getData();
