function indexInit() {

    //头像设置
    var queryUrl = "/user/" + username + "/userinfo";
    var method = GET;
    var queryUserAvatarCallback = function (result) {
        if (result.success) {
            $("#avatar").style.background = "url(" + result.data.avatar + ")  no-repeat";
            $("#avatar").style.backgroundSize = "130px 130px";
            $("#nickname").innerText = result.data.nickname;
        }
        else {
            if (result.code == SERVER_INTERNAL_EXCEPTION_CODE) {
                alert("服务器内部异常");
            }
            else {
                alert(result.msg);
            }
        }
    }
    executeRequest(queryUrl, null, method, queryUserAvatarCallback);

    //推荐文章
    var queryUrl = "/article/recommendArticle";
    var param = {username: username};
    var method = POST;
    var queryRecommendCallback = function (result) {
        if (result.success) {
            var articleList = result.data;
            var div = $("#article_div");
            for (var i = 0; i < articleList.length; i++) {
                var item = new Article(articleList[i].id, articleList[i].createTime, articleList[i].content, articleList[i].keyworks, articleList[i].likeCount, articleList[i].readCount, articleList[i].summary, articleList[i].title, articleList[i].coverImage, articleList[i].owner);
                var html = item.getIndexRecommendHtmlContent();
                div.innerHTML = div.innerHTML + html;
            }
        }
        else {
            if (result.code == SERVER_INTERNAL_EXCEPTION_CODE) {
                alert("服务器内部异常");
            }
            else {
                alert(result.msg);
            }
        }
    };
    executeRequest(queryUrl, param, method, queryRecommendCallback);
    loadRecommendTemplateHorizontalList();
}
