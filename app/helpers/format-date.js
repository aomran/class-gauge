import Ember from 'ember';

function formatDate(time) {
  var timestamp = new Date(time);
  // example: Wed Jul 28 1993
  var date = timestamp.toDateString();
  
  // example: 1 pm, 10 am
  var hours = timestamp.getHours();
  var ampm = (hours < 12) ? ' am' : ' pm';
  hours = hours % 12 || 12;

  // example 05, 25, etc.
  var minutes = timestamp.getMinutes();
  minutes = (minutes < 10) ? '0' + minutes : minutes;

  return date + ', ' + [hours, minutes].join(':') + ampm;
}

export {
  formatDate
};

export default Ember.Handlebars.makeBoundHelper(formatDate);
