// referenced https://www.w3schools.com/xml/xml_parser.asp

/**
     * respondXML: formats message/id in xml, writes approprate
     * content type
**/
const respondXML = (request, response, status, message, id) => {
    let output = `<response><message>${message}</message>`;

    if (id) {
        output += `<id>${id}</id>`;
    }
    output += '</response>';

    response.writeHead(status, { 'Content-Type': 'text/xml' });
    response.write(output);
    response.end();
};

module.exports = {
    respondXML,
}