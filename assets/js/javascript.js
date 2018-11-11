$(document).ready(function(){

var topics= ["Chucky","Freddy Krueger","Jason Voorhees","Jigsaw","Michael Myers","Leather Face","Pyramid Head","Pennywise","Pinhead","Cujo"]

function initializeScreen(){
    $("#idButtonDiv").empty();
    for(var i=0; i<topics.length; i++){
        var newButton=$("<button>");
        newButton.attr("data-Name",topics[i]);
        newButton.addClass("clsButton");
        newButton.html(topics[i]);
        $("#idButtonDiv").prepend(newButton);
    }
    $("#idGiphysDiv").empty();
    loadGiphys(topics[topics.length-1]);

};

$("#idAdd").on("click", function() {

    event.preventDefault();
    if( $("#ShowInput").val() != '' ) {
      topics.push($("#ShowInput").val());
      $("#ShowInput").val("");
      initializeScreen();
    }
});


$("#idButtonDiv").on("click", ".clsButton", function(){

    $("#idGiphysDiv").empty();
    var topicName=$(this).attr("data-Name");
    console.log(topicName);
    loadGiphys(topicName);

});

function loadGiphys(Topic) {

    var urlQuery="https://api.giphy.com/v1/gifs/search?api_key=KiVEF6W3QTHfd9TNRHBloP3o0NqTMqas&q="+
    Topic +"&limit=10&offset=0&rating=R&lang=en";
    console.log(urlQuery);
    
    $.ajax({
        url: urlQuery,
        method: "GET"
    }).done(function(response) {
            var results = response.data;
            console.log(results);
            console.log(results.length);
            if( results.length>0 ){

                for(var i = 0; i < results.length; i++) {
                
                    var gifDiv = $("<div class='clsImgDiv'>");

                    var rating = results[i].rating;

                    var p = $("<p style='margin-bottom:0%'>").text("Rating: " + rating.toUpperCase());

                    var ShowImage = $("<img>");
                    ShowImage.addClass("clsImage");
                    ShowImage.attr("data-animated","false");
                    ShowImage.attr("data-url-non-animated",results[i].images.fixed_height_still.url);
                    ShowImage.attr("data-url-animated",results[i].images.fixed_height.url);
                    ShowImage.attr("src", results[i].images.fixed_height_still.url);
                    console.log(results[i]);
                    
                    gifDiv.prepend(p);
                    gifDiv.prepend(ShowImage);
                    

                    $("#idGiphysDiv").prepend(gifDiv);
                }
            }
    });

}

function mButton() {
    
    var addButton =$("<button>");
        addButton.html("Load More");
        addButton.addClass("moreBtn");
}

$("#idGiphysDiv").on("click",".clsImage",function() {

    var animatedState=$(this).attr("data-animated");
    var animatedURL=$(this).attr("data-url-animated");
    var nonanimatedURL=$(this).attr("data-url-non-animated");
    if( animatedState==="false") {
        $(this).attr("data-animated","true");
        $(this).attr("src",animatedURL);
    } else {
        $(this).attr("data-animated","false");
        $(this).attr("src",nonanimatedURL);
    }

});

initializeScreen();

});