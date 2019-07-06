
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

let player;
let opponent;
let gameOn = false;
let turnCount = 1;

// determines how much damage an attack yields
function calcDamage(playerUp) {
    let accuracy = Math.floor(Math.random() * Math.floor(100));
    let attackPower = character[playerUp].attack * accuracy;
    return attackPower;
}

// When you click on a character:
$(".character_img").click(function() {
// If player isnt selected, populate "player" object, change image to color
    if (!player && gameOn === false) {
        player = character[$(this).attr("id")];
        $(this).css("filter", "grayscale(0%)");
        // Insert current player info into div
        $("#player_name").text(player.name);
        $("#player_image").html("<img src='assets/media/" + player.icon + "'></img>");
        $("#player_health").text(player.health);

// if player is selected, but not opponent, assign id to "opponent", change image to color.
    } else if (player && !opponent && gameOn === false) {
        if (character[$(this).attr("id")] !== player) {
            opponent = character[$(this).attr("id")];
            $(this).css("filter", "grayscale(0%)");
            // Insert current opponent info into div
            $("#opponent_name").text(opponent.name);
            $("#opponent_image").html("<img src='assets/media/" + opponent.icon + "'></img>");
            $("#opponent_health").text(opponent.health);
        }
    } 
});

$("#start").click(function() {
    if (player && opponent) {
        gameOn = true;
    }
})

$("#attack").click(function() {
    if (gameOn === true && opponent.health > 0 && player.health > 0) {
        opponent.health -= player.attack;
        $("#opponent_health").text(opponent.health);
        player.health -= opponent.attack;
        $("#player_health").text(player.health);
    }
})

$("#reset").click(function() {
    $(".character_img").css("filter", "grayscale(100%)");
    player = undefined;
    opponent = undefined;
    gameOn = false;
    $(".player_card").empty();
})