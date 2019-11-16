// Initial array of shows
let shows = ["The Simpsons", "Goof Troop", "Recess", "Family Guy"];

// displayshowInfo function re-renders the HTML to display the appropriate content
function displayshowInfo() {

    let show = $(this).attr("data-name");
    let queryURL = "http://api.giphy.com/v1/gifs/search?q=" + show + "&api_key=Sv0SeDYZbD5lxOomIfNUVMxG8xW8nxub&limit=10";

    // Creating an AJAX call for the specific show button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {


     //<table>
      //<tr><td>1</td><td>2</td><td>3</td><tr>  i<=2
          //<tr><td>4</td><td>5</td><td>6</td><tr> i>2 and  i <=5
              //<tr><td>7</td><td>8</td><td>9</td><td>10</td> <tr> i >5

     //</table>

        let giphyArray = response.data
      

  
       

        for (let i = 0; i < giphyArray.length; i++) {
            let rating = giphyArray[i].rating;


            let animate = giphyArray[i].images.original.url


            let p = $("<p>").text("rating " + rating)

            let image =$("<img>").attr("src",animate).attr("style","width:500px;height:500px")

              
            $("#"+i).append(p,image)
            
               


        }


         
    });

}

// Function for displaying show data
function renderButtons() {

    // Deleting the shows prior to adding new shows
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of shows
    for (let i = 0; i < shows.length; i++) {

        // Then dynamicaly generating buttons for each show in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        let a = $("<button>");
        // Adding a class of show-btn to our button
        a.addClass("show-btn");
        // Adding a data-attribute
        a.attr("data-name", shows[i]);
        // Providing the initial button text
        a.text(shows[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(a);
    }
}

// This function handles events where a show button is clicked
$("#add-show").on("click", function (event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    let show = $("#show-input").val().trim();

    // Adding show from the textbox to our array
    shows.push(show);

    // Calling renderButtons which handles the processing of our show array
    renderButtons();
});

// Adding a click event listener to all elements with a class of "show-btn"
$(document).on("click", ".show-btn", displayshowInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();