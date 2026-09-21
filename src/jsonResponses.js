
/**
     * respondJSON: formats message/id in json, writes approprate
     * content type
**/
const respondJSON = (request, response, status, message, id) => {
    const output = { "message": "" };
    output.message = message;
    if (id) {
        output.id = id;
    }

    response.writeHead(status, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify(output));
    response.end();
};

module.exports = {
    respondJSON,
}