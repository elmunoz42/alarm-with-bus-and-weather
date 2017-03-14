var TriMetApiKey = require('./../.env').TriMetApiKey;

function Alarm(){
}

Alarm.prototype.getBusTime = function(stopId, displayFunction, alarmTime, city) {
  $.get("https://developer.trimet.org/ws/V1/arrivals/locIDs/" + stopId + "/appID/"+ TriMetApiKey + "/json/true" ).then(function(response){
    // estimatedTime = moment(response.resultSet.arrival[0].estimated).format("h:mm:ss a");
    estimatedTime = moment(response.resultSet.arrival[0].estimated).format("m");
    displayFunction(estimatedTime, alarmTime, city);

  }).fail(function(error) {
    $('#time').text(error.responseJSON.message);
  });
};

exports.alarmModule = Alarm;
