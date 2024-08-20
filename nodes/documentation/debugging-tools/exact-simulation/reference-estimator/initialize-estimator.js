const runPythonScript = require("../../../../pythonShell");

module.exports = function (RED) {
  function InitializeEstimatorNode(config) {
    RED.nodes.createNode(this, config);

    var node = this;

    node.on('input',  async function (msg) {
      node.send(msg);
    });
  }
  RED.nodes.registerType("initialize-estimator", InitializeEstimatorNode);
}