### Celebrity Deathmatch: The 90's

## Instructions
This is a turn-based fighting game, you must win 2 out of 3 fights to win the game. The game begins by giving the user the option to either:

* A) Select their character and the **CPU's character will be randomized.**

or...

* B) Select the CPU's character **but** then the user's will be randomized.

The user can select one of a total of 4 characters, each character will have a character card which shows their **total HP, attack-set, and weakness**, which will be one of the other three characters in the roster. Each character has a set of **three attacks**, ranging from heavy attack but low accuracy, to a lighter attack that deals low damage but rarely misses. Once a character's HP reaches zero, the fight ends and the game resets, but a score is kept to signify the overall score. **When someone wins 2 out of three fights, the game resets completely.**

If a character gets hit by its weakness, the attack will deal 120% of the normal damage, potentially **ending the fight in a single blow.**

## Wire-Frame
![Wire Frame](https://imgur.com/MrVimY4)

## User Story
* Game Start
    * The user enters the landing page where the instructions are displayed and a single "Start Playing" button is displayed.
    * Upon clicking "Start Playing", the instructions and begin button fadeout and two radio buttons appear, followed by a "Let's get it on!" button.
    * The radio buttons prompt the user to select either their own character or the computer's.
    * Once a selection is made a row of character-cards appear.
*Character Selection
    * The row of 4 characters cards will now occupy the main view of the page.
    * Each card has:
        * Character name
        * Character picture
        * Character famous quote
        * Character HP
        * Character attacks
        * Character weakness
        * Character select button
    * Once the user selects their character, or the computer character, character cards will drop down unto the ring while the unselected characters shift away.
    * Once the cards are moved unto the ring, the fight will begin.
* Fight Mechanic
    * The user will see their character and select the move they wish to use via buttons. Once the button is pressed, the character will perform the move and the console will calculate whether it hit or missed.
    * Simultaneously with the user click, the CPU will randomize an attack selection and perform it as well.
    * A dialogue will appear above the ring summarizing which move each player used, how much damage it dealt, or indicate whether it missed. It will also prompt the user to select their next move if both characters survived.
    * This process will repeat itself until one of the two characters reach an HP of zero.
    * Once a character is defeated, the global score will add 1 to whoever won the fight and reset the game to character selection.
    * This process will repeat itseld until either the player or the CPU reach a total score of two.
* Game Over
    * Once a player or CPU reach a total score of two, a dialogue box will appear, indicating whether the player or the CPU won the game.
    * The user can choose to play again or close the page.