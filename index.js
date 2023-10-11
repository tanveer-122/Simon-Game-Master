var allColors=["blue","green","yellow","red"];
var updatedPattern=[];
var userClickedPattern = [];
var start=false;
var level=0;
$(document).keypress(function(){
  if(!start){
    $("#level-title").text("Level "+level);
    mySequence();
    start=true;
  }
});

$(".btn").click(function(){
  var currentColor=$(this).attr("id");
  userClickedPattern.push(currentColor);
  playSound(currentColor);
  animateKey(currentColor);
  checkAnswer(userClickedPattern.length-1);
})

function checkAnswer(currentLevel) {

    if (updatedPattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      if (userClickedPattern.length === updatedPattern.length){

        setTimeout(function () {
          mySequence();
        }, 1000);

      }

    } else {

      console.log("wrong");
      playSound("wrong");

      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      $("#level-title").text("Game Over, Press Any Key to Restart");
      startOver();
    }
}

function mySequence(){
  userClickedPattern=[];
  level++;
  $("#level-title").text("Level "+level);
  var randomNum=Math.floor(Math.random()*4);
  var choosenColor=allColors[randomNum];

  updatedPattern.push(choosenColor);

  $("#"+choosenColor).fadeIn(150).fadeOut(150).fadeIn(150).fadeOut(150).fadeIn(150);
  playSound(choosenColor);
}
function playSound(name){
  var audio=new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animateKey(name){
    $("#"+name).addClass("pressed");
    setTimeout(function(){
      $("#"+name).removeClass("pressed");
    }, 150)
}
function startOver() {
  level = 0;
  updatedPattern = [];
  start = false;
}
