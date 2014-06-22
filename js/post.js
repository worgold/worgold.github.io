$(document).ready(function(){

    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        }
        ,BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        }
        ,iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        }
        ,Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        }
        ,Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        }
        ,any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

    $('pre').addClass('prettyprint linenums'); //添加Google code Hight需要的class

    //***********************
    //**评论的代码也删掉哦***
    window.disqus_shortname = 'beiyuu'; // required: replace example with your forum shortname
    $('#disqus_container .comment').on('click',function(){
        $(this).html('加载中...');
        var that = this;
        $.getScript('http://' + disqus_shortname + '.disqus.com/embed.js',function(){$(that).remove()});
    });
    //**评论的代码也删掉哦***
    //***********************

    $('.entry a').each(function(index,element){
        var href = $(this).attr('href');
        if(href){
            if(href.indexOf('#') == 0){
            }else if ( href.indexOf('/') == 0 || href.toLowerCase().indexOf('beiyuu.com')>-1 ){
            }else if ($(element).has('img').length){
            }else{
                $(this).attr('target','_blank');
                $(this).addClass('external');
            }
        }
    });

    $.getScript('/js/prettify/prettify.js',function(){
        prettyPrint();
    });

    if(/\#comment/.test(location.hash)){
        $('#disqus_container .comment').trigger('click');
    }

    if(/css3-animation/.test(location.href)){
        $("head").append("<link rel='stylesheet' type='text/css' href='/css/css3-ani.css'/>");
        $.getScript('/js/css3-ani.js',function(){});
    }
});
