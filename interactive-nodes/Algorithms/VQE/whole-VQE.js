const runPythonScript = require("../../pythonShell");

module.exports = function (RED) {
  function wholeVQENode(config) {
    RED.nodes.createNode(this, config);

    this.rotationLayers = config.rotationLayers;
    this.numQubits = config.numQubit;
    this.entanglementLayers = config.entanglementLayers;
    this.hamiltonianPauli = config.hamiltonianPauli;
    this.hamiltonianCoeffs = config.hamiltonianCoeffs;
    this.optimizer = config.optimizer;
    this.maxiter = config.maxiter;

    var node = this;
    node.on('input', async function (msg) {
      const result = await new Promise((resolve, reject) => {
        const option = {
          numQubits: node.numQubits,
          rotationLayers: node.rotationLayers,
          entanglementLayers: node.entanglementLayers,
          hamiltonianPauli: node.hamiltonianPauli,
          hamiltonianCoeffs: node.hamiltonianCoeffs,
          optimizer: node.optimizer,
          maxiter: node.maxiter
        };
        runPythonScript(__dirname, "whole-VQE.py", option, (err, results) => {
          if (err) throw err;
          return resolve(results);
        });
      });

      const newMsg = {
        payload: result
      };
      node.send(newMsg);
    });
  }
  RED.nodes.registerType("whole-VQE", wholeVQENode);
}