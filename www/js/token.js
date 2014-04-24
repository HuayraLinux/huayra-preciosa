var PRECIOSA_CLIENT_VERSION = 'huayra_v0.2.3';

var get_uuid = function() {
    var fs = require("fs");
    var cfg_path = process.env.HOME + '/.preciosa';

    if (!fs.exists(cfg_path)) {
        var exec = require('child_process').exec;
        exec('uuidgen > ' + cfg_path)
    }

    return fs.readFileSync(cfg_path, {encoding: 'ASCII'});
}

var get_token = function() {
    if ('preciosa_token' in localStorage) {
        return localStorage.preciosa_token;
    }

    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: BASE_API_URL + "/auth/registro",
        async: false,
        data: {uuid: get_uuid(),
               nombre: 'conectar_igualdad',
               plataforma: 'node-webkit',
               phonegap: process.versions['node'],
               plataforma_version: process.versions['node-webkit'],
               preciosa_version: PRECIOSA_CLIENT_VERSION,
            },
        error: function(response) {
            console.log("error obteniendo token" + response);
            window.location = '#sin_internet';
            return false;
        },
        success: function(response) {
            localStorage.preciosa_token = response.token;
        }
    });
    while (!'preciosa_token' in localStorage){
        return get_token();
        console.log(1);
    }
    return localStorage.preciosa_token;
}
