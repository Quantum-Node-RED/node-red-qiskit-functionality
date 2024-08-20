import base64, io, json
from qiskit import QuantumCircuit, QuantumRegister, ClassicalRegister
qubits = QuantumRegister(1)
clbits = ClassicalRegister(1)
circuit = QuantumCircuit(qubits, clbits)
(q0,) = qubits
(c0,) = clbits
 
with circuit.for_loop(range(5)) as _:
    circuit.x(q0)
circuit.measure(q0, c0)

from qiskit_aer import AerSimulator
simulator = AerSimulator()
result = simulator.run(circuit, shots=1024).result()

counts = result.get_counts(circuit)
 
circuit_diagram=circuit.draw("mpl")
buffer=io.BytesIO()
circuit_diagram.savefig(buffer, format="png")
buffer.seek(0)
circuit_diagram_base64=base64.b64encode(buffer.read()).decode("utf-8")
buffer.close()
result={
    "measure":counts,
    "circuit_diagram": circuit_diagram_base64
}
print(json.dumps(result))
