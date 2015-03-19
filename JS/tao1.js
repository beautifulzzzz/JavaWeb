﻿/// <reference path="../../javascript/js基础/scripts/jquery-1.10.2.js" />

/**
  不知道为什么页面加载完成时还读不到div_digg。可能也是动态生成的。
  所以这里只能用定时器 不断的读取，当读取到了再给它动态添加快捷按钮
**/

//自定义 定时器[当元素加载完成是执行回调函数]
function customTimer(inpId, fn) {
    if ($(inpId).length) {
        fn();
    }
    else {
        var intervalId = setInterval(function () {
            if ($(inpId).length) {  //如果存在了
                clearInterval(intervalId);  // 则关闭定时器
                customTimer(inpId, fn);              //执行自身
            }
        }, 100);
    }
}

//读取 标签
function gettag() {
    $.ajax({
        type: "get",
        dataType: 'html',
        url: "http://www.cnblogs.com/zjutlitao/tag/",
        data: {},
        beforeSend: function (XMLHttpRequest) {//当一个Ajax请求开始时触发。
        },
        complete: function (jqXHR, status, responseText) {//请求完成时触发这个事件
        },
        success: function (data) {
            //设置宽度一致
            $(".select_list_tag").css("width", $(".text_select_tag").css("width"));
            $(".hidden_tag").val("");
            var a = $(data).find("#MyTag1_dtTagList td a");
            var span = $(data).find("#MyTag1_dtTagList td span.small");
            for (var i = 0; i < a.length; i++) {
                var tagc = "";
                if (i % 3 == 0)
                    tagc = "tagc1";
                else if (i % 2 == 0)
                    tagc = "tagc2";
                else
                    tagc = "tagc5";

                var html_a = "<a href='http://www.cnblogs.com/zjutlitao/tag/" + a[i].innerHTML + "/' \
                                 class='" + tagc + "'\
                                 title='" + a[i].innerHTML + "'>" +
                                 a[i].innerHTML + span[i].innerHTML +
                              "</a>\
                               </br>";
                $("#tagscloud").append(html_a);
                $(".hidden_tag").append(a[i].innerHTML + "&");
            }
            yuntagF();
            get_list_tag();
        },
        error: function (msg) {
            try {
                var a = $(data).find("#MyTag1_dtTagList td a");
                var span = $(data).find("#MyTag1_dtTagList td span.small");
                for (var i = 0; i < a.length; i++) {
                    var tagc = "";
                    if (i % 3 == 0)
                        tagc = "tagc1";
                    else if (i % 2 == 0)
                        tagc = "tagc2";
                    else
                        tagc = "tagc5";

                    var html_a = "<a href='http://www.cnblogs.com/zjutlitao/tag/" + a[i].innerHTML + "/' \
                                 class='" + tagc + "'\
                                 title='" + a[i].innerHTML + "'>" +
                                     a[i].innerHTML + span[i].innerHTML +
                                  "</a>\
                               </br>";
                    $("#tagscloud").append(html_a);
                }
                yuntagF();
                get_list_tag();
            } catch (e) { }
        }
    });
}

//标签 搜索 自动补全 
function get_list_tag() {
    if (!$(".hidden_tag").text()) return;
    $("#get_list_tag_text").html("");
    var list_tag = $(".hidden_tag").text().split("&");
    for (var i = 0; i < list_tag.length; i++) {
        var html_select = "<option value='" + list_tag[i] + "'>" + list_tag[i] + "</option>";
        $("#get_list_tag_text").append(html_select);
    }
}

function set_tag_a_value() {
    $(".a_open_tag").attr("href", "http://www.cnblogs.com/zjutlitao/tag/" + $(".text_select_tag").val() + "/");
}

//回车搜索标签
function open_Search(e) {
    var ev = e || window.event;
    if (ev.keyCode == 13 && $(".a_open_tag").attr("href") != "#") {//13  回车        
        //window.location.href = $(".a_open_tag").attr("href");
        document.getElementById("a_open_tag").click();
    }
}

//必应搜索框的值改变时
function up_bing_Search() {
    $(".a_bing_Search").attr("href", "http://cn.bing.com/search?q=" + $(".text_bing_Search").val() + "+site:cnblogs.com/zjutlitao");
}
//回车搜索
function keyup_bing_Search(e) {
    var ev = e || window.event;
    if (ev.keyCode == 13 && $(".a_bing_Search").attr("href") != "#") {//13  回车       
        $(".span_bing_Search").click();
        // window.open($(".a_bing_Search").attr("href"), 'newwindow', 'width=' + (window.screen.availWidth - 10) + ',height=' + (window.screen.availHeight - 30) + ',top=0,left=0,resizable=yes,status=yes,menubar=no,scrollbars=yes')
    }
}

//标签搜索 框
function addDiv_selestTag() {
    $("#widget_my_google").hide();//隐藏谷歌搜索
    var html = "<div class='div_my_zzk'>\
                    <input class='text_bing_Search' type='text' value='' onkeyup='keyup_bing_Search();' oninput='up_bing_Search();' />\
                    <a href='#' class='a_bing_Search' target='_blank'><span class='span_bing_Search'>必应搜索</span></a>\
                </div>\
                <div class='div_select_tag div_my_zzk'>\
                    <input class='text_select_tag' type='text' value='' list='get_list_tag_text' onkeyup='open_Search();' oninput='set_tag_a_value();' />\
                    <a href='#' class='a_open_tag' id='a_open_tag' target='_blank'>打开标签</a>\
                    <datalist id='get_list_tag_text'></datalist>\
                    <input type='hidden' class='hidden_tag' />\
                </div>";
    $(".mySearch").append(html);
}

//获取 滚动条距离浏览器顶部的高度
function getScrollTop() {
    var scrollTop = 0;
    if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop;
    } else if (document.body) {
        scrollTop = document.body.scrollTop;
    }
    return scrollTop;
}

function animation()
{
    $("#mainContent .day").each(function () {
        $(this).css("-webkit-transform", "rotateZ(360deg)").css("-webkit-transition", "all 0.6s ease-out");
    });
}

//加载友情链接
//function loadfooter() {
//    var html_str = "";
//    html_str += "<div>友情链接：\
//                        <a href=\"http://www.jeezweb.com\" target=\"_blank\">jeezweb</a>\
//                        <a href=\"http://www.shuaibi.org\" target=\"_blank\">shuaibi</a>\
//                        </div>";
//    html_str += "<span id=\"cnzz_stat_icon_1254486480\"></span>";
//    $("#footer").append(html_str);
//}

//页面加载完成是执行
$(function () {
    //添加 关注  顶部  评论  区
    customTimer("#div_digg", function () {
        var div_html = "<div class=''>\
                        <a href='javascript:void(0);' onclick='c_follow();'>关注</a>\
                         &nbsp;|&nbsp;\
                        <a href='#top'>顶部</a>\
                         &nbsp;|&nbsp;\
                        <a href='javascript:void(0);' onclick=\" $('#tbCommentBody').focus();\">评论</a>\
                   </div>";
        $("#div_digg").append(div_html);
        //tbCommentBody    
    });
    //添加 评论区的 形象照
//    customTimer(".blog_comment_body", function () {
//        var spen_html = "<span class='bot' ></span>\
//                         <span class='top'></span>";
//        $(".blog_comment_body").append(spen_html);
//
//        $(".blog_comment_body").before("<div class='body_right' style='float:left;height:80px'></br><a target='_blank'><img  /></a></div>");
//        var feedbackCon = $(".feedbackCon");
//        for (var i = 0; i < feedbackCon.length; i++) {
//            var span = $(feedbackCon[i]).find("span:last")[0].innerHTML || "http://pic.cnitblog.com/face/sample_face.gif";
//            $(feedbackCon[i]).find(".body_right img").attr("src", span);
//            var href = $(feedbackCon[i]).parent().find(".comment_date").next().attr("href");
//            $(feedbackCon[i]).find(".body_right a").attr("href", href);
//
//        }
//    });
    //读取 标签
    customTimer("#tagscloud", gettag);
    //标签搜索 框
    customTimer(".mySearch", addDiv_selestTag);
    //加载友情链接
    //customTimer("#footer", loadfooter);

    // 页面滚动条事件
    window.onscroll = function () {
        if (getScrollTop() >= 250)
            $("#tagscloud").hide(500);
        else
            $("#tagscloud").show();

        if (getScrollTop() >= 450)
            $("#div_github").hide(500);//.css("display", "none");
        else
            $("#div_github").show(100);// .css("display", "block");

        if (getScrollTop() >= 1658)
            $("#div_digg").fadeIn(600);
        else
            $("#div_digg").hide(300);

        try {
            console.log(getScrollTop());
        } catch (e) { }

    }

    //隐藏订阅的图片
    $("#MyLinks1_XMLLink").hide();
    //添加留言板
    $("#navList").append("<li>\
                           <a id='' class='menu' href='http://www.cnblogs.com/zjutlitao/articles/4213784.html'>留言</a>\
                           <a id='' class='menu' href='http://www.cnblogs.com/zjutlitao/articles/4225735.html'>关于</a>\
                          </li>");

    animation();
});


//$("body,html").animate({ scrollTop: 0 }, 150);