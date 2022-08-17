
// 1.This array  is used to detect the botton colors
var buttonColors = ["green","red","yellow","blue"];

// 2.This array is used to maintained the track over the Random gamePlay Pattern
var gamePattern = [];


// 3.This array is used to maintain the track over the User clicked pattern
var userClickedPattern = [];

// 4.This is used to restrict the use of keypess and maintain the flow of control
var started = false;

// 5.This is used to maintain the track over increasing of Levels
var level = 0;


// 6.Event Listners for Key Press
$(document).keydown(function(){
  if(!started){
    // KeyPress to Start the Game only for the First Time  or Reset the Game
    $(".head").text("Level "+level);
    nextSequence();
    started = true;

  }
});

// 7.Event Listeners for Mouse Clicks
$(".btn").click(function(key){

  var userChosenColour = $(this).attr("id"); //Identifying the Which Btn Does the user clicked

  userClickedPattern.push(userChosenColour); //Pushing user clicked btn color  To userClickedPattern
  fadingInOut(userChosenColour); //animation whenever the user clicks the btn
  playSound(userChosenColour);  // Plays different Sounds for the respected btns

  //Checking the UserCLikced Pattern with The GamePattern to Continue the Game
  checkAnswer(userClickedPattern.lastIndexOf(userChosenColour));

});

//8.Triggers the Next Sequence of Pattern
function nextSequence(){

    userClickedPattern = [];

    level++;

    $(".head").text("Level "+level); //increasing the Level one by one

    var randomNumber =Math.floor(Math.random()*4);
    var randomChoosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChoosenColor); //Pushing the random color to gamePattern

    $("#" + randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100); //animation for the Game Pattern

    playSound(randomChoosenColor);
}


//animation Function
function fadingInOut( choosenColor ){
  $("."+choosenColor).addClass("pressed");
  setTimeout(function(){
    $("."+choosenColor).removeClass("pressed");
  },100);

}


//Sound PLaying Function for both nextSequence and User Clicked Sequence
function playSound(name){
  var audio = new Audio("sounds/"+ name +".mp3");
  audio.play();
}

//The Wrong Function whenever the User inputs a Wrong Pattern, This Function comes into Picture.
function wrongAnswer(){
  //Reset all the values to Restart the Game
  started = false;
  gamePattern = [];
  level = 0;

  $("body").addClass("wrong");
  setTimeout(function(){
    $("body").removeClass("wrong");
  },200);

  var audio = new Audio("sounds/wrong.mp3");
  audio.play();

  $(".head").text("Game Over, Press any Key to Restart");
}



function checkAnswer(currentLevel){
  if( gamePattern[currentLevel] === userClickedPattern[currentLevel] ){

    if(gamePattern.length === userClickedPattern.length)
      setTimeout(function(){
        nextSequence();
      },1000);
  }
  else{
    wrongAnswer();
  }
}
