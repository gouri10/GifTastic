var animals = ["cat", "dog", "rabbit"];

// Function for displaying animal data
function showAnimalButtons() {

    // Deleting the animals prior to adding new animals to avoid repeatition
    $("#animalButtonsDiv").empty();

    // Looping through the array of animals
    for (var i = 0; i < animals.length; i++) {

        // Then dynamicaly generating buttons for each animal in the array
        var a = $("<button>");
        // Adding a class of animal-btn to our button
        a.addClass("btn btn-info animal-btn");
        // Adding a data-attribute
        a.attr("data-animal", animals[i]);
        // Providing the initial button text
        a.text(animals[i]);
        // Adding the button to the buttons-view div
        $("#animalButtonsDiv").append(a);
    }
}

// This function handles events when a animal button is clicked
$("#add-animal").on("click", function (event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var animal = $("#animal-input").val().trim();

    // Adding animal from the textbox to our array
    animals.push(animal);
    $("#animal-input").val("");

    // Calling renderButtons which handles the processing of our animal array
    showAnimalButtons();
    
});

// callAnimalGifs function re-renders the HTML to display the appropriate content
function callAnimalGifs() {

    var animal = $(this).attr("data-animal");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&q=" + animal + "&limit=10";
    console.log(queryURL);

    // Creating an AJAX call for the specific animal button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        $("#animals-view").empty();
        console.log(response);

        for (var i = 0; i < 10; i++) {

            // Creating a div to hold the animal
            var animalDiv = $("<div class='animal'>");
            animalDiv.addClass("float-left");

            // Retrieving the URL for the image
            var imgURL = response.data[i].images.fixed_height.url;
            var stillURL=imgURL.substring(0, imgURL.length-4) + "_s" + imgURL.substring(imgURL.length-4);
            var animateURL=imgURL;

            // Creating an element to hold the image
            var image = $("<img>").attr("src", stillURL);
            image.attr("data-still",stillURL);
            image.attr("data-animate",animateURL);
            image.attr("data-state","still");
            image.addClass("gif");

            // Storing the rating data
            var rating = response.data[i].rating;

            // Creating an element to have the rating displayed
            var pRating = $("<p>").text("Rating: " + rating);
            //pRating.addClass("float-left");
            
            // Appending the image
            animalDiv.append(image);

            // Displaying the rating
            animalDiv.append(pRating);

            // Putting the entire animal above the previous animals
            $("#animals-view").prepend(animalDiv);

        }
    });

}


// Adding a click event listener to all elements with a class of "animal-btn"
$(document).on("click", ".animal-btn", callAnimalGifs);

$(document).on("click", ".gif", gifMoves);

showAnimalButtons();


function gifMoves() {    
    var state=$(this).attr("data-state");

    if(state==="still"){
      var animateURL=$(this).attr("data-animate");
      $(this).attr("src",animateURL);
      $(this).attr("data-state","");
    }
    else{
      var stillURL=$(this).attr("data-still");
      $(this).attr("src",stillURL);
      $(this).attr("data-state","still");
    }
  }

