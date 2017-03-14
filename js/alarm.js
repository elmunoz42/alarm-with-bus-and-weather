var TriMetApiKey = require('./../.env').TriMetApiKey;
var _ = require('lodash');
var object = require('lodash/fp/object');

function Alarm(){
}

Alarm.prototype.getBusTime = function(stopId, displayFunction, alarmTime, city, routeNum) {
  $.get("https://developer.trimet.org/ws/V1/arrivals/locIDs/" + stopId + "/appID/"+ TriMetApiKey + "/json/true" ).then(function(response){
    console.log(response);
    var route = _.findKey(response.resultSet.arrival, {"route":parseInt(routeNum)});
    console.log(route);
    // estimatedTime = moment(response.resultSet.arrival[0].estimated).format("h:mm:ss a");
    estimatedTime = moment(response.resultSet.arrival[route].estimated).fromNow();
    console.log(estimatedTime);
    displayFunction(estimatedTime, alarmTime, city);

  }).fail(function(error) {
    $('#time').text(error.responseJSON.message);
  });
};

exports.alarmModule = Alarm;
