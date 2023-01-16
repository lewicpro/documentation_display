const http = require('http');

const sampleData = {
    namespace: "sample",
    function: "getData",
    function_params: "param1, param2",
    description: "This function returns sample data",
    params: ["param1: string", "param2: number"],
    returns: "object",
    rest: "/sample",
    method: "GET"
};

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.end(fs.readFileSync('./index.html', 'utf8'));
    } else if (req.url === '/data') {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(sampleData));
    }
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});