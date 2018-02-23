var wordChoices = ["ACCIO",
    "ACROMANTULA",
    "ALOHAMORA",
    "ANIMAGUS",
    "APPARATE",
    "AZKABAN",
    "BASILISK",
    "BEAUXBATONS",
    "BELLATRIX",
    "CENTAUR",
    "DEMENTOR",
    "DIVINATION",
    "DOBBY",
    "DRAGON",
    "DUMBLEDORE",
    "DURMSTRANG",
    "EXPELLIARMUS",
    "FANG",
    "FIREBOLT",
    "GALLEON",
    "GILLYWEED",
    "GRIM",
    "GRYFFINDOR",
    "HALLOWS",
    "HARID",
    "HEDWIG",
    "HERBOLOGY",
    "HERMIONE",
    "HEWHOMUSTNOTBENAMED",
    "HIPPOGRIFF",
    "HOGSMEADE",
    "HONEYDUKES",
    "HUFFLEPUFF",
    "KNUT",
    "LEGILIMENCY",
    "LUMOS",
    "MADEYE",
    "MAGICAL",
    "MANDRAKE",
    "METAMORPHMAGUS",
    "MUDBLOOD",
    "MUGGLE",
    "OCCLUMENCY",
    "PARSELTONGUE",
    "PATRONUS",
    "PENSIEVE",
    "PHOENIX",
    "PORTKEY",
    "POTIONS",
    "QUIDDITCH",
    "QUIRRELL",
    "RAVENCLAW",
    "REMEMBRALL",
    "RIDDIKULUS",
    "SICKLE",
    "SIRIUS",
    "SLYTHERIN",
    "SNAPE",
    "SNEAKOSCOPE",
    "SNITCH",
    "SPLINCHING",
    "SQUIB",
    "THESTRAL",
    "TRANSFIGURATION",
    "TROLL",
    "UMBRIDGE",
    "VERITASERUM",
    "VOLDEMORT",
    "WAND",
    "WEASLEY",
    "WEREWOLF",]
var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
//"trackers"
var word = "";
var wordArray = [];
var userWord = "";
var userWordArray = [];
var userGuess;
var lettersGuessed = [];
var guessesRemaining;
var win = 0;
var lose = 0;
// booleans
var guessed;
var isLetter;


// Reset game and pick a random word from the array
function newWord() {
    reset();
    word = wordChoices[Math.floor(Math.random() * wordChoices.length)];
    wordArray = word.split("");
    console.log(wordArray);
    for (var i = 0; i < wordArray.length; i++) {
        userWordArray.push(" _ ");
    }
    $("#userWord").html(userWordArray);
}
// Reset for next game
function reset() {
    word = "";
    wordArray = [];
    userWord = "";
    userWordArray = [];
    lettersGuessed = [];
    guessesRemaining = 7;
    $("#canvas").clearCanvas();
    $("#letters-guessed").empty();
    drawSpellCaster();
    //need to readd this styling so last button clicked doesn't keep button-clicked styling
    $(".letter-button").css({"font-weight": "bold", "background": "green", "float": "left", "margin": "2px", "color": "#000"});
    $(".letter-button").removeClass("button-clicked");
}
function drawSpellCaster() {
    var $canvas = $("#canvas");
    //right leg
    $canvas.drawLine({
        strokeStyle: "black",
        strokeWidth: 4,
        rounded: true,
        x1: 275, y1: 275,
        x2: 250, y2: 225,
    });
    //left leg
    $canvas.drawLine({
        strokeStyle: "black",
        strokeWidth: 4,
        rounded: true,
        x1: 225, y1: 275,
        x2: 250, y2: 225,
    });
    //body
    $canvas.drawLine({
        strokeStyle: "black",
        strokeWidth: 4,
        rounded: true,
        x1: 250, y1: 225,
        x2: 250, y2: 150,
    });
    //right arm
    $canvas.drawLine({
        strokeStyle: "black",
        strokeWidth: 4,
        rounded: true,
        x1: 250, y1: 175,
        x2: 275, y2: 150,
    });
    //left arm
    $canvas.drawLine({
        strokeStyle: "black",
        strokeWidth: 4,
        rounded: true,
        x1: 250, y1: 175,
        x2: 225, y2: 150,
    });
    //head
    $canvas.drawArc({
        strokeStyle: "black",
        strokeWidth: 4,
        x: 250, y: 125,
        radius: 25,
    })
        //right eye
        .drawArc({
            fillStyle: "black",
            strokeStyle: "black",
            x: 240, y: 120,
            radius: 1,
        })
        //left eye
        .drawArc({
            fillStyle: "black",
            strokeStyle: "black",
            x: 260, y: 120,
            radius: 1,
        })
        //mouth
        .drawLine({
            strokeStyle: "black",
            strokeWidth: 2,
            x1: 242, y1: 135,
            x2: 258, y2: 135,
        })
        //glasses
        .drawArc({
            strokeStyle: "black",
            x: 240, y: 120,
            radius: 6,
        })
        .drawArc({
            strokeStyle: "black",
            x: 260, y: 120,
            radius: 6,
        })
        .drawLine({
            strokeStyle: "black",
            strokeWidth: 2,
            x1: 246, y1: 120,
            x2: 254, y2: 120,
        })
        .drawLine({
            strokeStyle: "black",
            strokeWidth: 2,
            x1: 266, y1: 120,
            x2: 273, y2: 117,
        })
        .drawLine({
            strokeStyle: "black",
            strokeWidth: 2,
            x1: 234, y1: 120,
            x2: 225, y2: 117,
        })
        //scar
        .drawLine({
            strokeStyle: "darkred",
            strokeWidth: 1,
            x1: 243, y1: 103,
            x2: 248, y2: 106,
            x3: 244, y3: 109,
            x4: 247, y4: 111,
        })
        //wand
        .drawArc({
            fillStyle: "black",
            strokeStyle: "black",
            x: 221, y: 148,
            radius: 4,
        })
        .drawLine({
            strokeStyle: "black",
            strokeWidth: 3,
            x1: 221, y1: 148,
            x2: 195, y2: 125,
        });
}
//For keyed only: check to see if key pressed was a letter
function checkTyped(userGuess) {
    isLetter = false;
    for (var i = 0; i < alphabet.length; i++) {
        if (userGuess === alphabet[i]) {
            isLetter = true;
        }
    }
}
// Check to see if letter guessed has been guessed before
function checkGuessedBefore(userGuess) {
    guessed = false;
    for (i = 0; i < lettersGuessed.length; i++) {
        if (userGuess === lettersGuessed[i]) {
            alert("Letter " + lettersGuessed[i] + " has already been guessed. Guess another letter.");
            guessed = true;
            return;
        }
    }
    for (i = 0; i < userWordArray.length; i++) {
        if (userGuess === userWordArray[i]) {
            alert("Letter " + userWordArray[i] + " has already been guessed correctly.");
            guessed = true;
            return;
        }
    }
}

// Check to see if the letter is correct or incorrect
function checkGuess(userGuess) {
    var gotOne = false;
    for (i = 0; i < wordArray.length; i++) {
        if (userGuess === wordArray[i]) {
            userWordArray.splice(i, 1, userGuess);
            $("#userWord").html(userWordArray);
            gotOne = true;
        }
    }
    if (!gotOne) {
        guessesRemaining -= 1;
        lettersGuessed.push(userGuess);
        $("#letters-guessed").append(userGuess + " ")
        drawHangman(guessesRemaining);
    }
}
//Drawing the hangman
function drawHangman(guessesRemaining) {
    var $canvas = $("#canvas");
    if (guessesRemaining === 6) {
        $canvas.drawLine({
            strokeStyle: "gold",
            strokeWidth: 2,
            x1: 195, y1: 125,
            x2: 170, y2: 100,
            x3: 145, y3: 130,
            x4: 135, y4: 50,
            x5: 105, y5: 70,
            x6: 75, y6: 25,
        });
    }
    if (guessesRemaining === 5) {
        //right leg
        $canvas.drawLine({
            strokeStyle: "black",
            strokeWidth: 4,
            rounded: true,
            x1: 75, y1: 25,
            x2: 50, y2: 75,
        });
    }
    if (guessesRemaining === 4) {
        //left leg
        $canvas.drawLine({
            strokeStyle: "black",
            strokeWidth: 4,
            rounded: true,
            x1: 25, y1: 25,
            x2: 50, y2: 75,
        });
    }
    if (guessesRemaining === 3) {
        //body
        $canvas.drawLine({
            strokeStyle: "black",
            strokeWidth: 4,
            rounded: true,
            x1: 50, y1: 75,
            x2: 50, y2: 150,
        });
    }
    if (guessesRemaining === 2) {
        //right arm
        $canvas.drawLine({
            strokeStyle: "black",
            strokeWidth: 4,
            rounded: true,
            x1: 50, y1: 125,
            x2: 75, y2: 150,
        });
    }
    if (guessesRemaining === 1) {
        //left arm
        $canvas.drawLine({
            strokeStyle: "black",
            strokeWidth: 4,
            rounded: true,
            x1: 50, y1: 125,
            x2: 25, y2: 150,
        });
    }
    if (guessesRemaining === 0) {
        //head
        $canvas.drawArc({
            strokeStyle: "black",
            strokeWidth: 4,
            x: 50, y: 175,
            radius: 25,
        })
            //left eye
            .drawArc({
                fillStyle: "black",
                strokeStyle: "black",
                x: 40, y: 180,
                radius: 2,
            })
            //right eye
            .drawArc({
                fillStyle: "black",
                strokeStyle: "black",
                x: 60, y: 180,
                radius: 2,
            })
            //mouth
            .drawArc({
                strokeStyle: "black",
                strokeWidth: 2,
                x: 50, y: 165,
                radius: 5,
            });
    }
}

//check to see if user has won or lost and track win/loss
function checkStatus() {
    userWord = userWordArray.join("");
    if (userWord === word) {
        setTimeout(function () {
            alert("You win, Liberacorpus!");
            win += 1;
            $("#wins").html("Wins: " + win);
            newWord();
        }, 100);
    }
    else if (guessesRemaining === 0) {
        setTimeout(function () {
            alert("You lose, Levicorpus! The word was " + word + ".");
            lose += 1;
            $("#losses").html("Losses: " + lose);
            newWord();
        }, 100);
    }
}
$(document).ready(function () {
    newWord();

    //Create Buttons/monitor for button clicks -> if button clicked, capture that letter
    for (var i = 0; i < alphabet.length; i++) {

        var $letterBtn = $("<button>")
            .addClass("letter-button btn btn-default")
            .attr("letter", alphabet[i])
            .html(alphabet[i]);

        $("#letter-options").append($letterBtn);
    }
    var $letter;

    // Button Clicked
    $(".letter-button").on("click", function () {
        $(this).addClass("button-clicked");
        $letter = $(this).attr("letter");
        checkGuessedBefore($letter);
        if (!guessed) {
            checkGuess($letter);
            checkStatus();
        }
    });

    //Keyed
    document.onkeyup = function (event) {
        var userGuess = event.key.toUpperCase();
        checkTyped(userGuess);
        if (!isLetter) {
            alert("Please choose a letter");
            return;
        }
        var $correspondingBtn = $(".letter-button[letter =" + userGuess + "]").addClass("button-clicked");
        checkGuessedBefore(userGuess);
        if (!guessed) {
            checkGuess(userGuess);
            checkStatus();
        }
    }
});
