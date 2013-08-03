//This code creates a wall of a certain block :)
//VERSION 0.2 adds UNDO function :D

var x1;
var x2;
var y1;
var y2;
var z1;
var z2;
var CubeBlock;
var Mode = 0;
var storedX;
var storedY;
var storedZ;
var storedMaterial;
var lowestX;
var lowestY;
var lowestZ;
var highestX;
var highestY;
var highestZ;

var storedX = new Array();
var storedY = new Array();
var storedZ = new Array();
var storedMaterial = new Array();

var storedIronBlock1x;
var storedIronBlock1y;
var storedIronBlock1z;
var storedIronBlock1material;
var storedIronBlock2x;
var storedIronBlock2y;
var storedIronBlock2z;
var storedIronBlock2material;

var checkIfStored = 0;


function createWalls (x1,y1,z1,x2,y2,z2,CubeBlock)
{

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
	
	var count = 0;

	for(var loopX = lowestX; loopX <= highestX; loopX ++)
	{

		for(var loopY = lowestY; loopY <= highestY; loopY++)
			{
				for(var loopZ = lowestZ; loopZ <= highestZ; loopZ++)
				{
					storedX[count] = loopX;
					storedY[count] = loopY;
					storedZ[count] = loopZ;
					storedMaterial[count] = getTile(loopX, loopY, loopZ);
					count ++;
				}	
			}
	}
	
	checkIfStored = 1;
	
	print(checkIfStored);

	for(var loopX = lowestX; loopX <= highestX; loopX ++)
	{

		for(var loopY = lowestY; loopY <= highestY; loopY++)
			{
			setTile (loopX, loopY, lowestZ, CubeBlock);
			setTile(loopX, loopY, highestZ, CubeBlock);
			
			}
	}


	for(var loopZ = lowestZ; loopZ <= highestZ; loopZ++)
	{
		for(var loopY = lowestY; loopY <= highestY; loopY++)
			{
			setTile (lowestX, loopY,loopZ,CubeBlock);
			setTile(highestX, loopY,loopZ, CubeBlock);
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
				storedIronBlock1x = x;
				storedIronBlock1y = y;
				storedIronBlock1z = z;
				storedIronBlock1material = blockId;
				setTile (x, y, z, 42);
				Mode = 1; // Time for second one!
			}

			else if(Mode == 1)
			{
				x2 = x;
				y2 = y;
				z2 = z;
				storedIronBlock2x = x;
				storedIronBlock2y = y;
				storedIronBlock2z = z;
				storedIronBlock2material = blockId;
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

	else if(itemId == 261)
	{
		preventDefault();

		if(checkIfStored == 1)
		{
			print("so far so good");
			var count = 0;
			for(var loopX = lowestX; loopX <= highestX; loopX ++)
			{

			for(var loopY = lowestY; loopY <= highestY; loopY++)
			{
				for(var loopZ = lowestZ; loopZ <= highestZ; loopZ++)
				{
					setTile(storedX[count], storedY[count], storedZ[count], storedMaterial[count]);
					count ++;
				}	
			}
			}
		
			//and now replace the iron blocks
			setTile(storedIronBlock1x, storedIronBlock1y, storedIronBlock1z, storedIronBlock1material);
			setTile(storedIronBlock2x, storedIronBlock2y, storedIronBlock2z, storedIronBlock2material);
		}
		else
		{
			print("Nothing to undo..");
		}
	}        
}
