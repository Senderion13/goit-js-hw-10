import Notiflix from "notiflix";
let options = "";

function fetchCountries(name) {
    return fetch(`https://restcountries.com/v3.1/name/${name}?${options}`).then(
        (response) => {
            if (!response.ok) {
            }
            return response.json();
          }
    )
}

export default fetchCountries;