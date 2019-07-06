
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
        $("#directions").text("now, choose your opponent");

    // if player is selected, but opponent is not, assign id to "opponent", .
    } else if (player.name && !opponent.name) {

        // if it is not the same as player:
        if (character[$(this).attr("id")].name !== player.name) {

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
            $("#directions").text("Click START to begin the battle");
        }
    } 
});

// when you click on START:
$("#start").click(function() {
    if (player && opponent) {
        gameOn = true;
        $("#directions").text("The battle has begun.  Now Attack!");
    }
});

// when you click on ATTACK:
$("#attack").click(function() {
    if (gameOn === true && opponent.health > 0 && player.health > 0) {
        
        // modify player/opponent health
        let opponentDam = calcDamage(player) * turnCount;
        let playerDam  = calcDamage(opponent);
        
        opponent.health -= opponentDam;
        player.health -= playerDam;

        $("#opponent_health").text(opponent.health);
        $("#player_health").text(player.health);
        $("#directions").text(opponent.name + " took " + playerDam + " damage. " + player.name + " took " + opponentDam + " damage.");
        turnCount++;
    }
});

// when you click on RESET:
$("#reset").click(function() {

    //
    player = {};
    opponent = {};
    gameOn = false;
    $(".player_card").empty();
    $(".character_img").css("filter", "grayscale(100%)");
    $("#directions").text("Choose your character");
});