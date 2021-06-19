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

let sectionObj1 = {
    type: "section",
    sectionHeight: 1,  // m
    sectionLength: 6,  // m
    sectionThickness : 1.5, // m
    brickType : standardBrick
}

let sectionObj2 = {
    type : "pillar",
    sectionHeight: 2,  // m
    base: 5,  // number of bricks
    brickType : standardBrick
}
let sectionObj3 = {
    type : "pillar",
    sectionHeight: 1,  // m
    base: 4,  // number of bricks
    brickType : standardBrick
}
let sectionObj4 = {
    type : "pillar",
    sectionHeight: 1,  // m
    base: 8,  // number of bricks
    brickType : standardBrick
}
let sectionObj5 = {
    type : "pillar",
    sectionHeight: 1,  // m
    base: 3,  // number of bricks
    brickType : standardBrick
}
let sectionObj6 = {
    type: "section",
    sectionHeight: 1,  // m
    sectionLength: 10,  // m
    sectionThickness : 1.5, // m
    brickType : standardBrick
}

let allSectionsAndPillars = [sectionObj1, sectionObj2, sectionObj3, sectionObj4, sectionObj5, sectionObj6]; // container for all the sections and pillars
let allMaterials = []; // array contains each material object for each section and pillar




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
    // console.log("full brick layers: ", fullBrickLayers);

    const halfBrickLayers = wThickness % 1;        // remainder expected to be 0.5 or 0
    // console.log("half brick layers: ", halfBrickLayers);

    let totalBricksRequiredSection = numberOfBricksLayer(wHeight, wLength, true, bType) * fullBrickLayers;

    if (halfBrickLayers === 0.5) {
        totalBricksRequiredSection += numberOfBricksLayer(wHeight, wLength, false, bType);
    }
    return Math.ceil(totalBricksRequiredSection);
}



// calculate bricks required in a given directions

function bricksRequiredInOneDirection(wDimension, bDimension, addMortar){
    if (addMortar){
        return Math.ceil(wDimension / mmToM(bDimension + mortarThickness));
    }
    return Math.ceil(wDimension / mmToM(bDimension))
}

// amount of bricks in a pillar when base in bricks is know

function bricksRequiredPillar(baseAmount, pHeight, bHeight){
    return baseAmount * bricksRequiredInOneDirection(pHeight, bHeight, true);
}

function mortarBagsRequired(bricksReq) {
    return Math.ceil(bricksReq / 25);
}

function materialsRequiredSection(wHeight, wLength, wThickness, bType){
    let bReq = bricksRequiredSection(wHeight, wLength, wThickness, bType);
    let mortarReq = mortarBagsRequired(bReq);

    return {bricks : bReq, mortar : mortarReq};
}

function materialsRequiredPillar(base, pHeight, bHeight){
    let bReq = bricksRequiredPillar(base, pHeight, bHeight);
    let mortarReq = mortarBagsRequired(bReq);

    return {bricks : bReq, mortar : mortarReq};
}

function createArrayOfMaterials() {
    allMaterials = [];
    for (let i in allSectionsAndPillars){
        let secOrPillar = allSectionsAndPillars[i];
        let brick = secOrPillar.type;
        // console.log(secOrPillar);
        let tmpMatsReq = {};
        if (secOrPillar.type === "section"){
            // console.log(secOrPillar.brickType, "brick type")
            tmpMatsReq = materialsRequiredSection(secOrPillar.sectionHeight, secOrPillar.sectionLength, secOrPillar.sectionThickness, secOrPillar.brickType)
        } else {
            // console.log(allSectionsAndPillars[i].brickType, "pil")
            tmpMatsReq = materialsRequiredPillar(secOrPillar.base, secOrPillar.sectionHeight, secOrPillar.brickType.bHeight)
        }
        allMaterials.push(tmpMatsReq);
    }
    return allMaterials;
}

function calcMatsRequired() {
    let materialsArr = createArrayOfMaterials();
    let totalBricks = 0;
    let totalMortar = 0
    for (let i in materialsArr){
        totalBricks += materialsArr[i].bricks;
        totalMortar += materialsArr[i].mortar;
    }
    return {bricks : totalBricks, mortar : totalMortar}
}

console.log("All materials required: ", createArrayOfMaterials());
console.log("All materials required: ", calcMatsRequired() );
// console.log("Numbers of bricks in section imp brick:", materialsRequiredSection(1.6, 1, 1, imperialBrick));
// console.log("Numbers of bricks in section std brick:", materialsRequiredSection(1.6, 1, 1, standardBrick));
// console.log("Numbers of bricks in section std block:", materialsRequiredSection(1.6, 1, 1, standardBlock));
//
