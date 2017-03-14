var TriMetApiKey = require('./../.env').TriMetApiKey;
var _ = require('lodash');
var object = require('lodash/fp/object');

function Alarm(){
}


// var alarmDisplay = function(estTime, alarmTime, city, stopId, routeNum) {
//   // [2017,2,14,9,48,0]
//   setInterval(function(){
//     var alarm = moment().to(moment(alarmTime));
//     if(moment(alarmTime).isBefore(moment())){
//       if(snoozeCount===0){
//         alert("Wake up!");
//         $('#time').empty();
//
//         $('#time').append("Wake up! The bus is coming in " + estTime + " minutes <br>");
//         currentWeatherObject.getHumidity(city, displayHumidity);
//         currentWeatherObject.getTemperature(city, displayTemperature);
//         currentAlarmObject.getBusTime(stopId, city, routeNum);
//       }
//       else if(snoozeCount%90===0){
//         $('#time').text("Why aren't you up yet. You missed your bus. The next one comes in " + estTime + " minutes <br>");
//       }
//       snoozeCount++;
//       // console.log(snoozeCount);
//     }else{
//       $('#time').text("Your alarm goes off " + alarm);
//     }
//   },2000);
// };


// Alarm.prototype.getBusTime = function(stopId, displayFunction, alarmTime, city, routeNum) {
Alarm.prototype.getBusTime = function(stopId, routeNum, getEstTime) {
  $.get("https://developer.trimet.org/ws/V1/arrivals/locIDs/" + stopId + "/appID/"+ TriMetApiKey + "/json/true" ).then(function(response){
    // console.log(response);
    var route = _.findKey(response.resultSet.arrival, {"route":parseInt(routeNum)});
    // console.log(route);
    var estimatedTime = moment(response.resultSet.arrival[route].estimated).fromNow();
    console.log("estimated" + estimatedTime);
    getEstTime(estimatedTime);
    // return estimatedTime;

  }).fail(function(error) {
    $('#time').text(error.responseJSON.message);
  });
};

exports.alarmModule = Alarm;
