const addSectionsBtn = document.getElementById("add-section");
const updateBtn = document.getElementById("update");
const sendToQuoteBtn = document.getElementById("send-to-quote");
const changeDefaultsBtn = document.getElementById("change-defaults");
const section1Div = document.getElementById("section1");
let sectionsAdded = 0;



function addSection() {
    let sectionIdNumber = sectionsAdded + 1
    let sectionToAddAfter = document.getElementById(`section${sectionIdNumber}`);
    sectionToAddAfter.insertAdjacentHTML("afterend", addSectionText())
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
                <div class="section-properties">
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


    // type: "section",
    //     sectionHeight: 1,  // m
    //     sectionLength: 6,  // m
    //     sectionThickness : 1.5, // m
    //     brickType : standardBrick

}

function testCalc(){
    console.log("calc from inputs ", calcMatsRequired());
}

function testObj(){
    console.log(sectionObj1);
}
addSectionsBtn.addEventListener("click", addSection);
updateBtn.addEventListener("click", updateMats);
sendToQuoteBtn.addEventListener("click", testCalc);
//sendToQuoteBtn.addEventListener("click", testObj);