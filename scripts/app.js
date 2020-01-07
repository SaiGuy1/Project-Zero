// ***************************** Core Modules *****************************************************************
// ***************************** 3rd Party Libraries **********************************************************
// ***************************** Sanity Check *****************************************************************
// ***************************** Constants & Variables ********************************************************
const score = 0
const $display = $('#display')
const $instructions = $('#instructions')
// ***************************** App State ********************************************************************
let fighters = [
    {
        id: "fredCard",
        name: "Fred",
        hp: 110,
        attacks: [
            {
                attack: "Chainsaw",
                damage: 100,
                accuracy: .05,
            },
            {
                attack: "Sucker Punch",
                damage: 40,
                accuracy: .3,
            },
            {
                attack: "Mic. Smack",
                damage: 15,
                accuracy: .9,
            }
        ],
        weakness: "Boy Bands",
        image: "images/fred_durst.png",
        quote: `"If only we could fly!"`
    },
    {
        id: "nickCard",
        name: "Nick",
        hp: 100,
        attacks: [
            {
                attack: "Bckstrt Smack!",
                damage: 70,
                accuracy: .25,
            },
            {
                attack: "Rock yo' body",
                damage: 20,
                accuracy: .5,
            },
            {
                attack: "Delicate punch",
                damage: 10,
                accuracy: 1,
            }
        ],
        weakness: "Queen of Pop",
        image: "images/nick.png",
        quote: `"Backstreet's back!"`
    },
    {
        id: "britneyCard",
        name: "Britney",
        hp: 85,
        attacks: [
            {
                attack: "Toxic",
                damage: 80,
                accuracy: .2,
            },
            {
                attack: "Slap in the face",
                damage: 30,
                accuracy: .5,
            },
            {
                attack: "Heal",
                damage: 20,
                accuracy: 1,
            }
        ],
        weakness: "Satirical Rap",
        image: "images/britney.png",
        quote: `"Oops! I did it again!"`
    },
    {
        id: "eminemCard",
        name: "Eminem",
        hp: 90,
        attacks: [
            {
                attack: "Political Outrage",
                damage: 90,
                accuracy: .1,
            },
            {
                attack: "Shady Chop",
                damage: 30,
                accuracy: .5,
            },
            {
                attack: "Sweaty Palms",
                damage: 10,
                accuracy: 1,
            }
        ],
        weakness: "Wanna-be Rappers",
        image: "images/eminem.png",
        quote: `"I'm the real Shady!"`
    }
];
// ***************************** Functions ********************************************************************
// Removes Instructions, transitions into character selection.
function gameStart(){
    $instructions.remove();
    $display.append(`
    <div id="mode-select" class="bg-dark text-light p-5">
                <form action="#">
                    <p>Please select a game mode:</p>
                    <input type="radio" name="mode" value="mode1"> Select user fighter and randomize CPU opponent.<br>
                    <input type="radio" name="mode" value="mode2"> Select CPU opponent and randomize user fighter<br>
                    <input id="game-mode-selected" type="submit" value="Submit" class="m-2">
                </form>
            </div>
    `);
}

//Loops through our fighters array (of objects) to create a character selection board.
function createFighters(){
    $('#mode-select').remove();
    $display.append(`
    <div class="card-deck text-center w-75" id="character-selector"></div>
    `);
    fighters.forEach((fighter) => {
        $('#character-selector').append(`
        <div id="${fighter.id}" class="card shadow-sm fighter-card">
            <div class="card-header">
                <h1 class="my-0 font-weight-normal h1_fonts">${fighter.name}</h1>
            </div>
            <div class="card-body d-flex flex-column justify-content-center ">
                <img src=${fighter.image} class="w-25 align-self-center rounded" alt="${fighter.name}">
                <ul class="list-unstyled">
                    <li "font-size: 10px;"><b>${fighter.quote}</b></li>
                    <li class="bg-success progress-bar-striped progress-bar-animated text-white text-md">HP = ${fighter.hp}</li>
                    <table class="w-100 table-condensed table-dark">
                        <tr>
                            <th>Move</th>
                            <th>Power</th>
                            <th>Accuracy</th>
                        </tr>
                        <tr>
                            <td>${fighter.attacks[0].attack}</td>
                            <td>${fighter.attacks[0].damage}</td>
                            <td>${fighter.attacks[0].accuracy*100}%</td>
                        </tr>
                        <tr>
                            <td>${fighter.attacks[1].attack}</td>
                            <td>${fighter.attacks[1].damage}</td>
                            <td>${fighter.attacks[1].accuracy*100}%</td>
                        </tr>
                        <tr>
                            <td>${fighter.attacks[2].attack}</td>
                            <td>${fighter.attacks[2].damage}</td>
                            <td>${fighter.attacks[2].accuracy*100}%</td>
                        </tr>
                    </table>
                    <li class="text-danger" style="font-size: 10px;">**Weakness is ${fighter.weakness}</li>
                </ul>
            </div>
            <button type="button" class="btn btn-dark btn-block btn-outline-red character-selected">Select</button>
        </div>
        `);
    });
}

function battleStart (event) {
    $display.append(`
    `)
    let $fightingRing = $('#fighting-ring');
    $fightingRing.append($(event.target).parent().parent());
}

// ***************************** Event Listeners **************************************************************
$('#game-start').on('click', gameStart);
$display.on('click', '#game-mode-selected', createFighters);
$display.on('click', '.character-selected', battleStart);

