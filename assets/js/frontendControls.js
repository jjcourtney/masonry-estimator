const addSectionsBtn = document.getElementById("add-section");
const updateBtn= document.getElementById("update");
const sendToQuoteBtn = document.getElementById("send-to-quote");
const changeDefaultsBtn = document.getElementById("change-defaults");
const section1Div = document.getElementById("section1");
const textToAdd = `            <div class="section" id="section1">
                <div class="selector">
                    <label for="section-selector">Section type</label>
                    <select id="section-selector">
                        <option value="pillar">Pillar</option>
                        <option value="wall">Wall</option>
                    </select>
                </div>
                <div class="section-properties">
                    <div>
                        <label for="brick-type">Brick type</label><br>
                        <select id="brick-type">
                            <option value="standard-brick">Standard Brick</option>
                            <option value="imperial-brick">Imperial Brick</option>
                            <option value="standard-block">Standard Block</option>
                        </select>
                    </div>
                    <div>
                        <label for="height1">Height</label><br>
                        <input type="number" id="height1" max="10000">
                    </div>
                    <div>
                        <label for="length1">Length</label><br>
                        <input type="number" id="length1" max="10000">
                    </div>
                    <div>
                        <label for="thickness1">Thickness</label><br>
                        <input type="number" id="thickness1" max="10000">
                    </div>
                    <div>
                        <label for="cost1">Cost per brick</label><br>
                        <input type="number" id="cost1" max="10000">
                    </div>
                </div>
            </div>`

function addSection(event) {
    section1Div.insertAdjacentHTML("afterend", textToAdd)
}

addSectionsBtn.addEventListener("click", addSection);