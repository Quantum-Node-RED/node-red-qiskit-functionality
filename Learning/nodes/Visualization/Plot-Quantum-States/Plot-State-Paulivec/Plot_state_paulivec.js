const runPythonScript = require("../../../pythonShell");

module.exports = function(RED) {
  function PlotStatePaulivecNode(config) {
    RED.nodes.createNode(this,config);
    var node = this;

    node.status({ fill: "red", shape: "dot", text: "You haven't learned this node yet." });
    
    node.on('input', async function(msg) {
      node.status({ fill: "green", shape: "dot", text: "You have learned this node." });
      const result = await new Promise((resolve, reject) => {
        const option = {
                
        };
        runPythonScript(__dirname, "Plot_state_paulivec.py", option, (err, results) => {
          if (err) throw err;
          return resolve(results);
        });
      });
        
      const newMsg = {
        payload: result
      };
      node.send(newMsg);

      node.on('close', function () {
        node.status({ fill: "red", shape: "dot", text: "You haven't learned this node yet." });
      });
    });
  }
  RED.nodes.registerType("plot-state-paulivec", PlotStatePaulivecNode);
}