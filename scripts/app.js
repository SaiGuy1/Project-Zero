// ***************************** Core Modules *****************************************************************
// ***************************** 3rd Party Libraries **********************************************************
// ***************************** Sanity Check *****************************************************************
// ***************************** Constants & Variables ********************************************************
let playerScore = 0;
let cpuScore = 0;
const $display = $('#display');
const $instructions = $('#instructions');
let win = "";

// ******************** Sound FX **********************
const fightTheme = document.getElementById('fight-theme');
const selectionTheme = document.getElementById('selection-theme');
const charSelected = document.getElementById('char-selected');
const userHit = document.getElementById('user-hit');
const cpuHit = document.getElementById('cpu-hit');
const missHit = document.getElementById('miss-hit');
const missHit2 = document.getElementById('miss-hit2');
const endFx = document.getElementById('end-fx');
const youWin = document.getElementById('you-win');
const youLose = document.getElementById('you-lose');
const gameOverTheme = document.getElementById('game-over');
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
                damage: 50,
                accuracy: .3,
            },
            {
                attack: "Mic. Smack",
                damage: 35,
                accuracy: .8,
            }
        ],
        weakness: "Boy Bands",
        image: "images/fred_durst.png",
        quote: `"If only we could fly!"`,
        weak: "Nick"
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
                damage: 15,
                accuracy: 1,
            }
        ],
        weakness: "Queen of Pop",
        image: "images/nick.png",
        quote: `"Backstreet's back!"`,
        weak: "Britney"
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
                attack: "Nut Kick",
                damage: 40,
                accuracy: .5,
            },
            {
                attack: "Slap",
                damage: 20,
                accuracy: 1,
            }
        ],
        weakness: "Satirical Rap",
        image: "images/britney.png",
        quote: `"Oops! I did it again!"`,
        weak: "Eminem"
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
                attack: "Jab",
                damage: 10,
                accuracy: 1,
            }
        ],
        weakness: "Wanna-be Rappers",
        image: "images/eminem.png",
        quote: `"I'm the real Shady!"`,
        weak: "Fred"
    }
];
// ***************************** Functions ********************************************************************
// Removes Instructions, transitions into character selection.
/* function gameStart(){
    charSelected.play();
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
} */

//Loops through our fighters array (of objects) to create a character selection board.
function createFighters(){
    $instructions.remove();
    $('#loading-screen').remove();
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
    selectionTheme.play();
}

//This function listens to who the user selected to create the battle-ring and switch the character card to the fighting card, which has less information but more functionality.
function battleStart (event) {
    selectionTheme.pause();
    selectionTheme.currentTime = 0;
    let leftOvers = [];
    $display.append(`
    <div id="battle-scene" class="d-flex flex-column justify-content-center align-items-center h-100 w-75">
        <div class="d-flex flex-row justify-content-center align-items-center h-25 w-75">
            <div id="lspeech-bubble" class="float-left p-2">This will be a good fight!</div><img src='images/commentators.png' id="referee" class="rounded-pill"><div id="rspeech-bubble" class="float-right p-2">Let's get it on!</div>
        </div>
        <div id="fight-ring" class="card-deck d-flex flex-row justify-content-around h-75 w-75">
        </div>
    </div>
    `)
    //console.log($(event.target).parent().attr('id'));
    fighters.forEach(fighter => {
        if(fighter.id===$(event.target).parent().attr('id')){
            $('#fight-ring').append(`
            <div id="${fighter.name}" class="card shadow-sm ring-card m-0">
                <div class="card-header d-flex justify-content-center align-items-center">
                    <h1 class="h1_fonts">${fighter.name}</h1>
                </div>
                <div class="card-body p-1 d-flex flex-column justify-content-center ">
                    <img src=${fighter.image} class="w-25 align-self-center rounded-circle" alt="${fighter.name}">
                    <div class="progress">
                        <div id="a-hp" class="bg-success progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="width: 100%" name="${fighter.name}" aria-valuenow="${fighter.hp}" aria-valuemin="0" aria-valuemax="${fighter.hp}" weakness="${fighter.weak}">${fighter.hp}HP</div>
                    </div>
                </div>
                <div id="${fighter.name}-attacks" class="attack-list d-flex flex-column justify-content-center align-items-center">
                </div>
            </div>
            `);
            fighter.attacks.forEach(attack => {
                $(`#${fighter.name}-attacks`).append(`
                <button type="button" class="btn-dark btn-block btn-outline-red attack-button p-1 m-1" atk="${attack.attack}" pow="${attack.damage}" acc="${attack.accuracy}">ATK: ${attack.attack}<br>POW: ${attack.damage} ACC: ${attack.accuracy*100}%</button>
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
            <div id="${randomFighter.name}" class="card shadow-sm ring-card m-0">
                <div class="card-header d-flex justify-content-center align-items-center">
                    <h1 class="h1_fonts">${randomFighter.name}</h1>
                </div>
                <div class="card-body p-1 d-flex flex-column justify-content-center">
                    <img src=${randomFighter.image} class="w-25 align-self-center rounded-circle" alt="${randomFighter.name}">
                    <div class="progress">
                        <div id="b-hp" class="bg-success progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="width: 100%" name="${randomFighter.name}" aria-valuenow="${randomFighter.hp}" aria-valuemin="0" aria-valuemax="${randomFighter.hp}" weakness="${randomFighter.weak}">${randomFighter.hp}HP</div>
                    </div>
                </div>
                <div id="cpu-attacks" class="d-flex justify-content-center flex-column">
                </div>
            </div>
            `);}
            randomFighter.attacks.forEach(attack => {
                $(`#cpu-attacks`).append(`
                <div class="bg-dark text-white text-sm cpu-attack-button p-1 m-1 text-center" atk="${attack.attack}" pow="${attack.damage}" acc="${attack.accuracy}">ATK: ${attack.attack}<br>POW: ${attack.damage} ACC: ${attack.accuracy*100}%</div>
                `);
            });
    $('#character-selector').remove();
    fightTheme.play();
}

//Listens to the clicked attack and "rolls the dice" to determine whether attack hit or missed, if hit, substract dealt damage from opposing player HP, (Stretch goal) If hit is performed by victim's weakness, multiply damage by 1.2.
function userAttack (event) {
    if($(event.target).attr('acc')>Math.random()){
        $('.attack-button').attr("disabled", true);
        let damage = 0;
        //console.log($(event.target).parent().parent().attr('id'));
        //console.log(`${$(event.target).parent()} dealt ${$(event.target).attr('pow')} damage!`);
        if($('#b-hp').attr('weakness')===$('#a-hp').attr('name')){
            $('#b-hp').attr('aria-valuenow', $('#b-hp').attr('aria-valuenow') - $(event.target).attr('pow')*1.2);
            damage = $(event.target).attr('pow')*1.2;
        } else {
            $('#b-hp').attr('aria-valuenow', $('#b-hp').attr('aria-valuenow') - $(event.target).attr('pow'));
            damage = $(event.target).attr('pow');
        }
        $('#b-hp').attr('style', `width: ${($('#b-hp').attr('aria-valuenow')/$('#b-hp').attr('aria-valuemax'))*100}%`);
        $('#b-hp').text(`${$('#b-hp').attr('aria-valuenow')}HP`);
        $('#lspeech-bubble').text(`${$(event.target).parent().parent().attr('id')} used ${$(event.target).attr('atk')} and dealt ${damage} damage!`)
        userHit.play();
    } else {
        //console.log('You missed!')
        missHit.play();
        $('#lspeech-bubble').text(`Oh no! ${$(event.target).parent().parent().attr('id')} missed the attack!`)
    }
    checkCPU();
}

//Excecuted 1 second after user attacks, this select a random CPU attack and rolls the dice on whether it hits or not.
function cpuAttack(){
    let $randomAttack = $('#cpu-attacks div').eq(Math.floor(Math.random()*3));
    //console.log($randomAttack.text())
    if($randomAttack.attr('acc')>Math.random()){
        let damage = 0;
        if($('#a-hp').attr('weakness')===$('#b-hp').attr('name')){
            $('#a-hp').attr('aria-valuenow', $('#a-hp').attr('aria-valuenow') - $randomAttack.attr('pow')*1.2);
            damage = $randomAttack.attr('pow')*1.2;
        }else{
            $('#a-hp').attr('aria-valuenow', $('#a-hp').attr('aria-valuenow') - $randomAttack.attr('pow'));
            damage = $randomAttack.attr('pow');
        }
    $('#a-hp').attr('style', `width: ${($('#a-hp').attr('aria-valuenow')/$('#a-hp').attr('aria-valuemax'))*100}%`);
    $('#a-hp').text(`${$('#a-hp').attr('aria-valuenow')}HP`);
    $('#rspeech-bubble').text(`${$randomAttack.parent().parent().attr('id')} used ${$randomAttack.attr('atk')} and dealt ${damage} damage!`)
    cpuHit.play();
    } else {
        //console.log('CPU missed!');
        $('#rspeech-bubble').text(`Lucky! ${$randomAttack.parent().parent().attr('id')} missed!`)
        missHit2.play();
    }
    setTimeout(checkPlayer,1000);
}

//After every user move, this function serves to check if the CPU is still alive, if it is, then execute a CPU attack, if it died, then excecute next stage.
function checkCPU(){
    if($('#b-hp').attr('aria-valuenow')<=0){
        $('#b-hp').text('DEAD')
        $('#b-hp').attr('style', 'width: 100%')
        $('#b-hp').attr('class','bg-danger progress-bar progress-bar-striped progress-bar-animated')
        $('#rspeech-bubble').text(`${$('.attack-button').parent().parent().attr('id')} wins the battle!`);
        $('#lspeech-bubble').text(`${$('.attack-button').parent().parent().attr('id')} wins the battle!`);
        console.log('USER WINS!!');
        $('.attack-button').remove();
        $(`.attack-list`).append(`
        <img src='images/win.png' style="max-height:150px;" class="align-self-center">
        `);
        playerScore++;
        $('#player-score').text(`Player: ${playerScore}`);
        endFx.play();
        setTimeout(newBattle, 4000);
    } else {
        setTimeout(cpuAttack,2000);
    }
}

//After every cpu move, this function serves to check if the user is still alive, if it is, then execute a CPU attack, if it died, then excecute next stage.
function checkPlayer(){
    if($('#a-hp').attr('aria-valuenow')<=0){
        $('#a-hp').text('DEAD');
        $('#a-hp').attr('style', 'width: 100%')
        $('#a-hp').attr('class','bg-danger progress-bar progress-bar-striped progress-bar-animated');
        $('#rspeech-bubble').text(`${$('#cpu-attacks').parent().attr('id')} wins the battle!`);
        $('#lspeech-bubble').text(`${$('#cpu-attacks').parent().attr('id')} wins the battle!`);
        console.log('CPU WINS!!!');
        $('.attack-button').remove();
        $(`.attack-list`).append(`
        <img src='images/dead.png' style="max-height:150px;" class="align-self-center">
        `);
        cpuScore++;
        $('#cpu-score').text(`CPU: ${cpuScore}`);
        endFx.play();
        setTimeout(newBattle, 4000);
    }
    $('.attack-button').attr("disabled", false)
}

//As long as neither team has reached a score of 2, take user back to character screen.
function newBattle(){
    fightTheme.pause();
    fightTheme.currentTime = 0;
    if(playerScore === 2) {
        win = "YOU WON";
        endGame();
    } else if (cpuScore===2) {
        win = "THE CPU WON"
        endGame();
    } else {
        $('#battle-scene').remove();
        $display.append(`
        <div id="loading-screen" class="d-flex flex-column justify-content-center align-items-center h-100 w-75">
            <h1 class="text-light" style="font-family: 'Changa', sans-serif;">Taking you back to character select...</h1>
            <div class="spinner-border text-light" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
        `);
        setTimeout(createFighters,2000);
    }
}

//This function is executed by newBattle() if it determines the game should end. The function removes everything on sight and displays a screen with the winner, as well as options to either play again or exit the site.
function endGame(){
    gameOverTheme.play();
    $('#battle-scene').remove();
    $display.append(`
        <div id="loading-screen" class="d-flex flex-column justify-content-center align-items-center h-100 w-75">
            <h1 class="bg-dark text-light" style="font-family: 'Changa', sans-serif;">${win} THE GAME!!</h1>
            <button id="ending1" class="w-25 align-self-center">Play AGAIN!</button>
            <button id="ending2" class="w-25 align-self-center">BUY the game!!</button>
        </div>
        `)
        if(win === "YOU WON"){
            youWin.play();
        } else {
            youLose.play();
        }
}
//This function runs in case the user elected to play again, it reloads the document, bringing the user back to the Instructions screen.
function reload() {
    location.reload();
}

//This function runs in case the user is curious to see my bad joke.
function buy(){
    window.location.href = 'https://www.amazon.com/Episode-5-1/dp/B000KDZSH2/ref=sr_1_1?keywords=celebrity+deathmatch&qid=1578530587&sr=8-1'
}

//Fires iconic character select sound
let selectNoise = () => charSelected.play(); 

// ***************************** Event Listeners **************************************************************
$('#game-start').on('click', createFighters);
$('#game-start').on('click', selectNoise);
$display.on('click', '#game-mode-selected', createFighters);
$display.on('click', '.character-selected', selectNoise);
$display.on('click', '.character-selected', battleStart);
$display.on('click', '.attack-button', userAttack);
$display.on('click','#ending1', reload);
$display.on('click', '#ending2', buy);