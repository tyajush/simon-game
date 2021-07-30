buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
newGame = false;
level = 0;
var userClickedPattern=[];
function nextSequence() {
  userClickedPattern = [];
  level = level+1;
  $("#level-title").html("Level : "+level);
  randomNumber = Math.floor(Math.random() * 4);
  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $('#'+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  $('#'+randomChosenColour).ready(function(){
    const audio = new Audio("sounds/"+randomChosenColour+".mp3");
    audio.play();
  });
}

$('.btn').on('click',function(){

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
  playAudio(userChosenColour);

});

$(".btn").off('click'); 

function animatePress(currentColor)
{$("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
function playAudio(currentColor)
{
  const audio = new Audio("sounds/"+currentColor+".mp3");
  audio.play();
}
function checkAnswer(currentLevel)
{
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel])
  {
    console.log("right");
    if(userClickedPattern.length === gamePattern.length)
    {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }
  else {
    $(".btn").off('click'); 
    console.log("wrong");
    playAudio("wrong");
    $('#level-title').html("Game Over, Press Any Key to Restart");
    if(level==0){$('.final-score').html("Score - 0");}
    else{
	 level-=1;
    $('.final-score').html("Score - "+level);
	}
    $("body").addClass("game-over");
    setTimeout(function functionName() {
      $("body").removeClass("game-over");
    },200);
    startOver();
  }
}


$('body').keypress(function(){
  if(newGame==false)
  { $(".btn").on('click',function(){

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
  playAudio(userChosenColour);

}); 
    newGame = true;
    nextSequence();
    $('.final-score').html("");
  }
});

function startOver()
{
  level = 0;
  gamePattern = [];
  newGame = false;
}
