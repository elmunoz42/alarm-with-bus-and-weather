var Weather = require('./../js/weather.js').weatherModule;
var Alarm = require('./../js/alarm.js').alarmModule;
var snoozeCount = 0;
var currentWeatherObject = new Weather();
var currentAlarmObject = new Alarm();
var city = "Portland, OR";

var getEstTime = function(estTime){
  $('#time').append("Wake up! The bus is coming in " + estTime + " minutes <br>");
};

$(document).ready(function(){

  setInterval(function(){
    $("#current").text(moment().format("h:mm:ss a"));
  },1000);

  var alarmFunction = function(alarmTime, city, stopId, routeNum) {
    // [2017,2,14,9,48,0]
    var estTime = "";
    setInterval(function(){
      var alarm = moment().to(moment(alarmTime));
      // console.log(alarm);
      if(moment(alarmTime).isBefore(moment())){
        if(snoozeCount===0){
          alert("Wake up!");
          $('#time').empty();
          currentAlarmObject.getBusTime(stopId, routeNum, getEstTime);
          // console.log(estTime);

          currentWeatherObject.getHumidity(city, displayHumidity);
          currentWeatherObject.getTemperature(city, displayTemperature);
        }
        else if(snoozeCount%90===0){
          estTime = currentAlarmObject.getBusTime(stopId, routeNum);
          $('#time').text("Why aren't you up yet. You missed your bus. The next one comes " + estTime + "  <br>");
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
    var finalTime = moment().hour(splitTime[0]).minute(splitTime[1]).second(0);
    var routeNumber = $("#route").val();
    console.log(routeNumber);
    console.log(finalTime._d);
    // currentAlarmObject.getBusTime(busStopId, alarmFunction, finalTime, city, routeNum);
    alarmFunction(finalTime, city, busStopId, routeNumber);
  });

  // var city = $('#location').val();
  var displayHumidity = function(city, humidityData) {
    $('#time').append("The humidity in " + city + " is " + humidityData + "%");
  };

  var displayTemperature = function(city, temperatureData) {
    $('#time').append(" and the temperature is " + temperatureData + "&#8451;<br>");
  };

});
