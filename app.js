function getweather(){
	const city = document.getElementById("city").value;
	const country = document.getElementById("country").value;
	getJSON("https://api.opencagedata.com/geocode/v1/json?q="+city+","+country+"&key=92336b4a96b880dd16a1ca533bb5538a&pretty=1", function(err, data) {
		console.log(data);
		  if (err != null) {
			alert('Something went wrong: ' + err);
		  } else {
					if(data.results[0]){
						const lat=data.results[0].geometry.lat;
						const lng=data.results[0].geometry.lng;
						const wthrOne=["haze", "drizzle", "rain", "dust", "sunlight", "sunny", "light", "foggy", "cold"];
						const wthrTwo=["broken clouds", "few clouds", "clear sky"];
						getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + data.results[0].geometry.lat + "&lon=" + data.results[0].geometry.lng + "&APPID=2b63bf4458c6a86ff08dde55328e693e&units=metric", function(err, data) {
							console.log(data);
							const rawJson = JSON.stringify(data);
							const json = JSON.parse(rawJson);
							console.log(rawJson);
							console.log(json);
							let weather=json.weather[0].description;
							let iconName="sunlight";
							if(wthrOne.includes(weather)){
								iconName=weather;
							}else if(wthrTwo.includes(weather)){
								iconName=weather.replace(/\s/g, "");
							}
							let html = "Weather: "+json.weather[0].description+"<br>Temperature: "+json.main.temp+" &#8451;<br>Humidity: "+json.main.humidity+"<br>Wind Speed: "+json.wind.speed +"<br>Latitude: "+lat +"<br>Longitude: " +lng +"<br><br><img src=icons/"+iconName+".png />";
							document.getElementById("display").innerHTML = html;
							
						});
						getJSON("http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lng + "&APPID=2b63bf4458c6a86ff08dde55328e693e&units=metric", function (err, data) {
							console.log(data);
							const wthrJson = JSON.stringify(data);
							const whtrjson = JSON.parse(wthrJson);
							let tableHtml="<h2>Weather Forecast for next 5 Days </h2><hr></br><table><tr><th>Date & Time</th><th>Weather</th><th>Temperature</th></tr>";
							for(i=0;i< whtrjson.list.length;){
								tableHtml=tableHtml + "<tr><td>"+whtrjson.list[i].dt_txt+"</td><td>"+whtrjson.list[i].weather[0].description+"</td><td>"+whtrjson.list[i].main.temp+" &#8451;</td></tr>";
								i=i+2;
							}
							tableHtml=tableHtml+"</table>";
							document.getElementById("forecast").innerHTML = tableHtml;
						});
						
					}else{
						document.getElementById("display").innerHTML = "Invalid Location !!";
					}
			
		  }
		});
}
var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('get', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status == 200) {
        callback(null, xhr.response);
      } else {
        callback(status);
      }
    };
    xhr.send();
};

