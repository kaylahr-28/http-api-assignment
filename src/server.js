const http = require('http');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');
const xmlHandler = require('./xmlResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const onRequest = (request, response) => {
    const protocol = request.connection.encrypted ? 'https' : 'http';
    const parsedUrl = new URL(request.url, `${protocol}://${request.headers.host}`);
    switch (parsedUrl.pathname) {
        case '/client.html':
            htmlHandler.getIndex(request, response);
            break;
        case '/style.css':
            htmlHandler.getCSS(request, response);
            break;
        case '/success':
            jsonHandler.respondJSON(request, response, 200, "This is a successful response", false);
            break;
        case '/badRequest':
            parsedUrl.search === "?valid=true" ?
                jsonHandler.respondJSON(request, response, 200, "This is a successful response", false) :
                jsonHandler.respondJSON(request, response, 400, "Missing valid query parameter set to true", 'badRequest');
            break;
        case '/unauthorized':
            parsedUrl.search === "?loggedIn=yes" ?
                jsonHandler.respondJSON(request, response, 200, "This is a successful response", false) :
                jsonHandler.respondJSON(request, response, 401, "Missing loggedIn query parameter set to yes", 'unauthorized');
            break;
        case '/forbidden':
            jsonHandler.respondJSON(request, response, 403, "You do not have access to this content", 'forbidden');
            break;
        case '/internal':
            jsonHandler.respondJSON(request, response, 500, "Internal server error: something went wrong", 'internalError');
            break;
        case '/notImplemented':
            jsonHandler.respondJSON(request, response, 501, "A get request for this page has not been implemented yet. Check again later for updated content", 'notImplemented');
            break;
        case "/":
            htmlHandler.getIndex(request, response);
            break;
        default:
            jsonHandler.respondJSON(request, response, 404, "The page you are looking for was not found", 'notFound');
            break;
    }
    //remove after testing
    console.log("pathname", parsedUrl.pathname);
}


http.createServer(onRequest).listen(port, () => {
    console.log(`Listening on 127.0.0.1: ${port}`);
})
