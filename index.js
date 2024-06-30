const searcBox = document.querySelector('.searcBox')
const searchButton = document.querySelector('.searchButton')
const city = document.querySelector('.city')
const country = document.querySelector('.country')
const datettime = document.querySelector('.dttime')
const tempdata = document.querySelector('.tempData')
const weatherdescription = document.querySelector('.weatherdescription')
const windGusts = document.querySelector('.windGusts')
const humidityData = document.querySelector('.humidityData')
const pressuredata = document.querySelector('.pressuredata')
const visibilitydata = document.querySelector('.visibilitydata')
const windspeeddata = document.querySelector('.windspeeddata')
const sealeveldata = document.querySelector('.sealeveldata')
const weatherImage = document.querySelector('.weatherImage')
const resultCard = document.querySelector('.resultCard')

const showResult = async () => {
  const searchValue = searcBox.value
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=${'9982c367e5e9e5b92cd219e919b743ae'}`
  const weather_data = await fetch(`${url}`).then((response) => response.json())
  console.log(weather_data)
  const date = new Date()
  const hour = date.getHours()
  const minute = date.getMinutes()

  if (weather_data.cod == '404') {
    resultCard.innerHTML = `<img src="img/404.png" alt="">`
    resultCard.style.display = 'block'
    searcBox.value = ''
    searcBox.focus()
  } else {
    city.innerHTML = `${weather_data.name},`
    country.innerHTML = weather_data.sys.country
    datettime.innerHTML = `${hour}:${minute}`
    const temp_data = Math.round(weather_data.main.temp - 273.15)
    tempdata.innerHTML = `${temp_data}'c`
    weatherdescription.innerHTML = `${weather_data.weather[0].main}`
    const windGustsdata = Math.round(weather_data.wind.gust * 3.6)
    windGusts.innerHTML = `${windGustsdata} Km/h`
    humidityData.innerHTML = `${weather_data.main.humidity}%`
    pressuredata.innerHTML = `${weather_data.main.pressure} mb`
    const visibledata = weather_data.visibility / 1000
    visibilitydata.innerHTML = `${visibledata} Km`
    const winddata = Math.round(weather_data.wind.speed * 3.6)
    windspeeddata.innerHTML = `${winddata} Km/h`
    sealeveldata.innerHTML = `${weather_data.main.sea_level}`
    switch (weather_data.weather[0].main) {
      case 'Clouds':
        weatherImage.src = 'img/cloud.png'
        break
      case 'Clear':
        weatherImage.src = 'img/clear.png'
        break
      case 'Rain':
        weatherImage.src = 'img/rain.png'
        break
      case 'Mist':
        weatherImage.src = 'img/mist.png'
        break
      case 'Snow':
        weatherImage.src = 'img/snow.png'
        break
    }
    resultCard.style.display = 'block'
  }
}
searchButton.addEventListener('click', showResult)
