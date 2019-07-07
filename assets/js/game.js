
// object with character stats
let character = {  
    ash: {
        name: "Ash",
        health: 150,
        attack: 10,
        counter: 15,
        icon: "ash_icon.png"
    },
    pikachu: {
        name: "Pikachu",
        health: 120,
        attack: 15,
        counter: 20,
        icon: "pikachu_icon.jpg"
    },
    bulbasaur: {
        name: "Bulbasaur",
        health: 110,
        attack: 18,
        counter: 22,
        icon: "bulbasaur_icon.jpg"
    },
    charizard: {
        name: "Charizard",
        health: 100,
        attack: 20,
        counter: 25,
        icon: "charizard_icon.jpg"
    }
};

// global variables
let player = {};
let opponent = {};
let gameOn = false;
let turnCount = 1;
let listOfDead = [];

// determines how much damage an attack yields
function calcDamage(obj) {
    let accuracy = Math.floor(Math.random() * Math.floor(100));
    let attackPower = Math.round((obj.attack * accuracy) / 100);
    return attackPower;
}

// When you click on a character:
$(".character_img").click(function() {

    // If player and opponent are not yet selected:
    if (!player.name && !opponent.name) {
        
        // populate the "player" object
        player.name = character[$(this).attr("id")].name;
        player.attack = character[$(this).attr("id")].attack;
        player.health = character[$(this).attr("id")].health;
        
        // insert current player info into div
        $("#player_name").text(player.name);
        $("#player_image").html("<img src='assets/media/" + character[$(this).attr("id")].icon + "'></img>");
        $("#player_health").text(player.health);

        // change image to color and update directions
        $(this).css("filter", "grayscale(0%)");
        $("#message").text("now, choose your opponent");

    // if player is selected, but opponent is not, assign id to "opponent", .
    } else if (player.name && !opponent.name) {

        // if it is not the same as player:
        if (character[$(this).attr("id")].name !== player.name && !listOfDead.includes(character[$(this).attr("id")].name)) {

            // populate the opponent object
            opponent.name = character[$(this).attr("id")].name;
            opponent.health = character[$(this).attr("id")].health;
            opponent.attack = character[$(this).attr("id")].counter;

            // Insert current opponent info into div
            $("#opponent_name").text(opponent.name);
            $("#opponent_image").html("<img src='assets/media/" + character[$(this).attr("id")].icon + "'></img>");
            $("#opponent_health").text(opponent.health);
            
            //change image to color and update directions
            $(this).css("filter", "grayscale(0%)");
            $("#message").text("Click START to begin the battle");
        }
    } 
});

// when you click on START:
$("#start").click(function() {
    if (player.name && opponent.name) {
        gameOn = true;
        $("#message").text("The battle has begun.  Now Attack!");
    }
});

// when you click on ATTACK:
$(".button").click(function() {
    if (gameOn === true) {

        if (opponent.health > 0 && player.health > 0) {
        
            // modify player/opponent health
            let opponentDam = calcDamage(player) * turnCount;
            let playerDam  = calcDamage(opponent);
            opponent.health -= opponentDam;
            player.health -= playerDam;

            // update player cards
            $("#opponent_health").text(opponent.health);
            $("#player_health").text(player.health);
            $("#message").text(opponent.name + " took " + playerDam + " damage. " + player.name + " took " + opponentDam + " damage.");
            turnCount++;
        }
        
            // if opponent damage is 0 or less
        if (player.health > 0 && opponent.health <= 0) {
            $("#message").text(opponent.name + " has been defeated.  Now choose your next opponent.");
            listOfDead.push(opponent.name)
            if (listOfDead.length === 3 ) {
                $("#message").text("Game Over ... You have defeated all opponents!!");
            }
            //clear the opponent object
            opponent = {};
            gameOn = false;
            turnCount = 0;

        // if your health drops below 0
        } else if (player.health <= 0 && opponent.health > 0) {
            $("#message").text("you have been defeated");
        }
    }
    
});

// when you click on RESET:
$("#reset").click(function() {

    // clear variables
    player = {};
    opponent = {};       
    gameOn = false;
    listOfDead = [];

    // clear player card divs
    $(".player_card").empty();
    $(".character_img").css("filter", "grayscale(100%)");
    $("#message").text("Choose a character");
});