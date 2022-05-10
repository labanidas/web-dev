var drum = document.querySelectorAll(".drum");

// mouse click
for (let i = 0; i < drum.length; i++)
  drum[i].addEventListener("click", function () {

    var value = this.textContent;
    makeSound(value);
    buttonAnimation(value);
    
  });

// keypress
  document.addEventListener('keypress', function(event){
    makeSound(event.key);
    buttonAnimation(event.key);
  });

  
// switch element
  function makeSound(key){

    switch (key) {
      case "w":
        var tom1 = new Audio("sounds/tom-1.mp3");
        tom1.play();
        break;
      case "a":
        var tom2 = new Audio("sounds/tom-2.mp3");
        tom2.play();
        break;
      case "s":
        var tom3 = new Audio("sounds/tom-3.mp3");
        tom3.play();
        break;

      case "d":
        var tom4 = new Audio("sounds/tom-4.mp3");
        tom4.play();
        break;
      case "j":
        var snare = new Audio("sounds/snare.mp3");
        snare.play();
        break;
      case "k":
        var crash = new Audio("sounds/crash.mp3");
        crash.play();
        break;
      case "l":
        var kick = new Audio("sounds/kick-bass.mp3");
        kick.play();
        break;

      default:
        break;
    }
  };

  //button animation
function buttonAnimation(key){

  var buttonclick = document.querySelector("." + key);
  buttonclick.classList.add("pressed");

  setTimeout(function(){
    buttonclick.classList.remove("pressed");
  },100);

}