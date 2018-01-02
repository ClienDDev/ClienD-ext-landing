$(document).ready(function(){
    if(location.href.indexOf('livereload') !== -1)
        $.getScript('http://localhost:35729/livereload.js');

    $('#index_carousel').carousel({
        interval: 10000
    });

    var counter = {
        reachGoal: function(){}
    };

    if(typeof yaCounter34344415 !== 'undefined')
        counter = yaCounter34344415;

    $('#chrome_web_store_button').click(function(){
        counter.reachGoal($(this).attr('id'));
    })
    if(typeof chrome === 'undefined' || typeof chrome.webstore === 'undefined' || typeof chrome.webstore.install === 'undefined'){
        $('.install_button').click(function(){
            if(confirm('Расширение не поддерживается этим браузером. Скачать Google Chrome?'))
                window.open('http://google.com/chrome');
        });
    }
    else{
        $('.install_button').click(function(){
            var $button = $(this);
            var first_button_html = $button.html();
            $button.attr('disabled', 'disabled');

            chrome.webstore.install($('meta[rel="chrome-webstore-item"]').attr('href'), function(res){
                counter.reachGoal('install');
                alert('Спасибо за установку расширения!');
                $button.removeAttr('disabled');
                $button.html(first_button_html);
            }, function(res){
                console.log(res);
                alert('Установка расширения не удалась. Попробуйте, пожалуйста, еще раз');
                $button.removeAttr('disabled');
            });
            chrome.webstore.onDownloadProgress.addListener(function(percentDownloaded){
                $button.html('<i class="fa fa-spin fa-spinner"></i> Установка ' + percentDownloaded + '%');
            });
        });
    }

    var $pages = $('#pages');
    var $menu = $('ul.nav');
    function hide_all(){
        $pages.children().hide();
    }
    hide_all();

    ['index', 'teacher', 'admin', 'faq'].forEach(function(route){
        Path.map("#" + route).to(function(){
            hide_all();
            $menu.children().removeClass('active');
            $menu.find('a[href="#'+route+'"]').parent().addClass('active');
            $pages.find('[data-page="' + route + '"]').show();
        });
    });

    Path.root("#index");
    Path.listen();
});