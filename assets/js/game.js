
let character = {
    
    ash: {
        name: "Ash",
        health: 100,
        attack: 100,
        counter: 100,
        icon: "ash_icon.png"
    },
    pikachu: {
        name: "Pikachu",
        health: 100,
        attack: 100,
        counter: 100,
        icon: "pikachu_icon.jpg"
    },
    bulbasaur: {
        name: "Bulbasaur",
        health: 100,
        attack: 100,
        counter: 100,
        icon: "bulbasaur_icon.jpg"
    },
    charizard: {
        name: "Charizard",
        health: 100,
        attack: 100,
        counter: 100,
        icon: "charizard_icon.jpg"
    }
}

let player;
let opponent;
let gameOn = false;


// When you click on a character:
$(".character_img").click(function() {
// If player isnt selected, asign the id to "player", change image to color 
    if (!player && gameOn === false) {
        player = ($(this).attr("id"));
        $("#" + player).css("filter", "grayscale(0%)");
        // Insert current player info into div
        $("#player_name").text(character[player].name);
        $("#player_image").html("<img src='assets/media/" + character[player].icon + "'></img>");
        $("#player_health").text(character[player].health);

// if player is selected, but not opponent, assign id to "opponent", change image to color.
    } else if (player && !opponent && gameOn === false) {
        if ($(this).attr("id") !== player)
            opponent = ($(this).attr("id"));
        $("#" + opponent).css("filter", "grayscale(0%)");
        // Insert current opponent info into div
        $("#opponent_name").text(character[opponent].name);
        $("#opponent_image").html("<img src='assets/media/" + character[opponent].icon + "'></img>");
        $("#opponent_health").text(character[opponent].health);
    } 
});

$("#start").click(function() {
    if (player && opponent) {
        gameOn = true;
         
    }
    

})

$("#attack").click(function() {
    
    alert("begin")

})

$("#reset").click(function() {
    $("#" + player).css("filter", "grayscale(100%)");
    $("#" + opponent).css("filter", "grayscale(100%)");
    player = undefined;
    opponent = undefined;
    $(".player_card").empty();
})