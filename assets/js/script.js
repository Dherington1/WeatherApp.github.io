var searchBtn = document.querySelector("#searchBtn");
var input = document.getElementById("input");

// array for recent searches 
var recents = /* add JSON get when named */ [];


var search = function(){
    // run fetchweather function
    // this will paste information on page too
    fetchWeather(input.value); 

    // save search to the recents 
    //saveRecents();
    // clear search input bar 
    input.textContent = "";
    // make recents run fetchweather 
    
}


var apiKey = "05c329d588ef79eaaf88463aa20fdd70";
    
var fetchWeather = function(city){
        // formating our url 
        // using other variables to insert the city searched and for the apikey 
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey)
        // this requests the url 
        .then(function(response){
            // turn our information into readable content
            response.json().then(function(data){
                // reads our results 
                grabCoords(data);
                
            })   
        })
        
        
        
}

var grabCoords = function(data){
    var { lon, lat } = data.coord;
    var { dt } = data;

    let apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&dt=" + dt + "&units=imperial&appid=" + apiKey;
    fetch(apiUrl).then(function(response){
        
        response.json().then(function(data){
            pageContenVars(data);
        })

            
    })
    

}

var pageContenVars = function(data) {
    var { icon } = data.current
    var { temp, humidity, uvi, wind_speed, } = data.current
    console.log(icon, temp, humidity, uvi, wind_speed);

     // conects to the empty div
     var currentWeatherEl = document.querySelector("#currentWeather")
     // paste <h2> city name with <span> of date
     var cityName = document.createElement("h2")
     cityName.textContent = icon;
     //moment to get daily weather as a <span>

     // do the word temp with tempature
     var cityTemp = document.createElement("h4")
     cityTemp.textContent = "Temp: " + temp + "°F";
     // do the word wind with wind speed 
     var cityWind = document.createElement("h4")
     cityWind.textContent = "Wind: " + wind_speed + "MPH";
     // do the word humidity with huidity 
     var cityHumidity = document.createElement("h4")
     cityHumidity.textContent = "Humidity: " + humidity +"%";
     // uv ray 
     var cityUV = document.createElement("h4")
     cityUV.textContent = "UV index: " + uvi;
     
    
     currentWeatherEl.appendChild(cityName)
     currentWeatherEl.appendChild(cityTemp);
     currentWeatherEl.appendChild(cityWind);
     currentWeatherEl.appendChild(cityHumidity);
     currentWeatherEl.appendChild(cityUV);

}
// fist function grabs the lat and lon dt 
// create new function to then use those to grab all the other 

// use the lon, lat, dt to do another fetch which will allow us to grab the uv ray
// takes in our data 


//fetchWeather("oakland");


// event for the search button 
searchBtn.addEventListener("click", search);
