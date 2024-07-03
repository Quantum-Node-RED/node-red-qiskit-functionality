const runPythonScript = require("../../pythonShell");


module.exports = function (RED) {
    function VarQITENode(config) {
      RED.nodes.createNode(this, config);

      this.hamiltonian_data = config.hamiltonian_data;
      this.hamiltonian_coeffs = config.hamiltonian_coeffs;

      var node = this;

      node.on('input',  async function (msg) {
        const result = await new Promise((resolve,reject) => {
          const options = {
            hamiltonian_data: node.hamiltonian_data,
            hamiltonian_coeffs: node.hamiltonian_coeffs,
          };
          
          runPythonScript(__dirname, "VarQITE.py", arg = options, (err, results) => {
            if (err) throw err;
            return resolve(results);
          });
        
        });

        const newMsg = {
          payload: result,
          encoding: 'base64'
        }


        node.send(newMsg);
      });
    }
    RED.nodes.registerType("VarQITE", VarQITENode);
  }

