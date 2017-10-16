<%@ page contentType="text/html;charset=UTF-8" language="java" isELIgnored="false" pageEncoding="UTF-8" %>
<%@include file="/WEB-INF/base-page/header.jsp" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Type" content="text/html; UTF-8">
    <title>留言</title>
    <meta name="keywords" content="留言板">
    <meta name="description" content="留言板">
    <link href="<%=static_file_path%>css/common.css" rel="stylesheet">
    <link href="<%=static_file_path%>css/base.css" rel="stylesheet">
    <link href="<%=static_file_path%>css/book.css" rel="stylesheet">
    <link type="text/css" rel="stylesheet" href="<%=static_file_path%>css/embed.default.css">
    <!--[if lt IE 9]><script src="<%=static_file_path%>js/modernizr.js"></script><![endif]-->
    <script type="text/javascript" src="<%=static_file_path%>js/common.js"></script>
    <script type="text/javascript" src="<%=static_file_path%>js/common/jquery.pagination.js"></script>
    <script type="text/javascript" src="<%=static_file_path%>js/common/paginationBar.js"></script>
    <script type="text/javascript" src="<%=static_file_path%>js/entity/pageable.js"></script>
    <script type="text/javascript" src="<%=static_file_path%>js/entity/leave-message.js"></script>
    <script type="text/javascript" src="<%=static_file_path%>js/entity/leave-message-title.js"></script>
    <%--login--%>
    <link href="<%=static_file_path%>component/login/login.css" rel="stylesheet">
</head>
<body>
<header>
    <%@include file="/static/component/navbar/navbar.jsp" %>
</header>
<article class="aboutcon">
    <%@include file="/WEB-INF/base-page/headerTab.jsp" %>
    <div class="book left">
        <!-- Duoshuo Comment BEGIN -->
        <!-- 多说评论框 start -->
        <div class="ds-thread" id="ds-thread">
            <div id="ds-reset">
                <div class="ds-meta" style="display: none;">
                    <a href="javascript:void(0)" class="ds-like-thread-button ds-rounded">
                        <span class="ds-icon ds-icon-heart"></span>
                        <span class="ds-thread-like-text">喜欢</span>
                        <span class="ds-thread-cancel-like">取消喜欢</span>
                    </a>
                    <span class="ds-like-panel">
                      <span class="ds-highlight">103</span>人喜欢
                    </span>
                </div>
                <div class="ds-rounded" id="ds-hot-posts">
                    <div class="ds-header ds-gradient-bg">被顶起来的评论</div>
                    <ul id="mostLikeCountLeaveMessage"></ul>
                </div>
                <!-- 留言列表title -->
                <%@include file="/static/component/leave-message/book-leave-message.jsp"%>
                <div class="ds-login-buttons"><p>社交帐号登录:</p>
                    <div class="ds-social-links">
                        <ul class="ds-service-list">
                            <li>
                                <a href="#" rel="nofollow"
                                   class="ds-service-link ds-weixin">微信</a>
                            </li>
                            <li>
                                <a href="#" rel="nofollow"
                                   class="ds-service-link ds-weibo">微博</a>
                            </li>
                            <li>
                                <a href="#" rel="nofollow"
                                   class="ds-service-link ds-qq">QQ</a>
                            </li>
                            <li>
                                <a href="http://yangqq.duoshuo.com/login/renren/" rel="nofollow"
                                   class="ds-service-link ds-renren">人人</a>
                            </li>
                            <li>
                                <a class="ds-more-services" href="javascript:void(0)">更多&#187;</a>
                            </li>
                        </ul>
                        <ul class="ds-service-list ds-additional-services">
                            <li>
                                <a href="#" rel="nofollow"
                                   class="ds-service-link ds-douban">豆瓣</a>
                            </li>
                            <li>
                                <a href="#" rel="nofollow"
                                   class="ds-service-link ds-kaixin">开心</a>
                            </li>
                            <li>
                                <a href="#" rel="nofollow"
                                   class="ds-service-link ds-baidu">百度</a>
                            </li>
                            <li>
                                <a href="#" rel="nofollow"
                                   class="ds-service-link ds-google">谷歌</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="ds-replybox">
                    <a class="ds-avatar" href="javascript:void(0);" onclick="return false">
                        <img src="<%=static_file_path%>images/39630.jpg" alt="">
                    </a>
                    <div class="ds-textarea-wrapper ds-rounded-top">
                        <textarea id="replyContent" name="message" title="Ctrl+Enter快捷提交" placeholder="说点什么吧…"></textarea>
                        <pre class="ds-hidden-text"></pre>
                    </div>
                    <div class="ds-post-toolbar">
                        <div class="ds-post-options ds-gradient-bg">
                            <span class="ds-sync"></span>
                        </div>
                        <button onclick="publishLeaveMessage();" class="ds-post-button" type="button">发布</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <aside class="right">
        <div class="about_c">
            <p>网名：<span id="nickname"></span></p>
            <p>姓名：<span id="name"></span></p>
            <p>生日：<span id="birthday"></span></p>
            <p>籍贯：<span id="native_place"></span></p>
            <p>现居：<span id="address"></span></p>
            <p>职业：<span id="occupation"></span></p>
            <p>喜欢的书：<span id="like_books"></span></p>
            <p>喜欢的音乐：<span id="like_musics"></span></p>
            <a target="_blank"
               href="http://wp.qq.com/wpa/qunwpa?idkey=d4d4a26952d46d564ee5bf7782743a70d5a8c405f4f9a33a60b0eec380743c64">
                <img src="http://pub.idqqimg.com/wpa/images/group.png" alt="" title=""></a>
            <a target="_blank"
               href="http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&amp;email=HHh9cn95b3F1cHVye1xtbTJ-c3E">
                <img src="http://rescdn.qqmail.com/zh_CN/htmledition/images/function/qm_open/ico_mailme_22.png" alt="">
            </a>
        </div>
    </aside>
</article>
<%@include file="/static/component/login/login.jsp"%>
<footer>
    <p>
        Design by DanceSmile
        <a href="http://www.miitbeian.gov.cn/" target="_blank">蜀ICP备11002373号-1</a>
    </p>
</footer>
<script type="text/javascript" src="/static/component/user-introduction/user-introduction.js"></script>
<script type="text/javascript" src="<%=static_file_path%>js/book.js"></script>
<script type="text/javascript" src="<%=static_file_path%>component/login/login.js"></script>
</body>
</html>
