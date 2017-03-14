var apiKey = require('./../.env').apiKey;
function Weather(){
}

Weather.prototype.getHumidity = function(city, displayFunction) {
  $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey).then(function(response){
    displayFunction(city, response.main.humidity);
  }).fail(function(error) {
    $('.showWeather').text(error.responseJSON.message);
  });
};

Weather.prototype.getTemperature = function(deg, city, displayFunction) {
  console.log(deg);
  $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey).then(function(response){
    console.log(response.main.temp);
    if(deg=="C"){
      displayFunction(deg, city, (parseFloat(response.main.temp)-273.15).toFixed(2));
    }else if(deg=="F"){
      displayFunction(deg, city, (1.8*(parseFloat(response.main.temp)-273.15) + 32 ).toFixed(2));
    }else{
    }
  }).fail(function(error) {
    $('.showWeather').text(error.responseJSON.message);
  });
};

exports.weatherModule = Weather;
