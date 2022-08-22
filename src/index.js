import './css/styles.css';
import _ from "lodash";
import Notiflix from 'notiflix';
import fetchCountries from "./fetchCountries";

const DEBOUNCE_DELAY = 300;
let input = document.querySelector("#search-box");
let countryList = document.querySelector(".country-list");
let countryInfo = document.querySelector(".country-info");

let showInfo = () => {
    fetchCountries(input.value)
        .then((countries) => renderCountries(countries))
        .catch((error) => console.log(error));
}

document.querySelector("#search-box").addEventListener("input", _.debounce(() => {
    if(input.value === ""){
        countryInfo.innerHTML = "";
        countryList.innerHTML = "";
    }
    else{
    fetchCountries(input.value)
        .then((countries) => renderCountries(countries))
        .catch((error) => console.log(error));
    }
}, DEBOUNCE_DELAY));

function renderCountries(countries) {
    countryInfo.innerHTML = "";
    countryList.innerHTML = "";
  console.log(countries);
  if(countries.length <= 4 && countries.length > 1){
    countryList.innerHTML = countries
    .map((e,i) => {
      return `<li>
          <img src="${countries[i].flags.svg}"/>
          <p>${countries[i].name.common}</p>
        </li>`;
    })
    .join("");
  }
  else if (countries.length == 1){
    console.log(countries[0].languages);
    countryInfo.innerHTML = `
        <div>
            <img src="${countries[0].flags.svg}"/>
            <h1>${countries[0].name.common}</h1>
        </div>
        <p><b>Capital </b>${countries[0].capital}</p>
        <p><b>Population </b>${countries[0].population}</p>
        <p><b>Languages </b>${countries[0].languages.value}</p>
        `
  }
  else if (countries.length > 4) {
    Notiflix.Notify.info("Too many matches found. Please enter a more specific name");
  }
}