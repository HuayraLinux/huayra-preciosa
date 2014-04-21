$( document ).on( "mobileinit", function() {
    $.extend( $.mobile , {
        defaultPageTransition: 'slidefade',
    });

    $.mobile.loader.prototype.options.text = "Cargando ...";
    $.mobile.loader.prototype.options.textVisible = true;
    $.mobile.loader.prototype.options.textonly = false;
    $.mobile.loader.prototype.options.theme = "b";
    $.mobile.loader.prototype.options.html = "";
});

var chilpro = require('child_process');

$('.ayuda_visor').on('click', function(){
    var comando = '/usr/bin/huayra-visor-manual "articles/p/r/e/Preciosa.html"';
    chilpro.exec(comando);
    return false;
});
