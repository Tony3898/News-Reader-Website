$("document").ready(function () {

    $.ajax({
        url: 'https://newsapi.org/v2/top-headlines?country=in&apiKey=6f935b27a3fa4a20b9a52aeef6f07add',
        success: function (response) {
            //console.log(response);
            var k = 0;
            for (i = 0; i < 10; i++) {
                //console.log((response.articles[i].content));
                if (response.articles[i].urlToImage == null || response.articles[i].title == null || response.articles[i].content == null) {
                    i++;
                } else {
                    $($(".card-img-top").children().prevObject[k]).attr("src", response.articles[k].urlToImage);
                    $($(".card-title").children().prevObject[k]).text(response.articles[k].title);
                    $($(".card-text").children().prevObject[k]).text(response.articles[k].content);
                    $($(".btn").children().prevObject[k]).attr("href", response.articles[k].url);
                    k++;
                }
            }
        },
    });
    catshow("world");

    $("#search").click(
        function () {
            $("#nav").toggleClass("active").toggleClass("notactive");
            $("#search-box").toggleClass("active").toggleClass("notactive");
        });
    $("#search-box-close").click(
        function () {
            $("#nav").toggleClass("active").toggleClass("notactive");
            $("#search-box").toggleClass("active").toggleClass("notactive");
        });

    $("#search-query").on('keypress', function (e) {
        if (e.which === 13) {
            /*alert($(this).val());
            catshow($(this).val());*/
            window.location.href = "search.html?q=" + encodeURIComponent($(this).val());
        }
    });
});

$(".newsbuttons button").click(function () {

    $("#newsul li").remove();
    catshow($(this).attr('value'));
});

function catshow(cat) {

    $.ajax({
        url: 'https://newsapi.org/v2/everything?q=' + cat + '&apiKey=6f935b27a3fa4a20b9a52aeef6f07add',
        success: function (response) {
            //console.log(response);
            var k = 0;
            for (i = 0; i < response.articles.length; i++) {
                //console.log((response.articles[i].title));
                if (response.articles[i].urlToImage == null || response.articles[i].title == null || response.articles[i].content == null) {
                    i++;
                } else {
                    $("#newsul").append("<li class='media'><img class='mr-3 news-image'><div class=\"media-body news-point-container-content\"><h5 class=\"mt-0 mb-1 \"><a class='news-title'></a></h5><p class=\"news-content\"></p>\</div></li>");
                    $($(".news-image").children().prevObject[k]).attr("src", response.articles[k].urlToImage);
                    $($(".news-title").children().prevObject[k]).text(response.articles[k].title).attr("href", response.articles[k].url)
                    $($(".news-content").children().prevObject[k]).text(response.articles[k].content);
                    k++;
                }
            }
            //$("#newsul li:last-child").remove();
        },
    });

}


