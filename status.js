const request = require('request');

const URL = 'https://www.vfs-visa-services.com/lithuania-global-tracking/TrackingParam.aspx?p=156%2487%2427%24160%2472%24227%245%2488%2491%24242%24176%242%240%24243%2468%2435%24203%24106%2467%2424%24200%2440%2415%24250%24112%2489%2465%2469%2417%2433%24148%24171';




function getStatus({date, pasport}){
    return new Promise(res => {
        request.post(
            {
                url:URL, 
                form: {
                    'ctl00$CPH$txtTrackingId':pasport,
                    'ctl00$CPH$txtDOB$txtDate':date,
                    '__VIEWSTATE' : 'gmOKJFSekW+VFDJ2pj0H9Dn95jOSZtzbK7bfIJ7YH3s1BHvqUh/1teb/NNgPmdprBLgEY/LOhIWb+YWsPI/PLH019vx0dT46wE8FtGCnW+8bEaQuWsQOGgl2pxO8fUvy50tGK3FWK2QJ46lcim+iVLDm5aGMyf5j5G6E8wVAcO9fqbgVRuN3p/b4nk5C/TYiZGOOAjq4lb9ePKkv9kx2E7FoSSsz6E2lZusquZ6OAo9B1Ye9haMY2PDKVOtdvbiEzSP3+0GsaHBdanQ/EcAsEfYG40nnIktx1A48wMr6Gi+XHvvJ6ckgHd74D8InurVZy6YAIJ9/ShFWCFr40jLkBD+axUL1Zmaw2IXLnh5SeSMXRWKosFJddDTX6BkLUDJXCJLVTgprjnlCFNzKOSNTW3rcQZ75mAPF1hvVOZbPNPJ0nlXRkQmKnSUqbRRJEIB28CJ1xK0R1CdcSdEdjKXT+8q2hGodAGLfCzwtqNXmaJCT9h8mD43nqdHambqyETOXs8whFinOrhQqgT7TfK1odq+KDytxdDa0whVDeDHaO2/wRnvHhGbRHpKpfEM49l6lTKc0ZLo6yjiimOgqsIS4/+KvS1wGMWUeh5jYmhu7jAwnvEZ0i3s/C8TMmtdGr0t2x+blLU99TXyzJuGnwr3AGZiG5G6OYW0YzD76k3dwovUGeenY39X6uyrWx5sR6iQvwVOXG0etBeplDhRtzRbSS7KKZqBzfdAfzA3Uo+Dpc/bKUH9kIjyQ6/3MxOVsh/hRs1bldpayLAxzqkCURl6m09ugW5Y=',
                    '__VIEWSTATEGENERATOR' : '624CA50B',
                    '__EVENTVALIDATION' : 'f2pmkJ3dWA+H6WT6KjKUmj1ZtY9HVtF0Fxb0fdM5WKbxQMZI+TMCqt1zwhMwKNCfC+MCmgl1jECftMYxVIV0xI0B/p/7EalgV9WyG8twf+5Uyt7xTqsnn74TrJ/3oW/3/0QK4/QooPKnTSPTDUWrY2fM9zE=',
                    'ctl00$hidCSRF' : 'TrackingParam.aspx802af74d-a758-41c0-998c-5ff8b5740241',
                    'ctl00$CPH$btnDOB' : 'Подтвердить'
                }
            },
            function(err,httpResponse,body){
                const cherio = require('cherio');
                const $ = cherio.load(body);
                let status = $('#aspnetForm > div.maindiv > div:nth-child(5) > table > tbody > tr:nth-child(1) > td:nth-child(3) > table > tbody > tr:nth-child(1) > td > div:nth-child(2) > table > tbody > tr:nth-child(2) > td > table > tbody').text();
                // console.log(status.trim());
                res(status.trim());
            }
        );
    });
}

// const SLAVA = {
//     date : '19/11/1990',
//     pasport : 'MP3756412'
// }

// getStatus(SLAVA).then(stat => {
//     console.log(stat);
// });

module.exports = {
    status : getStatus
}