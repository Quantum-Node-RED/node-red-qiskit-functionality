const runPythonScript = require("../../../../pythonShell");

module.exports = function (RED) {
  function ResynthesisNode(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    node.name = config.name;
    node.info = config.info;

    node.status({ fill: "red", shape: "dot", text: "You haven't learned this node yet." });
    
    node.on("input", async function () {
      node.status({ fill: "green", shape: "dot", text: "You have  learned this node." });

      const result = await new Promise((resolve, reject) => {
        runPythonScript(__dirname, "Re-synthesis_for_circuit_optimization.py", arg=null, (err, results) => {
          if (err) reject(err);
          else resolve(results);
        });
      });

      const newMsg = {
        payload: result
      };
      node.send(newMsg);
    });

    node.on('close', function () {
      node.status({ fill: "red", shape: "dot", text: "You haven't learned this node yet." });
    });
  }
  RED.nodes.registerType("Re-synthesis", ResynthesisNode);
};