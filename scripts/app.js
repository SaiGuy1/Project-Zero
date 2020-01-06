// ***************************** Core Modules *****************************************************************
// ***************************** 3rd Party Libraries **********************************************************
// ***************************** Sanity Check *****************************************************************
// ***************************** Constants & Variables ********************************************************
let score = 0
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
                damage: 30,
                accuracy: .3,
            },
            {
                attack: "Microphone Smack",
                damage: 10,
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
                attack: "Backstreet Smack!",
                damage: 90,
                accuracy: .1,
            },
            {
                attack: "Rock your body right hook",
                damage: 30,
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
                damage: 90,
                accuracy: .2,
            },
            {
                attack: "Slap in the face",
                damage: 30,
                accuracy: .5,
            },
            {
                attack: "Cure Wounds",
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
                attack: "Chance to blow",
                damage: 90,
                accuracy: .1,
            },
            {
                attack: "Shady Liver Chop",
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
        quote: `"It feels so empty without me!"`
    }
];
// ***************************** Functions ********************************************************************
// Removes Instructions, transitions into character selection.
function gameStart(){
    $('#instructions').remove();
    $('#display').append(`
    <div id="mode-select" class="bg-dark text-light p-5">
                <form action="#">
                    <p>Please select a game mode:</p>
                    <input type="radio" name="mode" value="mode1"> Select user fighter and randomize CPU opponent.<br>
                    <input type="radio" name="mode" value="mode2"> Select CPU opponent and randomize user fighter<br>
                    <input id="game-mode-selected" type="submit" value="Submit">
                </form>
            </div>
    `);
}

//Loops through our fighters array (of objects) to create a character selection board.
function createFighters(){
    $('#mode-select').remove();
    fighters.forEach((fighter) => {
        $('#display').append(`
        <div id="${fighter.id}" class="container">
            <div class="card-deck mb-3 text-center">
                <div class="card mb-4 shadow-sm">
                    <div class="card-header">
                        <h1 class="my-0 font-weight-normal">${fighter.name}</h1>
                    </div>
                    <div class="card-body d-flex flex-column justify-content-center ">
                        <img src=${fighter.image} class="w-25 align-self-center" alt="${fighter.name}">
                        <ul class="list-unstyled mt-3 mb-4">
                            <li>Fav quote:<br><b>${fighter.quote}</b></li>
                            <li>HP = ${fighter.hp}</li>
                            <li>Attacks</li>
                            <li>Weakness is ${fighter.weakness}</li>
                        </ul>
                    </div>
                    <button type="button" class="btn btn-dark btn-block btn-outline-red">Select</button>
                </div>
            </div>
        </div>
        `);
    });

}

// ***************************** Event Listeners **************************************************************
$('#game-start').on('click', gameStart);
$('#display').on('click', '#game-mode-selected', createFighters);

