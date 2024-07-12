const runPythonScript = require("../../pythonShell");

module.exports = function(RED) {
    function DefaultDrawNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node.on('input', async function(msg) {
            const result = await new Promise((resolve, reject) => {
                const option = {
                //   x: msg.payload.x,
                //   y: msg.payload.y
                };
                runPythonScript(__dirname, "default-draw.py", option, (err, results) => {
                  if (err) throw err;
                  return resolve(results);
                });
              });
        
              const newMsg = {
                payload: result
              };
              node.send(newMsg);


            // msg.payload = msg.payload.toLowerCase();
            // node.send(msg);
        });
    }
    RED.nodes.registerType("default-draw", DefaultDrawNode);
}