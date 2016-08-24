var source = $("#mapTemplate").html();
var template = Handlebars.compile(source);
var html = template(mapImage);
$("#forecastMapDisplay").html(html);
