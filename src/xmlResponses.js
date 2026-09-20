
// referenced https://www.w3schools.com/xml/xml_parser.asp
// https://developer.mozilla.org/en-US/docs/Web/API/XMLSerializer
const respondXML = (request, response, status, message, id) => {
    let output = `<response>
    <message>${message}</message>`;

    if (id) {
        output += `<id>${id}</id>`;
    }

    output += '</response>';

    // const xml = document.implementation.createDocument("", "response");
    // const root = xml.documentElement;

    // //create message prop and add into response
    // const msg = xml.createElement('message');
    // msg.appendChild(xml.createTextNode(message));
    // root.appendChild(msg);

    // if (id) {
    //     const idProp = xml.createElement('message');
    //     idProp.appendChild(xml.createTextNode(id));
    //     root.appendChild(idProp);
    // }

    // const serializer = new XMLSerializer();

    response.writeHead(status, { 'Content-Type': 'text/xml' });
    response.write(output);


    response.end();
};




module.exports = {
    respondXML,
}