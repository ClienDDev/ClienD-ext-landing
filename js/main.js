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

    if(typeof chrome === 'undefined' || typeof chrome.webstore === 'undefined' || typeof chrome.webstore.install === 'undefined'){
        $('.install_button').click(function(){
            if(confirm('Расширение не поддерживается этим браузером. Скачать Google Chrome?'))
                window.open('http://google.com/chrome');
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
