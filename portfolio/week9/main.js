var result = document.getElementById("result"); 
		function getlocation(){ 
				navigator.geolocation.getCurrentPosition(showLoc); 
		} 
		function showLoc(pos){ 
				result.innerHTML = "Latitude: " + pos.coords.latitude + 
				"<br>Longitude: " + pos.coords.longitude; 
			} 