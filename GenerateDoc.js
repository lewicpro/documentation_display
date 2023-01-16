const { count } = require("console");
const fs = require("fs");
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  const sum = 34 + 4
  res.end('Hello World :'+ sum);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


var state = {
    namespace: "",
    function: "",
    function_params: "",
    description: "",
    params: [],
    returns: "",
    rest: "",
    method: "",
}; 


var lexer = {
    states: [],
    addStateRule: function (ignore, regex, callback) {
        lexer.states.push({ regex, callback });
    },
    lex: function (lines) {
        var __tmp = lines.split("\n");
        for (var i in __tmp) {
            var line = __tmp[i];
            for (var j in lexer.states) {
                var matches = line.match(lexer.states[j].regex); 
                if (matches != null) {
                    lexer.states[j].callback(matches, line)
                }
            }
        };
    },

    reset: function () {
        state.namespace = "";
        state.function = "";
        state.function_params = "";
        state.description = "";
        state.params = [];
        state.returns = "";
        state.rest = "";
        state.method = "";
    },
        
    reset_function: function () {
        state.function = "";
        state.function_params = "";
        state.description = "";
        state.params = [];
        state.returns = "";
        state.rest = "";
        state.method = "";
    },

    finished_function: function () {
        // console.log("=============================================================================================================================")
        // console.log("Namespace: " + state.namespace);
        // console.log("Function: " + state.namespace + "." + state.function + "(" + state.function_params + ")" );
        // console.log("Function Params: " + state.function_params);
        // console.log("Parameters: " + state.params);
        // console.log("Returns: " + state.returns);
        // console.log("Description: " + state.function);
        // console.log("REST Method: " + state.method);
        // console.log("REST URL: " + state.rest);
        // console.log("=============================================================================================================================")
        // fs.writeFile("test.txt", JSON.stringify(
        //     {
        //             "Namespace " : state.namespace,
        //             "Function " : state.namespace + "." + state.function + "(" + state.function_params + ")" ,
        //             "Function Params ": state.function_params,
        //             "Parameter ": state.params,
        //             "Returns ": state.returns,
        //             "Description ": state.function,
        //             "REST Method ": state.method,
        //             "REST URL ": state.rest
        //         }), function(err) {
        //     if(err) {
        //         return console.log(err);
        //     }
        //     console.log("The file was saved!");
        // }); 
        
        // Or
       
          
         
        fs.appendFileSync('test.txt',JSON.stringify({
            "Namespace " : state.namespace,
            "Function " : state.namespace + "." + state.function + "(" + state.function_params + ")" ,
            "Function Params ": state.function_params,
            "Parameter ": state.params,
            "Returns ": state.returns,
            "Description ": state.function,
            "REST Method ": state.method,
            "REST URL ": state.rest
        })+',', function (err) {
            if (err) throw err;
            console.log('Saved!');
          });

        
            
            
       
    },
   
    finished_namespace: function () {
       
        
       
       
        // console.log(countries)

      
    }
};

lexer.addStateRule(undefined, /simu\.iq\.rest\.(post|get)\((.+\))/, function (match, line) {
    var method = match[1];
    var url = match[2];
    state.method = method;
    state.rest = url.split(",")[0];
});

lexer.addStateRule(undefined,/\s*\*\s*\@(\w+)/, function (match, line) {
    var description = "";
    var cnt = match[0].length;
    var param = match[1];
  

    do { 
        
        var char = line[cnt];
        cnt++;
        if (cnt >= line.length) {
            switch (param) {
                
                case "returns": {
                    // console.log("returns:" + param);
                    state.returns = description;
                    break;
                }

                case "param": {
                    // console.log("params:" + param);
                    state.params.push(description);
                    break;
                }

                default: {
                    // console.log("error given:" + param)
                    
                    throw "Blowup !!!";
                }
            };
            break;
        }
        description += char;
    } while (char !== '');
});

lexer.addStateRule(undefined,/^\s*\*\s+([^@].+)/, function (match, line) {
    var description = "";
    var cnt = match[0].length;
    var param = match[1];
    state.description += match[1];
    // console.log('found descr: ' + state.description);
});

lexer.addStateRule(undefined, /\s*(\w+)\s*\:\s*function\s*\((.*)\)/, function (match, line) {
    state.function = match[1];
    state.function_params = match[2];
    // console.log('found function: ' + state.function);
    lexer.finished_function();
    lexer.reset_function();
});

lexer.addStateRule(undefined, /(\w+|\.*)+\s*=/, function (match, line) {
    if (state.namespace == "") {
        var tmp = match[0];
        var tmp2 = tmp.split(" ");
        state.namespace = tmp2[0];
        // console.log('found namespace: ' + state.namespace);
    }
});

var lines = ' \
        /** \n\
        simu.iq.services.eir = { \
        \n \
        * Dumps the current devicebinds in CSV format\n \
        * @param {object} data object with filename(and path) to dump\n \
        * @param {any} cb optional callback\n \
        * @returns {promise} with status\n \
        */\n\
        eir_ext = { \
        get: function \
    ';


var files_in_dir = fs.readdirSync(".");

for (var i in files_in_dir) {
    var countries=[]
    // console.log('Here it starts')
    
    
    
    lexer.reset();
    var file = files_in_dir[i];
    if (file.endsWith(".js")) {
        // console.log(JSON.stringify(i))
        var content = fs.readFileSync(file).toString();

        lexer.lex(content);
        lexer.finished_namespace();
        lexer.reset();
    }
}
