function WorldMap()
{
	
	var TILE_SIZE = 4;
    var TILE_X_MODIFIER = 1984;
    var TILE_Y_MODIFIER = -1153;
	var MAP_HEIGHT = 5376;
	
	this.coordsToPoint = function(xcoord, ycoord) 
	{
		return {
		x: ((xcoord - TILE_X_MODIFIER) * TILE_SIZE), 
		y: ((MAP_HEIGHT - (ycoord - TILE_Y_MODIFIER)) * TILE_SIZE)};
	}
};