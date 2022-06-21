module.exports = date;

function date(){
    var today = new Date();
    var options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    var currentDay = today.toLocaleDateString("en-US", options);
    return currentDay;
}
