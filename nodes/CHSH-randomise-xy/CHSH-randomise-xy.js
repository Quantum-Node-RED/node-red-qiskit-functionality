module.exports = function(RED) {
    function CHSHRandomiseXYNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        node.on('input', function(msg) {
            msg.payload.x = Math.floor(Math.random() * 2);
            msg.payload.y = Math.floor(Math.random() * 2); 
            node.send(msg); 
        });
    }
    RED.nodes.registerType("CHSH-randomise-xy", CHSHRandomiseXYNode);
};
