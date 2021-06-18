// wall thickness half brick / one brick

// brick pillars one brick / 1.5 brick

//surface area - height / length

// brick wastage 10%

// imperial bricks (potentially 225 x 110 x 73mm), ~ 57 per square metre.

// standard UK metric brick measures 215 x 102.5 x 65mm, with mortar joints of 10mm, vertically and horizontally.

//  For standard UK blocks (440 x 215 x 100mm), 10 blocks per square metre.
/* Across code:
    "b" prefix = brick / block
    "w" prefix = wall
    "p" prefix = pillar
*/

const wastage = 0.1; // 10% expected wastage
const mortarThickness = 10; //mm

const standardBrick = {
    bLength: 225, // mm
    bDepth: 100, // mm
    bHeight: 73, // mm
    mortarJoint : mortarThickness,
    cost: 0.2 // £
}

const imperialBrick = {
    bLength: 225, // mm
    bDepth: 110, // mm
    bHeight: 73, // mm
    mortarJoint : mortarThickness,
    cost: 0.3 // £200 - £400 per 1000 / Facing brick £1200 per 1000
}

const standardBlock = {
    bLength: 440, // mm
    bDepth: 215, // mm
    bHeight: 100, // mm
    mortarJoint : mortarThickness,
    cost: 0.2 // £
}

function numberOfBricksLayer(wHeight, wLength, widthWays, bType) {
    let bLength = bType.bLength;
    const bHeight = bType.bHeight;

    if (widthWays){ // If brick is width ways (whole brick thickness of the wall)
        bLength =  bType.bDepth; // changes orientation of the brick
    }
    // Calculate whole bricks required
    const totalBRequiredLength = bricksRequiredInOneDirection(wLength, bLength , true);
    //console.log("Total bricks required length:", totalBRequiredLength);
    const totalBRequiredHeight = bricksRequiredInOneDirection(wHeight, bHeight, true );
    //console.log("Total bricks required height:", totalBRequiredHeight);
    let totalBRequired = totalBRequiredLength * totalBRequiredHeight;
    totalBRequired += totalBRequired * wastage;

    return totalBRequired;
}

function mmToM(mm){
    return mm / 1000;
}

function mToMm(m){
    return m * 1000;
}
/*
// full brick is width ways thickness = 1 ||  half brick is length ways thickness = 0
  /``/|                                          _______
 /__/ /                                         /______/|
 |__|/                                          |______|/


*/
// Calculate the number of bricks for a flat section of wall

function bricksRequiredSection(wHeight, wLength, wThickness, bType){
    const fullBrickLayers = Math.floor(wThickness); // whole number of thickness
    console.log("full brick layers: ", fullBrickLayers);

    const halfBrickLayers = wThickness % 1;        // remainder expected to be 0.5 or 0
    console.log("half brick layers: ", halfBrickLayers);

    let totalBricksRequiredSection = numberOfBricksLayer(wHeight, wLength, true, bType) * fullBrickLayers;

    if (halfBrickLayers === 0.5) {
        totalBricksRequiredSection += numberOfBricksLayer(wHeight, wLength, false, bType);
    }
    return Math.ceil(totalBricksRequiredSection);
}

console.log("Numbers of bricks in section imp brick:", bricksRequiredSection(1.6, 1, 1, imperialBrick));
console.log("Numbers of bricks in section std brick:", bricksRequiredSection(1.6, 1, 1, standardBrick));
console.log("Numbers of bricks in section std block:", bricksRequiredSection(1.6, 1, 1, standardBlock));

// calculate bricks required in a given directions

function bricksRequiredInOneDirection(wDimension, bDimension, addMortar){
    if (addMortar){
        return Math.ceil(wDimension / mmToM(bDimension + mortarThickness));
    }
    return Math.ceil(wDimension / mmToM(bDimension))
}

// amount of bricks in a pillar when base in bricks is know

function bricksRequiredPillar(baseAmount, bHeight, pHeight){
    return baseAmount * bricksRequiredInOneDirection(bHeight, pHeight);
}

/* sample section object

sectionObj = {
    height: 1,  // m
    length: 6,  // m
    width = 1.5, // m
    brickType = standardBrick
}
 */

/* sample pillar object

sectionObj = {
    height: 1,  // m
    base: 6,  // number of bricks
    brickType = standardBrick
}
 */