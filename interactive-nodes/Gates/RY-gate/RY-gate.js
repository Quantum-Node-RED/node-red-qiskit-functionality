const component = require("../../component.js");
const constants = require('../../constants.js');
module.exports = function (RED) {
  function RY_gateNode(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    node.on('input', function (msg) {
      msg.payload = msg.payload || {};
      const RY_gate_component = new component.Component("RY_gate", {});
      RY_gate_component.parameters["qbit"] = msg.payload["qubit_id"];
      RY_gate_component.parameters["theta"] = parseFloat(config.theta);
      RY_gate_component.parameters["mode"] = config.mode;
      RY_gate_component.parameters[constants.CIRCUIT_NAME] = node.context().flow.get(constants.CIRCUIT_NAME);
      RY_gate_component.parameters["sequence_no"] = config.sequence_no;
      component.addComponent(msg, RY_gate_component);
      node.send(msg);
    });
  }
  RED.nodes.registerType("RY_gate", RY_gateNode);
}