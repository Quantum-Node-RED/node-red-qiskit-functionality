const runPythonScript = require("../../../../pythonShell.js");


module.exports = function (RED) {
  function GetBackendOperationsNode(config) {
    RED.nodes.createNode(this, config);

    var node = this;
    this.token = config.token;

    node.status({ fill: "red", shape: "dot", text: "You haven't learned this node yet." });

    node.on('input',  async function (msg) {
      node.status({ fill: "green", shape: "dot", text: "You have  learned this node." });

      if(!node.token){
        node.error("Token is not provided. Please configure the node with a valid token.", msg);
        return;
      }


      try{
        const result = await new Promise((resolve,reject) => {
          const options = {
            token: node.token
          };

          runPythonScript(__dirname, "Get_backend_operations.py", arg = options, (err, results) => {
            if (err) {
              reject(err); 
              return;
            }
            resolve(results);
          });
        
        });

        const newMsg = {
          payload: result,
          token: node.token
        };


        node.send(newMsg);
      }catch(error){
        node.error(`Error running Python script: ${error.message}`, msg);
      }
    });

    node.on('close', function () {
      node.status({ fill: "red", shape: "dot", text: "You haven't learned this node yet." });
    });
  }
  RED.nodes.registerType("get-backend-operations", GetBackendOperationsNode);
}

