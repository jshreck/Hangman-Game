// Create array of possible word choices
var wordChoices = ["SNITCH", "BROOMSTICK", "MUGGLE"];
var word = "";
var wordArray = [];
var userWord = "";
var userWordArray = [];
// Display blanks in html for # of letter in word
// Create array for letter guessed -> will want to display this but only display the letters not in the word array
var lettersGuessed = [];
// Start counting guesses remaining
var guessesRemaining = 20;
//If user guessed the word they win, if they didn't and are out of guesses they lose, if they didn't and still have guesses remaining they continue playing

 // Pick a random word from the array and assign it as the one trying to be guessed
function newWord () {
    word = wordChoices[Math.floor(Math.random()*wordChoices.length)];

    // //Turn this word into an array of letters
    wordArray = word.split("");
    console.log(wordArray);
    //Display the # of blanks in the word
    for (var i=0; i<wordArray.length; i++) {
        userWordArray.push("_");
    }
    console.log (userWordArray);
    //Display guesses remaining
    console.log(guessesRemaining);
    //Display letters guessed
    console.log(lettersGuessed)
}

// Check to see if letter guessed has been guessed before
function checkGuessedBefore (userGuess) {
    for (i = 0; i < lettersGuessed.length; i++) {
        if (userGuess === lettersGuessed[i]) {
            alert("Letter " + lettersGuessed[i] + " has already been guessed. Guess another letter.");
            return;
        }
        else {
            for (j = 0; j < userWordArray.length; j++) {
                if (userGuess === userWordArray[j]) {
                    alert("Letter " + userWordArray[j] + " has already been guessed. Guess another letter.");
                    return;
                }
            }
        }
    }
}

// Check to see if the letter is correct or incorrect
function checkGuess (userGuess) {
    var gotOne = false;
    for (i = 0; i < wordArray.length; i++) {
        // If correct, display where that letter appears
        if (userGuess === wordArray[i]) {
            userWordArray.splice(i, 1, userGuess);
            console.log (userWordArray);
            gotOne = true;
        }
    }
        // If wrong, -1 for guesses remaining and add the letter to letters guessed
       if (gotOne === false) {
            guessesRemaining -= 1;
            console.log(guessesRemaining);
            lettersGuessed.push(userGuess);
            console.log(lettersGuessed);
        }
    }
// }

//check to see if user has won or lost
function checkStatus () {
    if (userWordArray === wordArray) {
    alert ("You win, Liberacorpus!");
    newWord ();
    }
    else if (guessesRemaining === 0) {
    alert ("You lose, Levicorpus!. The word was " + word + ".");
    newWord ()
    }
}



newWord();

//User will press a key to guess a letter
document.onkeyup = function (event) {
    // Capture the key typed and convert to upper case
    var userGuess = event.key.toUpperCase();
    checkGuessedBefore(userGuess);
    checkGuess(userGuess);
    checkStatus();
}


