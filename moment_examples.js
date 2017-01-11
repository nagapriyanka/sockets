var moment = require('moment');
var now = moment();
// console.log(now.format());
// console.log(now.format('x'));
// console.log(now.valueOf())
// console.log(now.format('X'));
// console.log(now.format('MMM Do YYYY , h:mm a'));
var timestamp = 141678433980454;
var timestampMoment = moment.utc(timestamp);
console.log(timestamp);
console.log(timestampMoment.format('h:mm a')); 