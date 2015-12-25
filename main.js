jQuery(document).ready(function($) {

var here;
var weather;

var baseurl = "http://kmccafferty.github.io/weatherdog";

function errorWeather(){
  $('#weathercap').append(
        "<p class='caption'>Ruh-roh; Brógan doesn't know. Try again.</p>");
        $(".brogan").append('<img id="dog" src="'+baseurl+'/dog/Cold_Dog.svg" alt="Cold Brógan"></img>');
        $(".landscape").append('<img id="land" src="'+baseurl+'/land/Snowy_Back.svg"></img>');
        $(".conditions").append(
            '<img class="sunclouds" id="sunshine" src="'+baseurl+'/weather/sunshine.svg" alt="Sunshine"></img>'+
            '<img class="sunclouds" id="suncloud01" src="'+baseurl+'/weather/suncloud_01.svg" alt="Cloud01"></img>'+
            '<img class="sunclouds" id="suncloud02" src="'+baseurl+'/weather/suncloud_02.svg" alt="Cloud02"></img>'+
            '<img class="sunclouds" id="suncloud03" src="'+baseurl+'/weather/suncloud_03.svg" alt="Cloud03"></img>'+
            '<img class="rain" id="frain" src="'+baseurl+'/weather/rain_fast.svg" alt="Fast Rain"></img>'+
            '<img class="rain" id="mrain" src="'+baseurl+'/weather/rain_med.svg" alt="Medium Rain"></img>'+
            '<img class="rain" id="srain" src="'+baseurl+'/weather/rain_slow.svg" alt="Slow Rain"></img>'+
            '<img class="snow" id="fsnow" src="'+baseurl+'/weather/snow_fast.svg" alt="Fast Snow"></img>'+
            '<img class="snow" id="msnow" src="'+baseurl+'/weather/snow_med.svg" alt="Medium Snow"></img>'+
            '<img class="snow" id="ssnow" src="'+baseurl+'/weather/snow_slow.svg" alt="Slow Snow"></img>'+
            '<img class="snow" id="srsnow" src="'+baseurl+'/weather/snow_slower.svg" alt="Slowest Snow"></img>'
        );
        $(".objects").append('<img id="snowface" src="'+baseurl+'/extra/snow_face.svg" alt="Snowy Face"></img>'+
          '<img class="sweat" id="sweat01" src="'+baseurl+'/extra/sweat_01.svg" alt="Sweat01"></img>'+
          '<img class="sweat" id="sweat02" src="'+baseurl+'/extra/sweat_02.svg" alt="Sweat02"></img>'+
          '<img id="umbrella" src="'+baseurl+'/extra/umbrella.svg" alt="Umbrella"></img>'
          );
}

function getWeather(){
  $.ajax({
    // url : "http://api.wunderground.com/api/da95e29b1991919c/geolookup/conditions/q/IA/Cedar_Rapids.json",
    url : "http://api.wunderground.com/api/da95e29b1991919c/geolookup/conditions/q/"+here+".json",
    dataType : "jsonp",
    success : function(parsed_json) {
    	console.log(parsed_json);

      if(!parsed_json['location']){
        errorWeather();
        return;
      }

      var location = parsed_json['location']['city'];

      //can also write as parsed_json.current_observation.temp
    	var temperature = parsed_json['current_observation']['temp_f'];
    	var conditions = parsed_json['current_observation']['weather'];

      //empty the container, then append new info when user submits.
      $('#weathercap').append(
        "<p class='caption'>Brógan currently finds <strong>"+location+"</strong> to be <strong>"+temperature+" degrees</strong> and <strong>"+conditions+"</strong></p>"
        );
    	
      ///////////////////////////////////////////////////////////
    	// TEST TEMPERATURE ///////////////////////////////////////
      ///////////////////////////////////////////////////////////

      
      if (temperature <= 38.9 ){
        //SHOW COLD BROGAN AND SNOWY LAND
        $(".brogan").append('<img id="dog" src="'+baseurl+'/dog/Cold_Dog.svg" alt="Cold Brógan"></img>');
        $(".landscape").append('<img id="land" src="'+baseurl+'/land/Snowy_Back.svg" alt="Snowy Land"></img>');

    	} else if(temperature >= 39.0 && temperature <= 54.9){ 
        // SHOW COLD BROGAN AND NORMAL LAND
        $(".brogan").append('<img id="dog" src="'+baseurl+'/dog/Cold_Dog.svg" alt="Cold Brógan"></img>');
        $(".landscape").append('<img id="land" src="'+baseurl+'/land/Normal_Back.svg" alt="Warm Land"></img>');

    	} else if (temperature >= 55.0 && temperature <= 73.9) {
        // SHOW NORMAL BROGAN AND NORMAL LAND
        $(".brogan").append('<img id="dog" src="'+baseurl+'/dog/Normal_Dog.svg" alt="Warm Brógan"></img>');
        $(".landscape").append('<img id="land" src="'+baseurl+'/land/Normal_Back.svg" alt="Warm Land"></img>');

    	} else {
        // SHOW HOT, SWEATING BROGAN AND NORMAL LAND
        $(".brogan").append('<img id="dog" src="'+baseurl+'/dog/Hot_Dog.svg" alt="Hot Brógan"></img>');
        $(".landscape").append('<img id="land" src="'+baseurl+'/land/Normal_Back.svg" alt="Warm Land"></img>');
        $(".objects").append(
            '<img class="sweat" id="sweat01" src="'+baseurl+'/extra/sweat_01.svg" alt="Sweat01"></img>'+
            '<img class="sweat" id="sweat02" src="'+baseurl+'/extra/sweat_02.svg" alt="Sweat02"></img>');

    	} //end temperature test/////////////

      ////////////////////////////////////////////////////////
    	//TEST WEATHER CONDITIONS///////////////////////////////
      ////////////////////////////////////////////////////////

      //FOR CLEAR
    	if ( conditions == "Clear" 
    		|| conditions == "Partly Cloudy"
    		|| conditions == "Scattered Clouds" ){
          // SHOW SUNSHINE 
          $('.conditions').append('<img class="sunclouds" id="sunshine" src="'+baseurl+'/weather/sunshine.svg" alt="Sunshine"></img>'+
              '<img class="sunclouds" id="suncloud01" src="'+baseurl+'/weather/suncloud_01.svg" alt="Cloud01"></img>'+
              '<img class="sunclouds" id="suncloud02" src="'+baseurl+'/weather/suncloud_02.svg" alt="Coud02"></img>'+
              '<img class="sunclouds" id="suncloud03" src="'+baseurl+'/weather/suncloud_03.svg" alt="Cloud03"></img>');

      //FOR CLOUDS
      } else if( conditions == "Overcast"
        || conditions == "Mostly Cloudy"
        || conditions == "Haze"){
          //SHOW CLOUDS
          $('.conditions').append('<img class="sunclouds" id="suncloud01" src="'+baseurl+'/weather/suncloud_01.svg" alt="Cloud01"></img>'+
              '<img class="sunclouds" id="suncloud02" src="'+baseurl+'/weather/suncloud_02.svg" alt="Cloud02"></img>'+
              '<img class="sunclouds" id="suncloud03" src="'+baseurl+'/weather/suncloud_03.svg" alt="Cloud03"></img>');

      //FOR RAIN      
    	} else if ( conditions == "Rain" 
    		|| conditions == "Drizzle" 
        || conditions == "Light Drizzle"
    		|| conditions == "Rain Showers"
        || conditions == "Light Rain Showers"
    		|| conditions == "Rain Mist"
    		|| conditions == "Hail Showers"
        || conditions == "Light Rain"){
          // SHOW PUDDLES, FALLING RAIN, & UMBRELLA
          $(".landscape").append('<img id="land" src="'+baseurl+'/land/Rainy_Back.svg" alt="Rainy Land"></img>');
           $(".conditions").append(
              '<img class="rain" id="frain" src="'+baseurl+'/weather/rain_fast.svg" alt="Fast Rain"></img>'+
              '<img class="rain" id="mrain" src="'+baseurl+'/weather/rain_med.svg" alt="Medium Rain"></img>'+
              '<img class="rain" id="srain" src="'+baseurl+'/weather/rain_slow.svg" alt="Slow Rain"></img>');
          $(".objects").append('<img id="umbrella" src="'+baseurl+'/extra/umbrella.svg" alt="Umbrella"></img>');

      //FOR FOG
       } else if ( conditions == "Fog"
        || conditions == "Freezing Fog"
        || conditions == "Patches of Fog"
        || conditions == "Fog Patches"
        || conditions == "Shallow Fog"
        || conditions == "Partial Fog"
        || conditions == "Haze"){
        //SHOW FOG
        $(".conditions").append('<img class="sunclouds" id="suncloud01" src="'+baseurl+'/weather/suncloud_01.svg" alt="Cloud01"></img>'+
              '<img class="sunclouds" id="suncloud02" src="'+baseurl+'/weather/suncloud_02.svg" alt="Cloud02"></img>'+
              '<img class="sunclouds" id="suncloud03" src="'+baseurl+'/weather/suncloud_03.svg" alt="Cloud03"></img>'+
              '<img class="fog" src="'+baseurl+'/weather/fog_main.svg" alt="Fog"></img>');


      //FOR THUNDERSTORMS
      } else if ( conditions == "Thunderstorm"
        || conditions == "Thunderstorms and Rain"
        || conditions == "Thunderstorms with Hail"
        || conditions == "Thunderstorms and Ice Pellets"
        || conditions == "Thunderstorms with Small Hail"
        || conditions == "Squalls"
        || conditions == "Funnel Cloud"){
        //SHOW RAINY BACKGROUND, RAIN, DARK CLOUDS, LIGHTENING, UMBRELLA
          $(".landscape").append('<img id="land" src="'+baseurl+'/land/Rainy_Back.svg" alt="Rainy Land"></img>');
          $(".conditions").append(
              '<img class="rain" id="frain" src="'+baseurl+'/weather/rain_fast.svg" alt="Fast Rain"></img>'+
              '<img class="rain" id="mrain" src="'+baseurl+'/weather/rain_med.svg" alt="Medium Rain"></img>'+
              '<img class="rain" id="srain" src="'+baseurl+'/weather/rain_slow.svg" alt="Slow Rain"></img>'+
              '<img class="sunclouds" id="stormcloud01" src="'+baseurl+'/weather/stormcloud01.svg" alt="Storm01"></img>'+
              '<img class="sunclouds" id="stormcloud02" src="'+baseurl+'/weather/stormcloud02.svg" alt="Storm02"></img>'+
              '<img class="sunclouds" id="stormcloud03" src="'+baseurl+'/weather/stormcloud03.svg" alt="Storm03"></img>'+
              '<img class="lightening" id="lightening" src="'+baseurl+'/weather/lightening.svg" alt="Lightening"></img>');
          $(".objects").append('<img id="umbrella" src="'+baseurl+'/extra/umbrella.svg" alt="Umbrella"></img>');

      //FOR SNOW  
      } else if ( conditions == "Snow Showers"
        || conditions == "Snow Blowing Snow Mist"
        || conditions == "Low Drifting Snow"
        || conditions == "Ice Pellet Showers"
        || conditions == "Thunderstorms and Snow"
        || conditions == "Freezing Drizzle"
        || conditions == "Freezing Rain"
        || conditions == "Ice Pellets"
        || conditions == "Snow"
        || conditions == "Light Snow"
        || conditions == "Snow Grains"){
          //SHOW FALLING SNOW & SNOWY FACE
          $(".conditions").append(
              '<img class="snow" id="fsnow" src="'+baseurl+'/weather/snow_fast.svg" alt="Fast Snow"></img>'+
              '<img class="snow" id="msnow" src="'+baseurl+'/weather/snow_med.svg" alt="Medium Snow"></img>'+
              '<img class="snow" id="ssnow" src="'+baseurl+'/weather/snow_slow.svg" alt="Slow Snow"></img>'+
              '<img class="snow" id="srsnow" src="'+baseurl+'/weather/snow_slower.svg" alt="Slowest Snow"></img>');
           $(".objects").append('<img id="snowface" src="'+baseurl+'/extra/snow_face.svg" alt="Snowy Face"></img>');

    	} else {
        errorWeather();
    	} //END CONDITION TESTS

    } //END SUCCESS FUNCTION
  }); //END AJAX CALL
} // END getWeather FUNCTION

var today = new Date();
var hanukkahStart = new Date(2015, 11, 06);
var hanukkahEnd = new Date(2015, 11, 14);
var newyearStart = new Date(2015, 11, 31);
var newyearEnd = new Date(2016, 00, 01);


//DEFAULT WEATHER DISPLAY
function defaultWeather(){

  if (new Date().toString().indexOf("Dec 25") > -1) {
        $('#weathercap').append(
          "<p class='caption'>Brógan says <strong>Happy Christmas</strong>, roo roo!</p>");
        $(".brogan").append('<img id="dog" src="'+baseurl+'/dog/Christmas_Dog.svg" alt="Christmas Brógan"></img>');
        $(".landscape").append('<img id="land" src="'+baseurl+'/land/SnowyNight_Back.svg" alt="Snowy Nightime Land"></img>');
        $(".conditions").append(
            '<img class="blinkers" src="'+baseurl+'/extra/Stars01.svg" alt="Stars01"></img>'+
            '<img class="blinkers" src="'+baseurl+'/extra/Stars02.svg" alt="Stars02"></img>'+
            '<img class="blinkers" src="'+baseurl+'/extra/Stars03.svg" alt="Stars03"></img>');
        $('.objects').append(
            '<img class="blinkers" id="blinkers_red" src="'+baseurl+'/extra/Blinkers_Red.svg" alt="Red Lights"></img>' +
            '<img class="blinkers" id="blinkers_blue" src="'+baseurl+'/extra/Blinkers_Blue.svg" alt="Blue Lights"></img>' +
            '<img class="blinkers" id="blinkers_yellow" src="'+baseurl+'/extra/Blinkers_Yellow.svg" alt="Yellow Lights"></img>' +
            '<img class="blinkers" id="blinkers_green" src="'+baseurl+'/extra/Blinkers_Green.svg" alt="Green Lights"></img>'
        );
        console.log("MERRY CHRISTMAS!");

    //HANUKKAH
    } else if ( hanukkahStart <= today && hanukkahEnd >= today ){
      $('#weathercap').append(
          "<p class='caption'>Brógan says <strong>חנוכה שמח</strong>, roo roo!</p>");
      $(".brogan").append('<img id="dog" src="'+baseurl+'/dog/Hanukkah_Dog.svg" alt="Hanukkah Brógan"></img>');
      $(".landscape").append('<img id="land" src="'+baseurl+'/land/SnowyNight_Back.svg" alt="Snowy Nighttime Land"></img>');
      $(".conditions").append(
            '<img class="blinkers" id="blinkers_red" src="'+baseurl+'/extra/Stars01.svg" alt="Stars01"></img>'+
            '<img class="blinkers" id="blinkers_yellow" src="'+baseurl+'/extra/Stars02.svg" alt="Stars02"></img>'+
            '<img class="blinkers" id="blinkers_green" src="'+baseurl+'/extra/Stars03.svg" alt="Stars03"></img>');
      $('.objects').append(
            '<img class="blinkers" id="menorah" src="'+baseurl+'/extra/Menorah.svg" alt="Menorah"></img>'+
            '<img class="blinkers" id="blinkers_red" src="'+baseurl+'/extra/Candle01.svg" alt="Candle01"></img>' +
            '<img class="blinkers" id="blinkers_blue" src="'+baseurl+'/extra/Candle02.svg" alt="Candle02"></img>' +
            '<img class="blinkers" id="blinkers_yellow" src="'+baseurl+'/extra/Candle03.svg" alt="Candle03"></img>'
        );
      console.log("חנוכה שמח! HAPPY HANUKKAH!");

    //WRAN DAY  
    } else if (new Date().toString().indexOf("Dec 26") > -1){  
       $('#weathercap').append(
          "<p class='caption'>Brógan says <strong>Lá an Dreoilín shona daoibh</strong>, roo roo!</p>");
        $(".brogan").append('<img id="dog" src="'+baseurl+'/dog/Mummer_dog.svg" alt="Mummer Brógan"></img>');
        $(".landscape").append('<img id="land" src="'+baseurl+'/land/Snowy_Back.svg" alt="Snowy Land"></img>');
        $(".conditions").append(
            '<img class="snow" id="fsnow" src="'+baseurl+'/weather/snow_fast.svg" alt="Fast Snow"></img>' +
            '<img class="snow" id="msnow" src="'+baseurl+'/weather/snow_med.svg" alt="Medium Snow"></img>' +
            '<img class="snow" id="ssnow" src="'+baseurl+'/weather/snow_slow.svg" alt="Slow Snow"></img>' +
            '<img class="snow" id="srsnow" src="'+baseurl+'/weather/snow_slower.svg" alt="Slowest Snow"></img>');
        $('.objects').append(
            '<img class="blinkers" id="wren_feet" src="'+baseurl+'/extra/Wren_feet.svg" alt="Wren Feet"></img>' +
            '<img class="blinkers" id="wren_body" src="'+baseurl+'/extra/Wren_body.svg" alt="Wren Body"></img>'
        );
        console.log("HAPPY WRAN DAY!");

     //NEW YEAR   
     } else if (newyearStart <= today && newyearEnd >= today ){
      $('#weathercap').append(
          "<p class='caption'>Brógan says <strong>Happy New Year</strong>, roo roo!</p>");
        $(".brogan").append('<img id="dog" src="'+baseurl+'/dog/NewYear_dog.svg" alt="NewYear Brógan"></img>');
        $(".landscape").append('<img id="land" src="SnowyNight_Back.svg" alt="Snowy Nighttime Back"></img>');
        $(".conditions").append(
            '<img class="blinkers" id="blinkers_red" src="'+baseurl+'/extra/Stars01.svg" alt="Stars01"></img>'+
            '<img class="blinkers" id="blinkers_yellow" src="'+baseurl+'/extra/Stars02.svg" alt="Stars02"></img>'+
            '<img class="blinkers" id="blinkers_green" src="'+baseurl+'/extra/Stars03.svg" alt="Stars03"></img>');
        console.log("HAPPY NEW YEAR!");

    // Default to Cleveland    
    } else {

      //Default Display
        here = 44070
        getWeather();
    }
    $('input').val('Enter a location');
}

//When User Submits Own Location
function userWeather(){
  event.preventDefault();
  here = $('input').val()
  $('.landscape, .conditions, .brogan, .objects, #weathercap').empty();
  getWeather();
};


//Set Display to Default when Page Loads
$(window).load(function() {
  defaultWeather();
});

//User submits their location
$('#button').click(function(){
  userWeather();
});

$('#reset').click(function(){
  defaultWeather();

});


//Allows user to hit enter key
$('input').keypress(function (e) {
  if (e.which == 13) {
    userWeather();    
  }
});

//Clear input text on focus or click
$('input:text').focus(function(){
  $(this).val('');
});
$('input:text').click(function(){
  $(this).val('');
});


}); //End OnReady










