var Weather = require('./../js/weather.js').weatherModule;
var Alarm = require('./../js/alarm.js').alarmModule;
var snoozeCount = 0;
var currentWeatherObject = new Weather();
var currentAlarmObject = new Alarm();
var city = "Portland, OR";
var estimatedTime = "";


$(document).ready(function(){


  // var test = moment().add(7, "h").add(20, "m")._d
  // console.log(moment(test).isBefore(moment()));
  // console.log(moment([2017,2,14,9,48,0])._d);
  var alarmFunction = function(estTime, alarmTime, city) {
    // [2017,2,14,9,48,0]
    setInterval(function(){
      var alarm = moment().to(moment(alarmTime));
      if(moment(alarmTime).isBefore(moment())){
        if(snoozeCount===0){
          alert("Wake up!");
          $('#time').empty();
          $('#time').append("Wake up! The bus is coming in " + estTime + " minutes <br>");
          currentWeatherObject.getHumidity(city, displayHumidity);
          currentWeatherObject.getTemperature(city, displayTemperature);
        }
        else if(snoozeCount%90===0){
          $('#time').text("Why aren't you up yet. You missed your bus. The next one comes in " + estTime + " minutes <br>");
        }
        snoozeCount++;
        // console.log(snoozeCount);
      }else{
        $('#time').text("Your alarm goes off " + alarm);
      }
    },2000);
  };



  $("#alarm-setup").submit(function(){
    event.preventDefault();
    var alarmTime = $("#alarm-time").val();
    var city = $("#city").val();
    var busStopId = $("#bus-stop").val();
    var splitTime = alarmTime.split(":");
    var finalTime = moment().hour(splitTime[0]).minute(splitTime[1]);
    console.log(finalTime._d);
    currentAlarmObject.getBusTime(busStopId, alarmFunction, finalTime, city);

  });

  // var city = $('#location').val();
  var displayHumidity = function(city, humidityData) {
    $('#time').append("The humidity in " + city + " is " + humidityData + "%");
  };

  var displayTemperature = function(city, temperatureData) {
    $('#time').append(" and the temperature is " + temperatureData + "&#8451;<br>");
  };

});
