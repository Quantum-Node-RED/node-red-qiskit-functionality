const component = require("../../component.js");
module.exports = function (RED) {
  function SX_gateNode(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    const qbit = config.qbit
    node.on('input', function (msg) {
      msg.payload = msg.payload || {};
      const SX_gate_component = new component.Component("SX_gate",{});
      SX_gate_component.parameters["qbit"] = qbit
      component.addComponent(msg, SX_gate_component);
      node.send(msg);
    });
  }
  RED.nodes.registerType("SX_gate", SX_gateNode);
}