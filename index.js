var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userChosenPattern = [];

//You'll need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var started = false;

//Create a new variable called level and start at level 1.
var level = 1;

// if the game hasn't started yet
$(document).keypress(function () {
  if (!started) {
    setTimeout(function () {
      nextSequence();
      started = true;
    }, 200);
  }
});

function nextSequence() {
  userChosenPattern = [];

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  //1. Use jQuery to select the button with the same id as the randomChosenColour
  //2. and specity the time it should take to fade in and out
  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  // make sound
  playSound(randomChosenColour);

  // show level in heading
  $("h1").html("Level " + level);
  level++;
}

// detect wehn any of the buttons get clicked
$(".btn").on("click", function () {
  if (started) {
    var userChosenColour = $(this).attr("id");

    userChosenPattern.push(userChosenColour);

    console.log(userChosenPattern);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAns(userChosenPattern.length - 1);
  }
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAns(level) {
  //check if the user selects the right button
  if (gamePattern[level] === userChosenPattern[level]) {
    // now check is the size of user pattern has reached the game pattern
    if (gamePattern.length === userChosenPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function startOver() {
  level = 1;
  gamePattern = [];
  started = false;
}
