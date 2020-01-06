// ***************************** Core Modules *****************************************************************
// ***************************** 3rd Party Libraries **********************************************************
// ***************************** Sanity Check *****************************************************************
// ***************************** Constants & Variables ********************************************************
let score = 0
// ***************************** App State ********************************************************************
// ***************************** Functions ********************************************************************
// Removes Instructions, transitions into character selection.
function gameStart(){
    $('#instructions').remove();
    $('#display').append(`
    <div id="mode-select">
                <form action="#">
                    <p>Please select a game mode:</p>
                    <input type="radio" name="mode" value="mode1"> Select user fighter and randomize CPU opponent.<br>
                    <input type="radio" name="mode" value="mode2"> Select CPU opponent and randomize user fighter<br>
                    <input id="game-mode-selected" type="submit" value="Submit">
                </form>
            </div>
    `);
}

function characterSelect(){
    $('#mode-select').remove();
    $('#display').append(`
    <div class="container">
        <div class="card-deck mb-3 text-center">
            <div class="card mb-4 shadow-sm">
                <div class="card-header">
                    <h1 class="my-0 font-weight-normal">Fred Durst</h1>
                </div>
                <div class="card-body">
                    <ul class="list-unstyled mt-3 mb-4">
                        <li>If only we could fly!</li>
                        <li>HP</li>
                        <li>Attacks</li>
                        <li>Weakness</li>
                    </ul>
                    <button type="button" class="btn btn-dark btn-block btn-outline-red">Select</button>
                </div>
            </div>
        </div>
    </div>
    `);
}
// ***************************** Event Listeners **************************************************************
$('#game-start').on('click', gameStart);
$('#display').on('click', '#game-mode-selected', characterSelect);
