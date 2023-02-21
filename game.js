// Initie les 4 couleurs possibles dans le jeu
var buttonColours = ["red", "blue", "green", "yellow"];

// Création d'un pattern
var gamePattern = [];

// pattern clické par le joueur
var userClickedPattern = [];

// variables pour dire si le level atteint et si le jeu est commencé
var level = 0;
var started = false;

// lance le début du jeu quand le jour press une touche du clavier.
$(document).keypress(function(){
    if(!started){

        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }

});

// détecte les boutons clickés par le joueur
$(".btn").click(function( ){

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    
    checkAnswer(userClickedPattern.length-1);
});


// Fonction qui active le son correspondant au bouton pressé
function playSound (name) {

    var audio = new Audio("sounds/"+ name + ".mp3");
    audio.play();
}

// Fonction qui créer une animation à chaque bouton pressé par le joueur
function animatePress (currentColour) {
    $("#" + currentColour ).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColour ).removeClass("pressed");
    }, 100); 

}


// Fonction qui génère une nouvelle sequence
function nextSequence() {
    
    userClickedPattern = [];
    // ajoute un level 
    level++;
    $("#level-title").text("Level " + level);

    // génère une nouvelle couleur aléatoire et stock le resultat
    var randomNumber = Math.floor( Math.random() * 4 );
    var randomChosenColour = buttonColours [ randomNumber ];
    gamePattern.push(randomChosenColour);

    // flash le bouton de la couleur générée
    $( "#" + randomChosenColour ).fadeIn(100).fadeOut(100).fadeIn(100);
    
    // jouer la note de la couleur générée
    playSound(randomChosenColour);

}

// vérifie que le pattern du joueur 
function checkAnswer (currentLevel){
    if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {

        console.log("success");

        if (userClickedPattern.length === gamePattern.length){

            setTimeout(function () {
              nextSequence();
            }, 1000);
    
          }
        
    } else {

        console.log("wrong");

        // joue le song "Wrong"
        playSound("wrong");
        
        // change la couleur du fond en rouge
        $("body" ).addClass("game-over");
        setTimeout(function(){
        $("body").removeClass("game-over");
        }, 200); 

        // change le titre 
        $("#level-title").text("Game over, Press any key to Restart");

        // restart le jeu
        startOver();
    }
   
}

// restart le jeu
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
    userClickedPattern = [];
}








