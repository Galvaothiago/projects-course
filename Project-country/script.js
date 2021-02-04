'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const renderCountry = data => {
    const html = `
        <article class="country">
            <img class="country__img" src="${data.flag}" />
            <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <h4 class="country__capital">CAPITAL: ${data.capital}</h4>
            <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)}M people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
            </div>
        </article>
    `
    countriesContainer.insertAdjacentHTML('beforeend', html )
    
    countriesContainer.style.opacity = '1'

}

const getDataCountry = async country => {
    try {
        const response = await fetch(`http://restcountries.eu/rest/v2/name/${country}`)

        if (!response.ok) {
            throw new Error('something went wrong! Try again, plaese')        
        }

        const [ data ] = await response.json()
        return data

    } catch (error) {
        alert(error)
    }
    
}

const getNeighbournCountry = async data => {
    try {
        const neighbourn = await fetch(`http://restcountries.eu/rest/v2/alpha/${data.borders}`)

        if (!neighbourn) {
            throw new Error(`sem paises vizinhos`)
        }

         const dataNeighbourn = await neighbourn.json()
         return dataNeighbourn
    } catch (error) {
        console.log(error)
    }

}

const showDataCountry = async country => {
    const data = await getDataCountry(`${country}`)
    const neighbourn = await getNeighbournCountry(data)

    console.log(neighbourn)

    renderCountry(data)

}

showDataCountry('spain')
showDataCountry('brazi')





// const getCountryData = function (country) {
//     fetch(`http://restcountries.eu/rest/v2/name/${country}`)
//     .then(function (response) {
//         console.log(response)

//         return response.json()
//     }).then(function (data) {

//         console.log(data[0])
//         renderCountry(data[0])

//     })
// }

// getCountryData('australia')


// const getInformetionCityBrazil = function (city) {
//     fetch(`
//         https://servicodados.ibge.gov.br/api/v1/localidades/municipios/${city}/distritos?oderBy=name
//     `).then(response => {
//         console.log(response)
//         return response.json()
//     }).then(data => {
//         console.log(data[0])
//     })
// }

// getInformetionCityBrazil(3550308)