document.addEventListener('DOMContentLoaded', function (event) {

    document.querySelector('button').addEventListener('click', function () {
        $ajaxUtils.sendGetRequest('/Json/name.json', function (res) {

            var message = res.name + ' ist ' + res.alter + ' Jahre alt.';

            var message2 = res.mag;
            message2 += ' und ' + res.magAuch;

            document.querySelector('#content').innerHTML = '<h2>' + message + '</h2>';

            document.querySelector('#char').innerHTML = 'Steht auf: <br></br>' + message2;

            document.querySelector('button').textContent = 'Geantwortet!';
        });
    });


});