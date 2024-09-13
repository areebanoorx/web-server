// server.js
const http = require('http');
const fs = require('fs');
const url = require('url');

// Create the HTTP server
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    
    // Routing based on URL path
    if (path === '/json') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        const data = { message: 'Hello, this is a JSON response' };
        res.end(JSON.stringify(data));
    } else if (path === '/xml') {
        res.writeHead(200, { 'Content-Type': 'application/xml' });
        const xml = `<message>Hello, this is an XML response</message>`;
        res.end(xml);
    } else if (path === '/csv') {
        res.writeHead(200, { 'Content-Type': 'text/csv' });
        const csv = `id,name,age\n1,John,25\n2,Jane,22\n3,Doe,30`;
        res.end(csv);
    } else if (path === '/' || path === '/html') {
        // Serve HTML content
        fs.readFile('./index.html', 'utf8', (err, data) => {
            if (err) {
                // Send error response only if headers haven't been sent yet
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error loading HTML file');
                return; // Exit the function after sending the response
            } else {
                // Serve HTML file if no error
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else {
        // 404 Not Found
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

// Start the server and listen on port 3000
server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});
