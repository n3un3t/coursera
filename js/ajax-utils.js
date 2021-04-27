(function (global) {

    var ajaxUtils = {};

    //return ein HTTP Request Object
    function getRequestObject() {
        if (window.XMLHttpRequest) {
            return (new XMLHttpRequest())
        }
        else if (window.ActiveXObject) {
            return (new ActiveXObject('Microsoft.XMLHTTPS'));
        }
        else {
            global.alert('Ajax is not supported!');
            return (null);
        }
    };

    //response Handler verarbeitet was der Server antwortet
    ajaxUtils.sendGetRequest = function (requestURL, responseHandler, isJsonResponse) {
        var request = getRequestObject();

        request.onreadystatechange = function () {
            handleResponse(request, responseHandler, isJsonResponse);
        };

        //Anfragen Methode (Wie?)
        request.open('GET', requestURL, true);

        request.send(null);
    };
    //ist es ein JSON?
    //Anwendung der responseHandler Funktion auf request.responseText (falls Response OK)
    function handleResponse(request, responseHandler, isJsonResponse) {
        if ((request.readyState == 4) && (request.status == 200)) {

            if (isJsonResponse == undefined) {
                isJsonResponse = true;
            }

            if (isJsonResponse) {
                responseHandler(JSON.parse(request.responseText))
            }

            else {
                responseHandler(request.responseText);
            }
        }
    };

    global.$ajaxUtils = ajaxUtils;

})(window);