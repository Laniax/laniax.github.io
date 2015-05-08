function WorldMap()
{
	var observatory_point = {x: 0, y: 0};
	
	function leading_zeroes(val, min_size)
	{
		val = val + '';
		while(val.length < min_size) val = '0'+val;
		return val;
	}

	this.setObservatoryPoint = function(coords)
	{
		observatory_point = coords;
	}
	
	/* calculate x y on the map to coordinates */
	this.pointToCoords = function(x, y)
	{
		// pixels from observatory
		var oTop = observatory_point.y - y
		var oLeft = x - observatory_point.x;
		
		return {latitude: (oTop / 64).toFixed(2), longitude: (oLeft / 64).toFixed(2)}
	}

	this.formatCoords = function(latitude, longitude)
	{
		var lat_dir = 'north';
		var lng_dir = 'east';
		
		if(latitude < 0)
		{
			latitude = Math.abs(latitude);
			lat_dir = 'south';
		}
		
		if(longitude < 0)
		{
			longitude = Math.abs(longitude);
			lng_dir = 'west';
		}
		
		var lat_deg = Math.floor(latitude);
		var lat_min = Math.floor(latitude % 1 * 60);
		
		var lng_deg = Math.floor(longitude);
		var lng_min = Math.floor(longitude % 1 * 60);
		
		/* add leading zeroes */
		lat_deg = leading_zeroes(lat_deg, 2);
		lat_min = leading_zeroes(lat_min, 2);
		
		lng_deg = leading_zeroes(lng_deg, 2);
		lng_min = leading_zeroes(lng_min, 2);
		
		return lat_deg + " degrees, " + lat_min + " minutes " + lat_dir + "<br>" + lng_deg + " degrees, " + lng_min + " minutes " + lng_dir;
	}

	/* -12.22, 4.48 ---> 748, 229 */
	this.coordsToPoint = function(latitude, longitude)
	{	
		var lat = parseFloat(latitude);
		var lng = parseFloat(longitude);
		
		var y = Math.floor(lat) * 64 + ( (lat % 1) * 64);
		var x = Math.floor(lng) * 64 + ( (lng % 1) * 64);
		
		x = Math.ceil(observatory_point.x + x);
		y = Math.ceil(observatory_point.y - y);

		return {x: x, y: y};
	}
	
	this.textToCoords = function(text)
	{
		/* 05 54 north, 05 44 east */
		var coords_pattern = /(\d+) (\d+) (north|south) (\d+) (\d+) (east|west)/ig

		/* convert that string to {latitude, longitude} */
		if(match = coords_pattern.exec(text))
		{
			var lat = parseInt(match[1]) + parseFloat(match[2]/60);
			if(match[3] == 'south') lat *= -1;
			
			var lng = parseInt(match[4]) + parseFloat(match[5]/60);
			if(match[6] == 'west') lng *= -1;
			
			return {
				latitude: lat.toFixed(2),
				longitude: lng.toFixed(2)
			}
		}

		return false;
	}
};