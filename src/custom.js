$(document).ready(function() {
    $("#tags").autocomplete({
        source: function(request, response) {

            var dataList = new Array();

            $.when($.ajax({
                url: "https://www.omdbapi.com/?s=" + request.term + "&apikey=7e02a31a",
                dataType: "jsonp",
                data: {
                    q: request.term
                },
                success: function(data) {

                }
            })).then(function(data, textStatus, jqXHR) {
                if (data.Search != undefined) {
                    var counter = 0;

                    for (var i = 0; i < data.Search.length; i++) {

                        var detailUri = "https://www.omdbapi.com/?i=" + data.Search[i].imdbID + "&apikey=7e02a31a";

                        $.when($.ajax({
                            url: detailUri,
                            dataType: "jsonp",
                            success: function(detailData) {
                                dataList.push(detailData);
                                counter++;
                                if (counter == data.Search.length) {
                                    response(dataList);
                                }

                            }
                        })).then(function(data, textStatus, jqXHR) {

                        });
                    }
                }
            })
        },

        minLength: 3

    }).data("ui-autocomplete")._renderItem = function(div, item) {
        return $("<div class='col-md-6 col-xs-12 col-sm-6 border-bottom display-movie'></div>")
            .data("item.autocomplete", item)
            .append("<div class='card edit-card'><div class='row no-gutters'><div class='col-auto'><img src='" + item.Poster + "' class='img-fluid' alt=''></div><div class='col'><div class='card-block px-2'><h4 class='card-title'>" + item.Title + " " + item.Year + "</h4><p class='card-text'><b class='imdb-rat-edit'><img src='./assets/images/stars.png' class='img-responsive'>" + item.imdbRating + "</b> / 10</p><br><p class='card-text'><b>Dil:</b>" + item.Language + "</p><p class='card-text'><b>Oyuncular:</b>" + item.Actors + "</p><br><p class='card-text'>" + item.Plot + "<a href='#'>Detaylar >></a></p></div></div></div></div>")
            .appendTo(".see-movie");
    };

    $("a").click(function() {
        $(".display-movie").removeClass("display-movie")
        $(this).remove();
        $(".daha-fazla").append("<a href='#top'>BAŞA DÖN</a>")

    });



});