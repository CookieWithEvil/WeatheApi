var o = {
  curDeg: "C",
  degSign: "&deg;",
  temp_c: 0,
  temp_f: 0,
  lat: 0,
  lon: 0
};
//GETTING CURRENT TIME FOR BG
var hours = new Date();
var isItNight = true;
if(hours.getHours() > 5 && hours.getHours() < 18) isItNight = false;
//CHANGE DEGREES
function changeDeg(){
    if(o.curDeg === "C"){
    o.curDeg = "F";
    $("#temp-val").html(o.temp_f+o.degSign+o.curDeg);
    } else{
    o.curDeg = "C";
    $("#temp-val").html(o.temp_c+o.degSign+o.curDeg);
  }
}
//GETTING GEO-DATA
var lat = 0;var lon = 0;
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) { 
    o.lat = (position.coords.latitude).toFixed(4);
    o.lon = (position.coords.longitude).toFixed(4);
//SHOWING WEATHER-DATA
$(document).ready(function(){
  var url = "https://api.apixu.com/v1/current.json?key=3604405b0e284719b9094215170507&q="+o.lat+","+o.lon;
    //$.ajax
    $.ajax({type:"GET", url: url, async: false, dataType:"json",
         success: function(data){
            console.log(data);
        //TEMPERATURE
        o.temp_c = data.current.temp_c;
        o.temp_f = data.current.temp_f;
        $("#temp-val").prepend(o.temp_c+o.degSign+o.curDeg);
        //LOCATION
        $("#loc").append(data.location.name+", "+data.location.country);
        //SKY COVERAGE
        var cloudiness = data.current.cloud;
        var feature = "";
        if(cloudiness < 3) {
          feature = "Clear";
          if(isItNight){
            document.body.style.background = "url()";
          }else {
            document.body.style.background = "url(http://ufobua.org.ua/foto/krym2008.jpg)";
          }
        }
        else if(cloudiness >= 3 && cloudiness < 26){
          feature = "Partly Cloudy";
          if(isItNight){
            document.body.style.background = "url(https://img3.goodfon.ru/original/2500x1600/1/d1/peyzazh-zvezdy-nebo-luna-mesyac.jpg)";
          }
        }
        else if(cloudiness >= 26 && cloudiness < 50){
          feature = "Mostly Cloudy";
          if(isItNight){
            document.body.style.background = "url(https://oboitut.com/uploads/posts/oboitut.com_8842.jpg)";
          }else {
            document.body.style.background = "url(http://horizonsmagazine.com/blog/wp-content/uploads/2016/03/Sky-Wallpaper-big.jpg)";
          }
        }
        else{
          feature = "Cloudy";
          /*if(data.current.humidity > 65) {
            feature = "Precipitation";
            document.body.style.background = "url(http://news-vlad.ru/uploads/posts/2015-10/1445228692_dozhd.jpg)";
          }*/
          if(isItNight){
            document.body.style.background = "url(https://get.pxhere.com/photo/horizon-cloud-sky-sunrise-sunset-dawn-atmosphere-dusk-evening-cumulus-red-orange-sky-clouds-afterglow-meteorological-phenomenon-blazing-sky-orange-red-sky-red-sky-at-morning-685639.jpg)";
          }else {
            document.body.style.background = "url(http://www.zastavki.com/pictures/originals/2014/Nature___Other_Sad_gray_sky_060803_.jpg)";
          }         
        }
        document.body.style.backgroundSize = "100% 100%";
        $("#sky").append(feature);
        //HUMIDITY
        $("#humidity").append("Humidity: " + data.current.humidity + "%");
        //WIND
        $("#wind").append(data.current.wind_dir+" "+data.current.wind_kph+" km/hour");
         },
         error: function(errorMessage){
            console.log("error");
         }
    })  
});
    
      });
}