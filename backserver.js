const express = require('express');
const jsonminify = require("jsonminify");
const cors = require('cors');
const app = express();
const jsondata=[]

app.use(cors({
    origin: ['http://localhost:5500', 'http://192.168.0.15:5500', 'http://127.0.0.1:5500'],
  }));
  
  app.get('/data', (req, res) => {
      const fs = require("fs");
  
      fs.readFile("test.txt", "utf-8", (err, jsonData) => {
          if (err) {
              console.error(err);
              return;
          }
          // Minify the jsonData and remove whitespaces
          const minifiedData = jsonminify(jsonData).replace(/\s+(?=\")|\\"|\s+(?=\URL)|\s+(?=\Method)|\s+(?=\Params)/g,'');
          // parse the minified data
          const data = JSON.parse(minifiedData);
          res.json(data);
      });
  });

const port = 3000;
const hostname = 'localhost';
app.listen(port, hostname, () => {
console.log(`Server running on port http://${hostname}:${port}/data`);
});