const btn = document.querySelector('.main');
const container = document.querySelector('.data');




const getData = async () => {
  try {
    const response = await axios.get('https://thevirustracker.com/free-api?global=stats')
    console.log(response);
    // console.log(response.data.results[0].total_cases);
    response.data.results.forEach((item) => {
      console.log(item);
      container.innerHTML = `
      <li>${item.total_cases} Total Cases</li>
      <li>${item.total_recovered}  Recovered</li>
      <li>${item.total_unresolved} Unresolved </li>
      <li>${item.total_deaths} Deaths </li>
      <li>${item.total_new_cases_today} New cases today</li>
        `;
    });

  } catch (error) {
    console.error(error)
  }
}

btn.addEventListener('click', getData);
