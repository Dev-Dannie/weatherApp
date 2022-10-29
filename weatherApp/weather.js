// Define variables for the Api url for easy access
const urlBase= "https://api.openweathermap.org/data/2.5/weather?q="
const apiUnit = "&units=metric&" 
const apiKey = "appid=95922309d016dda4a709c2e8af4d976f" 

const cityName = document.querySelector(".city")
const wicon = document.querySelector(".icon")
const desc = document.querySelector(".desc")
const temperature = document.querySelector(".temp")
const whumidity = document.querySelector(".humidity")
const wspeed = document.querySelector(".wind")
const theWeather = document.querySelector(".weather")
const lowTemp = document.querySelector(".low")
const highTemp = document.querySelector(".high")
const searchBar = document.querySelector('.search-bar')


// create weather object
let weather = {
    // API call
    getWeather: function (city) {
        // fetch api by concatenation
        fetch(urlBase + city + apiUnit + apiKey).then((response) => 
        {
            if (!response.ok){
                alert(
                    'Weather Not Found'
                )
                throw new Error(
                    'Weather Not Found'
                )
            }
            return response.json()
        })
        .then((values) => this.screenDisplay(values))
       
    },
    screenDisplay: function (value) {
        const { name } = value;
        const { temp, temp_max, temp_min, humidity } = value.main;
        const { description, icon } = value.weather[0];
        const { speed } = value.wind;
        console.log(name)
       
        cityName.innerText = 'Weather in ' + name;
        temperature.innerText = temp + "°C";
        wicon.innerText =  "https://openweathermap.org/img/wn/" + icon + ".png";
        wspeed.innerText =  "Wind speed: " + speed + " km/h";
        whumidity.innerText = "Humidity: " + humidity + "%";
        desc.innerText = description
        lowTemp.innerText = 'L : ' + temp_min
        highTemp.innerText = 'H : ' + temp_max
        theWeather.classList.remove("loading");
        document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + description + "')";
   },

   search: function (){
      this.getWeather(searchBar.value)
   }
}

const searchBtn = document.querySelector('.search button')

searchBtn.addEventListener('click', () => {
    weather.search()
})

searchBar.addEventListener('keyup', (e) => {
    if (e.key == 'Enter'){
        weather.search()
    }
})

// default city to be displayed when window is loaded 
weather.getWeather('Texas')



