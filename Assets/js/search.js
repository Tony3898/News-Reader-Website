$("document").ready(function () {
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
            window.location.href = "search.html?q=" + encodeURIComponent($(this).val());
        }
    });

    var queryString = [];
    $(function () {
        if(queryString.length === 0 && window.location.search.split('?').length>1)
        {
            var params = window.location.search.split('=')[1].replace("%20"," ");
            console.log(params);
            $.ajax({
                url: 'https://newsapi.org/v2/everything?q=' + params + '&apiKey=6f935b27a3fa4a20b9a52aeef6f07add',
                success: function (response) {
                    $("#newsul li").remove();
                    //console.log(response);
                    var k=0;
                    for (var i = 0; i <response.articles.length; i++) {
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
    });
});