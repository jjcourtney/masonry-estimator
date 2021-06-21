const addSectionsBtn = document.getElementById("add-section");
const updateBtn = document.getElementById("update");
const sendToQuoteBtn = document.getElementById("send-to-quote");
let someSection1 = document.getElementById( `section-selector1`);
someSection1.addEventListener('change', updateSection);
// const changeDefaultsBtn = document.getElementById("change-defaults");

let sectionsAdded = 0;



function addSection() {
    let sectionIdNumber = sectionsAdded + 1
    let sectionToAddAfter = document.getElementById(`section${sectionIdNumber}`);
    sectionToAddAfter.insertAdjacentHTML("afterend", addSectionText());
}

async function addListenerToSection(){
    await addSection();
    let someSection = document.getElementById( `section-selector${sectionsAdded + 1}`);
    someSection.addEventListener('change', updateSection);
}
function addSectionText(){
    let i = sectionsAdded + 2
    let htmlToAdd = `<div class="section" id="section${i}">
                <div class="selector">
                    <label for="section-selector${i}">Section type</label>
                    <select id="section-selector${i}" class="section-selector">
                        <option value="pillar" >Pillar</option>
                        <option value="wall">Wall</option>
                    </select>
                </div>
                <div class="section-properties" id="section-properties${i}">
                    <div>
                        <label for="brick-type${i}">Brick type</label><br>
                        <select id="brick-type${i}" class="brick-type">
                            <option value="standard-brick">Standard Brick</option>
                            <option value="imperial-brick">Imperial Brick</option>
                            <option value="standard-block">Standard Block</option>
                        </select>
                    </div>
                    <div>
                        <label for="height${i}">Height</label><br>
                        <input type="number" id="height${i}" class="height" max="$10000" min="0">
                    </div>
                    <div>
                        <label for="length${i}">Length</label><br>
                        <input type="number" id="length${i}" class="length" max="10000" min="0">
                    </div>
                    <div>
                        <label for="thickness${i}">Thickness</label><br>
                        <input type="number" id="thickness${i}" class="thickness" max="10000" min="0">
                    </div>
                    <div>
                        <label for="cost${i}">Cost per brick</label><br>
                        <input type="number" id="cost${i}" class="cost" max="10000" min="0">
                    </div>
                </div>
            </div>`


    sectionsAdded++
    return htmlToAdd;
}

function updateMats(){
    allSectionsAndPillars = []
    //console.log("selector length", document.getElementsByClassName("section-selector").length)
    //console.log("selector length", document.getElementsByClassName("section-selector")[2])
    for (let i = 0; i < document.getElementsByClassName("section").length; i++){
        //common attributes for wall and pillar
        let sectionType = document.getElementsByClassName(`section-selector`)[i].value;
        console.log(sectionType);
        let brickType = document.getElementsByClassName(`brick-type`)[i].value;
        console.log(brickType);
        let wallHeight = document.getElementsByClassName(`height`)[i].value;
        console.log(wallHeight);
        let brickCost = document.getElementsByClassName(`cost`)[i].value;
        console.log(brickCost);
        if (brickType === "standard-brick"){
            brickType = standardBrick;
        }else if (brickType === "imperial-brick"){
            brickType = imperialBrick;
        }else{
            brickType = standardBlock;
        }
        //if(sectionType === "wall") {
            let wallThickness= document.getElementsByClassName(`thickness`)[i].value;
            console.log(wallThickness);
            let wallLength = document.getElementsByClassName(`length`)[i].value;
            console.log(wallLength);
            allSectionsAndPillars.push( {
                type: "section",
                sectionHeight: wallHeight,
                sectionLength: wallLength,
                sectionThickness: wallThickness,
                brickType: brickType})
        // }else{
        //let baseSize = document.getElementsByClassName(`base-size`)[i].value;
        console.log(wallThickness);
        // }
    }
    // console.log("calc from inputs", calcMatsRequired());
}

function testCalc(){
    let text = calcMatsRequired();
    let bricks = text.bricks;
    let mortar = text.mortar;
    let outputString = `You require ${bricks} bricks and ${mortar} bags of mortar.`
    document.getElementById("output-text").innerHTML = outputString;
}




function testObj(){
    return;
}
addSectionsBtn.addEventListener("click", addListenerToSection);
updateBtn.addEventListener("click", updateMats);
sendToQuoteBtn.addEventListener("click", testCalc);
// changeDefaultsBtn.addEventListener("click", testObj);


// function to change input types on HTML depending on pillar or wall
function updateSection(event){
    let selectorID = event.target.id.split("section-selector");
    let i = selectorID[1];

    if (event.target.value == "wall"){
        updateSectionToWall(i);
    }else{
        updateSectionToPillar(i);
    }
}

/*
calling function should first selectorID = event.target.id.split("section-selector");
let i = selectorID[1];
*/
function updateSectionToWall(i){

    let htmlToChange = `<div>
                        <label for="brick-type${i}">Brick type</label><br>
                        <select id="brick-type${i}" class="brick-type">
                            <option value="standard-brick">Standard Brick</option>
                            <option value="imperial-brick">Imperial Brick</option>
                            <option value="standard-block">Standard Block</option>
                        </select>
                    </div>
                    <div>
                        <label for="height${i}">Height</label><br>
                        <input type="number" id="height${i}" class="height" max="$10000" min="0">
                    </div>
                    <div>
                        <label for="length${i}">Length</label><br>
                        <input type="number" id="length${i}" class="length" max="10000" min="0">
                    </div>
                    <div>
                        <label for="thickness${i}">Thickness</label><br>
                        <input type="number" id="thickness${i}" class="thickness" max="10000" min="0">
                    </div>
                    <div>
                        <label for="cost${i}">Cost per brick</label><br>
                        <input type="number" id="cost${i}" class="cost" max="10000" min="0">
                    </div>`;


    let divToChange =document.getElementById(`section-properties${i}`);
    divToChange.innerHTML = htmlToChange;
}
function updateSectionToPillar(i){

    let htmlToChange = `<div>
                        <label for="brick-type${i}">Brick type</label><br>
                        <select id="brick-type${i}" class="brick-type">
                            <option value="standard-brick">Standard Brick</option>
                            <option value="imperial-brick">Imperial Brick</option>
                            <option value="standard-block">Standard Block</option>
                        </select>
                    </div>
                    <div>
                        <label for="height${i}">Height (m)</label><br>
                        <input type="number" id="height${i}" class="height" max="10000" min="0">
                    </div>
                    <div>
                        <label for="length${i}">Base (Bricks)</label><br>
                        <input type="number" id="length${i}" class="length" max="10000" min="0">
                    </div>
                    <div>
                        <label for="cost${i}">Cost per brick (£)</label><br>
                        <input type="number" id="cost${i}" class="cost" max="10000" min="0">
                    </div>`;


    let divToChange =document.getElementById(`section-properties${i}`);
    divToChange.innerHTML = htmlToChange;
}