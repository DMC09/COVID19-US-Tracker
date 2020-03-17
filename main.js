const btn = document.querySelector('.main');
const container = document.querySelector('.data');




const getData = async () => {
  try {
    const response = await axios.get('https://thevirustracker.com/free-api?global=stats')
    console.log(response);
    response.data.results.forEach((item, i) => {
      console.log(item);
    });;
    container.innerHTML = response;

  } catch (error) {
    console.error(error)
  }
}

btn.addEventListener('click', getData);
