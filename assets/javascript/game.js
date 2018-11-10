$(document).ready(function () {

    var topics = ["Michael Jordan ", " Lebron James", "Tim Duncan ",];

    function buttonValue(newTopics) {
        $('#gif-area').empty()
        if (newTopics) topics.push(newTopics)
        for (var i = 0; i < topics.length; i++) {
            var btn = $('<button>');
            btn.text(topics[i]);
            $('#gif-area').append(btn);
            
        };
    };
    $('#find-gif').on('click', function (event) {
        event.preventDefault()
        
        buttonValue($("#gif-input").val());
    });

    buttonValue();

    function gifDisplay() {
        $('#gif-area').on('click','button', function () {
            $('#gif-images').empty();
            var player = $(this).text();
            
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + player + "&api_key=0F7kM8j122ZTEFyLWddU7a1bSCGqW6hG&tag&limit=10";
            console.log(queryURL);                                           

        $.ajax({
            url: queryURL,
            method: "GET"
            })
            .then(function(response){
            var results = response.data;
            for (var j = 0; j < results.length; j++) {
                var stillImage = results[j].images.fixed_height_small_still.url;
                var movingImage = results[j].images.fixed_height_small.url;
                var newDiv = $('<div>'); 
                
                var rating = results[j].rating;
                var print = $('<p>').text('Rating: ' + rating);
                var playerImage = $('<img>');
                playerImage.attr('data-still', stillImage);
                playerImage.attr('data-moving', movingImage);
                playerImage.attr('data-state', 'movingImage');
                playerImage.addClass('gifImages');
                playerImage.attr('src', movingImage);
                newDiv.prepend(print);
                newDiv.append(playerImage);

                $('#gif-images').append(newDiv)
            }
        
            });
        });
    };
    gifDisplay();
   
     $('#gif-images').on('click', '.gifImages', function(){
         console.log('clicked',$(this));
         var stillImage = $(this)[0].dataset.still;
         var movingImage = $(this)[0].dataset.moving;
         var stateImage = $(this)[0].dataset.state;
         var child = $(this).eq(0); 
        
         console.log(child);
         if (stateImage === 'movingImage'){
             console.log(stateImage);
            $(this).eq(0).attr('src', stillImage);
            $(this).eq(0).attr('data-state', 'stillImage');
         } 
         
         else {
            $(this).eq(0).attr('src', movingImage);
            $(this).eq(0).attr('data-state', 'movingImage');
         }
     })
});


