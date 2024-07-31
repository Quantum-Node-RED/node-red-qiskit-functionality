const component=require('../../component.js');
module.exports = function (RED) {
    function qiskit_runtime_serviceNode(config) {
      RED.nodes.createNode(this, config);
      var node = this;
      node.on('input', function (msg) {
        msg.payload = msg.payload || {};
        const qiskit_runtime_service_component = new component.Component("qiskit_runtime_service",{});
        component.addComponent(msg, qiskit_runtime_service_component);
        node.send(msg);
      });
    }
    RED.nodes.registerType("qiskit_runtime_service", qiskit_runtime_serviceNode);
  }