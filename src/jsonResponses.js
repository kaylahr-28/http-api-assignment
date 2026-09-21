const respondJSONXML = (request, response, status, message, id) => {
    const output = { "message": "" };
    const requestType = request.headers['content-type'];
    output.message = message;
    if (id) {
        output.id = id;
    }

    console.log("output json", JSON.stringify(output));

    response.writeHead(status, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify(output));
    response.end();
};

module.exports = {
    respondJSONXML,
}