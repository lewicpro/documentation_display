const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
  origin: ['http://localhost:5500', 'http://127.0.0.1:5500'],
}));

app.get('/data', (req, res) => {
  const data = [{
    namespace: 'John Doe',
    function: 'johndoe@example.com',
    function_params: '555-555-5555',
    description: 'dfsd',
    params: 'oeee',
    returns: 'sdfs',
    rest: 'seffgsdf',
    method: '30'
  },
  {
    namespace: 'Masatu',
    function: 'johndoe@example.com',
    function_params: '555-555-5555',
    description: 'dfsd',
    params: 'oeee',
    returns: 'sdfs',
    rest: 'seffgsdf',
    method: 'asew30'
  }];
res.json(data);
});

const port = 3000;
const hostname = 'localhost';
app.listen(port, hostname, () => {
console.log(`Server running on port http://${hostname}:${port}/data`);
});