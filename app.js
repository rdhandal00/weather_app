function getweather(){
	var city = $('#city').val();
	var country = $('#country').val();
	$.getJSON("https://api.opencagedata.com/geocode/v1/json?q="+city+","+country+"&key=92336b4a96b880dd16a1ca533bb5538a&pretty=1", function(data){
		console.log(data.results[0]);
		if(data.results[0]){
			var lat=data.results[0].geometry.lat;
			var lng=data.results[0].geometry.lng;
			var wthrOne=["haze", "drizzle", "rain", "dust", "sunlight", "sunny", "light", "foggy", "cold"];
			var wthrTwo=["broken clouds", "few clouds", "clear sky"];
			$.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + data.results[0].geometry.lat + "&lon=" + data.results[0].geometry.lng + "&APPID=2b63bf4458c6a86ff08dde55328e693e&units=metric", function (data) {
				console.log(data);
				var rawJson = JSON.stringify(data);
				var json = JSON.parse(rawJson);
				console.log(rawJson);
				console.log(json);
				var weather=json.weather[0].description;
				var iconName="sunlight";
				if(wthrOne.includes(weather)){
					iconName=weather;
				}else if(wthrTwo.includes(weather)){
					iconName=weather.replace(/\s/g, "");
				}
				var html = "Weather: "+json.weather[0].description+"<br>Temperature: "+json.main.temp+" &#8451;<br>Humidity: "+json.main.humidity+"<br>Wind Speed: "+json.wind.speed +"<br>Latitude: "+lat +"<br>Longitude: " +lng +"<br><br><img src=icons/"+iconName+".png />";
				$('#display').html(html);
				
			});
			/* code for weather forecast */
			$.getJSON("http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lng + "&APPID=2b63bf4458c6a86ff08dde55328e693e&units=metric", function (data) {
				console.log(data);
				var rawJson = JSON.stringify(data);
				var json = JSON.parse(rawJson);
				console.log(rawJson);
				console.log(json);
				var tableHtml="<h2>Weather Forecast for next 5 Days </h2><hr></br><table><tr><th>Date & Time</th><th>Weather</th><th>Temperature</th></tr>";
				$.each( json.list, function( i, element ) {
					if(i%2==1){
						return;
					}
				  tableHtml=tableHtml + "<tr><td>"+element.dt_txt+"</td><td>"+element.weather[0].description+"</td><td>"+element.main.temp+" &#8451;</td></tr>";
				  });
				tableHtml=tableHtml+"</table>";
				$('#forecast').html(tableHtml);
			});
		}else{
			$('#display').html("Invalid Location !!");
		}
	});
	
}