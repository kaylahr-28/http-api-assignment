
const respondJSON = (request, response, status, message, id, value) => {
    const output = { "message": "" };

    output.message = message;
    if (id) {
        output.id = id;
    }
    console.log(JSON.stringify(output));
    if (value) return JSON.stringify(output);
    response.writeHead(status, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify(output));
    response.end();
};




module.exports = {
    respondJSON,
}