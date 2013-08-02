var x1;
var x2;
var y1;
var y2;
var z1;
var z2;
var CubeBlock;
var Mode = 0;


function createWalls (x1,y1,z1,x2,y2,z2,CubeBlock)
{
  var lowestX;
	var lowestY;
	var lowestZ;
	var highestX;
	var highestY;
	var highestZ;

	if(x1 < x2) {
	lowestX = x1;
	highestX = x2;}
	
	else{
	lowestX = x2;
	highestX = x1;
	}

	if(y1 < y2) {
	lowestY = y1;
	highestY = y2;}
	
	else{
	lowestY = y2;
	highestY = y1;
	}

	if(z1 < z2) {
	lowestZ = z1;
	highestZ = z2;}
	
	else{
	lowestZ = z2;
	highestZ = z1;
	}
	
	setTile(x1,y1,z1,CubeBlock);

	
	for(var loopX = lowestX; loopX <= highestX; loopX ++)
	{

		for(var loopY = lowestY; loopY <= highestY; loopY++)
			{
				for(var loopZ = lowestZ; loopZ <= highestZ; loopZ++)
				{
				setTile (loopX, loopY, loopZ, CubeBlock);
				}	
			}
	}

}


function useItem(x,y,z,itemId,blockId)
{
        if(itemId == 267) //If the item you use is a Golden Hoe
        { //wrote them backwards because reasons:
			
			if(Mode == 0)
			{
				x1 = x;
				y1 = y;
				z1 = z;
				setTile (x, y, z, 42);
				Mode = 1; // Time for second one!
			}

			else if(Mode == 1)
			{
				x2 = x;
				y2 = y;
				z2 = z;
				setTile (x, y, z, 42);
				Mode = 2; // Time for block selection!
			}
			
			else if(Mode == 2)
			{
				CubeBlock = blockId;
				
				createWalls(x1,y1,z1,x2,y2,z2,CubeBlock);
				Mode = 3;
			}
			
			if(Mode == 3) {Mode = 0;}
			preventDefault();
        }
        
}

