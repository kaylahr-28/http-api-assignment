
const respondJSONXML = (request, response, status, message, id) => {
    const output = { "message": "" };
    const requestType = request.headers['content-type'];
    output.message = message;
    if (id) {
        output.id = id;
    }



    // if (r === "application/json") {
    //     response.message = message;
    //     if (id) {
    //         response.id = id;
    //     }
    //     return JSON.stringify(response);

    // } else if (type === "text/xml") {

    //     let response = `<response>
    //       <message>${message}</message>`;
    //     if (id) {
    //         response += `<id>${id}</id>`;
    //     }

    //     response += '</response>';
    //     console.log("response status:", response.status);
    //     return response;
    // }




    console.log("output json", JSON.stringify(output));
    response.writeHead(status, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify(output));
    response.end();
};




module.exports = {
    respondJSONXML,
}