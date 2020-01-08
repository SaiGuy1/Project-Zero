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
        chosen: false,
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
        chosen: false,
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
        chosen:false,
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
        chosen: false,
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
            <div class="card-body p-1 d-flex flex-column justify-content-center">
                <img src=${fighter.image} class="w-25 align-self-center rounded-circle" alt="${fighter.name}">
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

//This function listens to who the user selected to create the battle-ring and switch the character card to the fighting card, which has less information but more functionality.
function battleStart (event) {
    let leftOvers = [];
    $display.append(`
    <div id="battle-scene" class="d-flex flex-column justify-content-center align-items-center h-100 w-75">
        <div class="d-flex flex-row justify-content-center align-items-center h-25 w-75">
            <img src='images/commentators.png' id="referee">
        </div>
        <div id="fight-ring" class="card-deck d-flex flex-row justify-content-around h-75 w-75">
        </div>
    </div>
    `)
    //console.log($(event.target).parent().attr('id'));
    fighters.forEach(fighter => {
        if(fighter.id===$(event.target).parent().attr('id')){
            $('#fight-ring').append(`
            <div id="fighter-a" class="card shadow-sm ring-card m-0">
                <div class="card-header d-flex justify-content-center align-items-center">
                    <h1 class="h1_fonts">${fighter.name}</h1>
                </div>
                <div class="card-body p-1 d-flex flex-column justify-content-center ">
                    <img src=${fighter.image} class="w-25 align-self-center rounded-circle" alt="${fighter.name}">
                    <div class="progress">
                        <div id="a-hp" class="bg-success progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="width: 100%" aria-valuenow="${fighter.hp}" aria-valuemin="0" aria-valuemax="${fighter.hp}">${fighter.hp}HP</div>
                    </div>
                </div>
                <div id="${fighter.name}-attacks">
                </div>
            </div>
            `);
            fighter.attacks.forEach(attack => {
                $(`#${fighter.name}-attacks`).append(`
                <button type="button" class="btn-dark btn-block btn-outline-red attack-button p-1 m-1" pow="${attack.damage}" acc="${attack.accuracy}">ATK: ${attack.attack}<br>POW: ${attack.damage} ACC: ${attack.accuracy*100}%</button>
                `);
            });
        } else {
            leftOvers.push(fighter)
        }
    });
    //console.log(leftOvers[Math.floor(Math.random()*leftOvers.length)]);
    let randomFighter = leftOvers[Math.floor(Math.random()*leftOvers.length)];
    //console.log(randomFighter);
    {$('#fight-ring').append(`
            <div id="fighter-b" class="card shadow-sm ring-card m-0">
                <div class="card-header d-flex justify-content-center align-items-center">
                    <h1 class="h1_fonts">${randomFighter.name}</h1>
                </div>
                <div class="card-body p-1 d-flex flex-column justify-content-center">
                    <img src=${randomFighter.image} class="w-25 align-self-center rounded-circle" alt="${randomFighter.name}">
                    <div class="progress">
                        <div id="b-hp" class="bg-success progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="width: 100%" aria-valuenow="${randomFighter.hp}" aria-valuemin="0" aria-valuemax="${randomFighter.hp}">${randomFighter.hp}HP</div>
                    </div>
                </div>
                <div id="${randomFighter.name}-attacks">
                </div>
            </div>
            `);}
            randomFighter.attacks.forEach(attack => {
                $(`#${randomFighter.name}-attacks`).append(`
                <button type="button" class="btn-dark btn-block btn-outline-red attack-button p-1 m-1" pow="${attack.damage}" acc="${attack.accuracy}">ATK: ${attack.attack}<br>POW: ${attack.damage} ACC: ${attack.accuracy*100}%</button>
                `);
            });
    $('#character-selector').remove();
}

//Listens to the clicked attack and "rolls the dice" to determine whether attack hit or missed, if hit, substract dealt damage from opposing player HP, if hit is performed by victim's weakness, multiply damage by 1.2.
function fightMechanic (event) {
    $(event.target).attr('animated', 'bounce')
    if($(event.target).attr('acc')>Math.random()){
        console.log(`You dealt ${$(event.target).attr('pow')} damage!`);
        $('#b-hp').attr('aria-valuenow', $('#b-hp').attr('aria-valuenow') - $(event.target).attr('pow'));
        $('#b-hp').attr('style', `width: ${($('#b-hp').attr('aria-valuenow')/$('#b-hp').attr('aria-valuemax'))*100}%`);
        $('#b-hp').text(`${$('#b-hp').attr('aria-valuenow')}HP`);
    } else {
        console.log('You missed!')
    }
}
// ***************************** Event Listeners **************************************************************
$('#game-start').on('click', gameStart);
$display.on('click', '#game-mode-selected', createFighters);
$display.on('click', '.character-selected', battleStart);
$display.on('click', '.attack-button', fightMechanic);

