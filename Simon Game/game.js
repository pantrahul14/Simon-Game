var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];

var level = 0;

var started = false;
$("body").keypress(function(){
  if(started===false){
    $("h1").text("Level "+level);
    nextSequence();
    started = true;
  }
});

function nextSequence(){
  level++;
  $("h1").text("Level "+level);
  var randomNumber = Math.round(Math.random()*3);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  userClickedPattern = [];
}

$(".btn").click(handler);

function handler(){
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
}

function playSound(name){
  const audio = new Audio("sounds/"+name+".mp3" );
  audio.play();
}

function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        if(userClickedPattern.length===gamePattern.length){
          setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else{
      const audio = new Audio("sounds/wrong.mp3");
      audio.play();
      $("body").addClass("game-over");
      setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
      $("h1").text("Game Over, Press Any Key to Restart");
      startOver();
    }
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
