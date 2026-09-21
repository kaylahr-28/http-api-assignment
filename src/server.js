const http = require('http');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');
const xmlHandler = require('./xmlResponses.js');
let handlerFnc;

const port = process.env.PORT || process.env.NODE_PORT || 3000;

/**
     * onRequest: checks request's content-type and chooses which .js file
     * to reference. based on pathname, appropriate handlers are called
     * and messages/codes/etc passed in
**/
const onRequest = (request, response) => {
    const protocol = request.connection.encrypted ? 'https' : 'http';
    const parsedUrl = new URL(request.url, `${protocol}://${request.headers.host}`);
    const requestType = request.headers['content-type'];

    if (requestType === "text/xml") {
        handlerFnc = xmlHandler.respondXML;
    } else {
        handlerFnc = jsonHandler.respondJSON;
    }

    switch (parsedUrl.pathname) {
        case '/client.html':
            htmlHandler.getIndex(request, response);
            break;
        case '/style.css':
            htmlHandler.getCSS(request, response);
            break;
        case '/success':
            handlerFnc(request, response, 200, "This is a successful response", false);
            break;
        case '/badRequest':
            parsedUrl.search === "?valid=true" ?
                handlerFnc(request, response, 200, "This is a successful response", false) :
                handlerFnc(request, response, 400, "Missing valid query parameter set to true", 'badRequest');
            break;
        case '/unauthorized':
            parsedUrl.search === "?loggedIn=yes" ?
                handlerFnc(request, response, 200, "This is a successful response", false) :
                handlerFnc(request, response, 401, "Missing loggedIn query parameter set to yes", 'unauthorized');
            break;
        case '/forbidden':
            handlerFnc(request, response, 403, "You do not have access to this content", 'forbidden');
            break;
        case '/internal':
            handlerFnc(request, response, 500, "Internal server error: something went wrong", 'internalError');
            break;
        case '/notImplemented':
            handlerFnc(request, response, 501, "A get request for this page has not been implemented yet. Check again later for updated content", 'notImplemented');
            break;
        case "/":
            htmlHandler.getIndex(request, response);
            break;
        default:
            handlerFnc(request, response, 404, "The page you are looking for was not found", 'notFound');
            break;
    };
};

http.createServer(onRequest).listen(port, () => {
    console.log(`Listening on 127.0.0.1: ${port}`);
});
