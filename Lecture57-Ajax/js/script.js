//Event Behandlung
document.addEventListener('DOMContentLoaded', function (event) {

    document.querySelector('button').addEventListener('click', function () {

        //wird nicht benötigt wenn response output in Utils
        //var self = this;
        //var name = '';

        //Ruf den Server wegen des Namens
        $ajaxUtils.sendGetRequest('data/data.txt', function (request) {
            //Response Object wird request genannt

            //umtaufen wenn funktion hier
            //self.name = request.responseText;
            var name = request.responseText;

            document.querySelector('#content').innerHTML = '<h2>Hello dir Sir ' + name + '!';
        });

        //funktioniert nicht wegen asynchronous also rein in die Utils Funktion
        //document.querySelector('#content').innerHTML = '<h2>Hello dir Sir' + self.name + '!';
    }
    );
}
);