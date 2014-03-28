var PRECIOSA_CLIENT_VERSION = 'huayra_v0.2.3';

var get_token = function() {
    if ('preciosa_token' in localStorage) {
        return localStorage.preciosa_token;
    }

    var fs = require("fs");
    var device_uuid = fs.readFileSync('/etc/hw_id', {encoding: 'ASCII'});

    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: BASE_API_URL + "/auth/registro",
        async: false,
        data: {uuid: device_uuid,
               nombre: 'conectar_igualdad',
               plataforma: 'node-webkit',
               phonegap: process.versions['node'],
               plataforma_version: process.versions['node-webkit'],
               preciosa_version: PRECIOSA_CLIENT_VERSION,
            },
        error: function(response) {
            console.log("error obteniendo token" + response);
            alert('Ha ocurrido un problema iniciando Preciosa. ' +
                  'Por favor vuelva a intentarlo en unos minutos.');
            return false;
        },
        success: function(response) {
            localStorage.preciosa_token = response.token;
        }
    });
    // TO DO: esto huele a mierda bloqueante. Preguntarle a
    // alguien que sepa cómo se hace bien.
    while (!'preciosa_token' in localStorage){
        return get_token();
        console.log(1);
    }
    return localStorage.preciosa_token;
}
