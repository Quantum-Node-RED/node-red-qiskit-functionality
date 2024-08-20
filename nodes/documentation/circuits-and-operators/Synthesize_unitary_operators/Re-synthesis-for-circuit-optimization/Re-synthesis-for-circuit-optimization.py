from qiskit import QuantumRegister, ClassicalRegister, QuantumCircuit
import json, io, base64

qreg_q = QuantumRegister(2, 'q')
creg_c = ClassicalRegister(4, 'c')
circuit = QuantumCircuit(qreg_q, creg_c)
 
circuit.h(qreg_q[0])
circuit.cx(qreg_q[0], qreg_q[1])
circuit.sx(qreg_q[1])
circuit.cz(qreg_q[0], qreg_q[1])
circuit.x(qreg_q[1])
circuit.x(qreg_q[0])
circuit.cx(qreg_q[0], qreg_q[1])
circuit.h(qreg_q[0])
circuit_diagram=circuit.draw("mpl")
buffer=io.BytesIO()
circuit_diagram.savefig(buffer, format="png")
buffer.seek(0)
circuit_diagram_base64=base64.b64encode(buffer.read()).decode("utf-8")
buffer.close()
result={
    "circuit_diagram": circuit_diagram_base64
}
print(json.dumps(result))