var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern = [];
var started = false;
var level = 0;


function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level " + level);
    var randomnumber=Math.floor(Math.random()*4);
    var randomChosenColor=buttonColors[randomnumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
    makeSound(randomChosenColor);

}


$(".btn").click(function () { 
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    makeSound(userChosenColour);
    animatePress(userChosenColour);
    var lastindex=userClickedPattern.length-1;
    checkAnswer(lastindex);
});


function makeSound(key){
    switch(key){
        case "red":
            var redaudio=new Audio('sounds/red.mp3');
            redaudio.play();
            break;
        case "blue":
            var blueaudio=new Audio('sounds/blue.mp3');
            blueaudio.play();
            break;
        case "green":
            var greenaudio=new Audio('sounds/green.mp3');
            greenaudio.play();
            break;
        case "yellow":
            var yellowaudio=new Audio('sounds/yellow.mp3');
            yellowaudio.play();
            break;
        case "wrong":
            var wrongsound=new Audio('sounds/wrong.mp3');
            wrongsound.play();
            break;
    }
}

function animatePress(userChosenColour)
{
    $("."+userChosenColour).addClass("pressed");
    setTimeout(function(){
        $("."+userChosenColour).removeClass("pressed");
    },100);
}


$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


function checkAnswer(currentLevel)
{
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("success");
    
    if(gamePattern.length===userClickedPattern.length)
    {
        setTimeout(function(){
            nextSequence();
        }, 1000);
    }}
    else
    {
        makeSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startover();
    }
}


function startover(){
    level=0;
    gamePattern=[];
    started=false;
}