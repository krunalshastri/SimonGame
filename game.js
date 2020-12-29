
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

//Sequence generation by system
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

//Game has started using keypress
$(document).keypress(function () {
  if (level === 0)
    nextSequence();
});

//Playing corresponding Audio file
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//Which button is clicked?
$(".btn").click(function () {
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length);
});

// Adding Animations
function animatePress(currColor) {
  $("#" + currColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currColor).removeClass("pressed");
  }, 100);
}

//Check user's answer
function checkAnswer(currLevel) {
  if (currLevel > 0 && gamePattern[currLevel - 1] === userClickedPattern[currLevel - 1]) {

    // console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }
  else {
    // console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 200);

    startOver();
  }

  //Restarting after game over
  function startOver()
  {
    level=0;
    gamePattern = [];
  }
}