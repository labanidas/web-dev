var colors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userPattern = [];
var level = 0;
var start = true ;

function startOver()
{
    gamePattern = [];
    userPattern = [];
    level = 0;
    start = true;
}
//set game sequence 
$(document).keypress(function(){
    if(start){
        nextSequence();
        start = false ;
    }
    
});
function nextSequence (){

    userPattern = [];
    $("#level-title").text("Level "+level);
    var randomColor = colors[Math.floor(Math.random()*4)];
    gamePattern.push(randomColor);
    $("#"+randomColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColor);
    level ++;
    
    // console.log(gamePattern);
}

//user answer 
$(".btn").click(handler);
function handler(e){

    userPattern.push(e.target.id);
    checkAnswer(userPattern.length-1);
    playSound($(this).attr("id"));
    animate($(this).attr("id"));
}

// checks user answer
function checkAnswer(currlev){
    if(userPattern[currlev] === gamePattern[currlev])
       { if(userPattern.length == gamePattern.length) 
           { setTimeout(function(){ nextSequence(); } , 1000); 
        //    console.log("sucess"); 
        }
       }
    else {

    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");  
    },200);

    var wrong = new Audio ("sounds/wrong.mp3");
    wrong.play();
    $("#level-title").text("Game Over, Press Any Key to Restart");
    // console.log ("lost");
    startOver();

    }
}

// sound and animation 
function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animate(name)
{
$("#"+name).addClass("pressed");
setTimeout(function(){ $("#"+name).removeClass("pressed") }, 100);
}

