var gifs = ["Brony", "Friendship is Magic", "Rainbow Dash", "Apple Jack", "Fluttershy", "Twilight Sparkle", "Rarity", "Pinky Pie", "Spike"];
var offset = 0;

function getGifs() {

    var gif = $(this).attr("data-name") + " MLP pony";
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=GzoVeDvYCNZarmkXUSYjvQGOohzUCU2c&q=" + gif + "&limit=25&offset=" + offset + "&rating=G&lang=en";

    // Creates AJAX call for the specific button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);


        for (var j = 0; j < response.data.length; j++) {
            var gifURL = response.data[j].images.fixed_height_small.mp4;
            var newGif = $("<video loop class='video'>");
            newGif.attr("src", gifURL);
            $("#gif-box").append(newGif);
        }
    });

}
//creates the buttons 
function renderButtons() {

    $("#buttons-view").empty();
    // Looping through the array of gifs and creating buttons for each item in the array
    for (var i = 0; i < gifs.length; i++) {

        var btn = $("<button class='btn btn-sm btn-danger'>");
        btn.addClass("gif");
        btn.attr("data-name", gifs[i]);
        btn.text(gifs[i]);
        $("#buttons-view").append(btn);
    }
}

// Adds your search term to the gif array and calls renderButtons
$("#add-gif").on("click", function (event) {
    event.preventDefault();
    var gif = $("#gif-input").val().trim();
    if (gif != "") {
        gifs.push(gif);
    }
    $("#gif-input").val("");
    renderButtons();

});

// Makes all of the buttons call getGifs on click
$(document).on("click", ".gif", function () {
    $("#gif-box").empty();
});
$(document).on("click", ".gif", getGifs);
$(document).on("click", ".video", function () {
    if (this.paused === false) {
        this.pause();
    } else {
        this.play();
    }
});


// Calling the renderButtons function to display the intial buttons
renderButtons();

//infinite scroll
$(window).scroll(function () {
    if ($(window).scrollTop() >= $(document).height() - $(window).height() - 10) {
        offset += 25;
        getGifs();
    }
});