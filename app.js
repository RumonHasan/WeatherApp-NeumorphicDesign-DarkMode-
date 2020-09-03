// query selectors
const searchBox = document.querySelector(".location-input");
const cityValueSubmit = document.querySelector(".check-weather")
const contentWeather = document.querySelector(".weather-content");
const checkbox = document.querySelector('input[name=theme]');

// preliminery functions: 
    //temp conversion function 
    const showCelcius = (TempIndex) =>{
        const kelvinMeasure = 273.15;
        if(TempIndex >= kelvinMeasure ){
            const celcius = Math.round(TempIndex - kelvinMeasure)
                return celcius;
        }
    }

// api + json data retrieval 
class getWeatherData{
    async weatherData(cityName){
        try{
        const apiKey = '1e0a96c4144dccacd3b3c95a25c6d0ac';// api key 
        const baseURL = 'http://api.openweathermap.org/data/2.5/weather'// base url 
        const query = `?q=${cityName}&appid=${apiKey}` // appending query in order to scrape for the city 

        let resultData = await fetch(baseURL+query) // city and country name custom added in order to access api
        let weatherInfo = await resultData.json()

        let weatherTemp = showCelcius(weatherInfo.main.temp)

        let weatherHumid = weatherInfo.main.humidity 
        let weatherCountry = weatherInfo.sys.country
        
        let weatherDesc = weatherInfo.weather // prototype arrays are itereable 
        weatherDesc = weatherDesc.map(weatherIndex=>{
            const desc = weatherIndex.description
            return desc
        })

        return {cityName ,weatherTemp, weatherDesc, weatherHumid, weatherCountry}

        }catch{
            console.log("Fetching Data Unsuccessful! ")
        }
    }
}


// user interface class
class UI{ // displays the content of the weather data
    displayData(weatherElement){
        console.log(weatherElement);
    }
    
}
// local storage class 
class storage{ // storing data in local storage 
    static weatherStorage(weatherData){
        localStorage.setItem("weatherData", JSON.stringify(weatherData));
    }
}

// document object model eventListener
document.addEventListener('DOMContentLoaded', ()=>{ // class for adding the weather data after the page is loaded 
    const ui = new UI();// user interface
    const weatherData = new getWeatherData();// data collection from json file 

    cityValueSubmit.addEventListener('click', e=>{ // adding event listener for the form to user input the city name 
        e.preventDefault();
        const city = searchBox.value.trim(); // trimming unnecesary spaces of the city entered 

        weatherData.weatherData(city).then(weatherIndex=>{
            ui.displayData(weatherIndex);
            storage.weatherStorage(weatherIndex);
        })
    })

        // dark mode function 
        checkbox.addEventListener('change', e=>{
            if(checkbox.checked){
                trans()
                const bodyElement = document.getElementsByTagName("BODY")[0];
                bodyElement.setAttribute('data-theme', 'dark')
            }else if(!checkbox.checked){
                trans()
                const bodyElement = document.getElementsByTagName("BODY")[0];
                bodyElement.setAttribute('data-theme', 'light')
            }
        })
        let trans = () =>{
            // allows us to add a transition property to every element that changes when clicking dark mode
            const bodyElement = document.getElementsByTagName("BODY")[0];
            bodyElement.classList.add('transition')
            window.setTimeout(()=>{
                const bodyElement = document.getElementsByTagName("BODY")[0];
                bodyElement.classList.remove('transition')
            }, 1000)
        }
})