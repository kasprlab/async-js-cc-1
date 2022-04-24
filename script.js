'use strict';

const countriesContainers = document.querySelector('.countries')

const renderCountry = function (data) {
  const html = `
    <article class="country">
      <img class="country__img" src="${data.flag}">
      <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${data.population} people</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
      </div>
    </article>
  `

  countriesContainers.insertAdjacentHTML('beforeend', html)
  //countriesContainers.opacity = 1
}

const whereAmI = function(lat, lang) {

 fetch(`https://geocode.xyz/${lat},${lang}?geoit=json`)
  .then(response => {

    if (!response.ok) throw new Error(`Problem with Geocoding ${response.status}`)
    
    return response.json()
  })
  .then(data => {
    //console.log(data)

    console.log(`You are in ${data.state}, ${data.country}`)

    // question 6
    return fetch(`https://restcountries.com/v2/name/${data.country}`)
  })
  .then(response => {
    if (!response.ok) throw new Error(`Country not found ${response.status}`)

    return response.json()
  })
  .then(data => {
    //console.log(data[0])
  
    renderCountry(data[0])
  })
 .catch(err => console.error(`${err.message} 🔥`))


} //end of function whereAmI


whereAmI(52.508, 13.381);
whereAmI(-33.933, 18.474);
whereAmI(19.037, 72.873);

