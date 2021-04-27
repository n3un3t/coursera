(function (global) {

    // Namespace fpr utility, die ich später der Welt zeigen kann.
    var ajaxUtils = {};

    // Gibt ein HTTP Request Object heraus
    function getRequestObject() {

        // Was für eine Art Objekt ist verfügbar?
        if (window.XMLHttpRequest) {
            return (new XMLHttpRequest());
        }
        else if (window.ActiveXObject) {
            // uralte IE browser
            return (new ActiveXObject('Microsoft.XMLHTTP'));
        }
        else {
            // o.0
            global.alert('Ajax is not supported!');
            return (null);
        }
    };

    // -------------------
    // Jetzt wirds wichtig
    // -------------------

    // Ajax GET Request an 'requestURL', Methode von ajaxUtils
    ajaxUtils.sendGetRequest = function (requestURL, responseHandler) {
        var request = getRequestObject();

        //.onreadystatechange Status in der Kommunikation zwischen Browser und Server
        request.onreadystatechange = function () {
            handleResponse(request, responseHandler);
        };

        request.open('GET', requestURL, true); //true asynchronouse, false synchronouse

        //führt den Request aus und schickt Ihn an den Server
        request.send(null); // nur in POST body Informationen benötigt (=/ null)
    };

    //responseHandler nutzt den Response des Servers

    //ruft den responseHandler nur dann auf, wenn der Response bereit ist (readyState ==4) und ohne Error (status = 200)
    function handleResponse(request, responseHandler) {
        if ((request.readyState == 4) && (request.status == 200)) {
            responseHandler(request);
        }
    };

    //Zeig utility der ganzen Welt! (endlich)
    global.$ajaxUtils = ajaxUtils;


})(window);