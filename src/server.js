const http = require('http');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');
const xmlHandler = require('./xmlResponses.js');
let handler;

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const onRequest = (request, response) => {
    const protocol = request.connection.encrypted ? 'https' : 'http';
    const parsedUrl = new URL(request.url, `${protocol}://${request.headers.host}`);
    const requestType = request.headers['content-type'];

    if (requestType === "text/xml") {
        handler = xmlHandler;
    } else {
        handler = jsonHandler;
    }

    switch (parsedUrl.pathname) {
        case '/client.html':
            htmlHandler.getIndex(request, response);
            break;
        case '/style.css':
            htmlHandler.getCSS(request, response);
            break;
        case '/success':
            // console.log("request:", request.headers['content-type']);
            handler.respondJSONXML(request, response, 200, "This is a successful response", false);
            break;
        case '/badRequest':
            parsedUrl.search === "?valid=true" ?
                handler.respondJSONXML(request, response, 200, "This is a successful response", false) :
                handler.respondJSONXML(request, response, 400, "Missing valid query parameter set to true", 'badRequest');
            break;
        case '/unauthorized':
            parsedUrl.search === "?loggedIn=yes" ?
                handler.respondJSONXML(request, response, 200, "This is a successful response", false) :
                handler.respondJSONXML(request, response, 401, "Missing loggedIn query parameter set to yes", 'unauthorized');
            break;
        case '/forbidden':
            handler.respondJSONXML(request, response, 403, "You do not have access to this content", 'forbidden');
            break;
        case '/internal':
            handler.respondJSONXML(request, response, 500, "Internal server error: something went wrong", 'internalError');
            break;
        case '/notImplemented':
            handler.respondJSONXML(request, response, 501, "A get request for this page has not been implemented yet. Check again later for updated content", 'notImplemented');
            break;
        case "/":
            htmlHandler.getIndex(request, response);
            break;
        default:
            handler.respondJSONXML(request, response, 404, "The page you are looking for was not found", 'notFound');
            break;
    }
    //remove after testing
    //console.log("pathname", parsedUrl.pathname);
}


http.createServer(onRequest).listen(port, () => {
    console.log(`Listening on 127.0.0.1: ${port}`);
})
