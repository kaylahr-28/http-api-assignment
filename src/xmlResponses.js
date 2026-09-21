// referenced https://www.w3schools.com/xml/xml_parser.asp

const respondJSONXML = (request, response, status, message, id) => {
    let output = `<response>
    <message>${message}</message>`;

    if (id) {
        output += `<id>${id}</id>`;
    }
    output += '</response>';

    console.log("output xml", output);

    response.writeHead(status, { 'Content-Type': 'text/xml' });
    response.write(output);
    response.end();
};

module.exports = {
    respondJSONXML,
}