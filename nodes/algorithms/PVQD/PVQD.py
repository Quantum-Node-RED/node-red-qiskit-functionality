import numpy as np
import json 
import sys 
from qiskit_algorithms.state_fidelities import ComputeUncompute
from qiskit_algorithms.time_evolvers import TimeEvolutionProblem, PVQD
from qiskit.primitives import Estimator, Sampler
from qiskit.circuit.library import EfficientSU2
from qiskit.quantum_info import SparsePauliOp, Pauli
from qiskit_algorithms.optimizers import L_BFGS_B




input_data = sys.argv[1]
params = json.loads(input_data)


hamiltonian_terms = params.get("hamiltonian_terms", ["ZZ", "IX", "XI"])
hamiltonian_coeff = params.get("hamiltonian_coeff", 0.1)
observable_term = params.get("observable_term", "ZZ")
ansatz_reps = params.get("ansatz_reps", 1)
initial_parameters = np.array(params.get("initial_parameters", [0.0] * EfficientSU2(2, reps=1).num_parameters))
time = params.get("time", 1)
num_timesteps = params.get("num_timesteps", 100)

sampler = Sampler()
fidelity = ComputeUncompute(sampler)
estimator = Estimator()

hamiltonian = hamiltonian_coeff * SparsePauliOp(hamiltonian_terms)
observable = Pauli(observable_term)
ansatz = EfficientSU2(2, reps=ansatz_reps)

optimizer = L_BFGS_B()

    # setup the algorithm
pvqd = PVQD(
    fidelity,
    ansatz,
    initial_parameters,
    estimator,
    num_timesteps=num_timesteps,
    optimizer=optimizer,
)

# specify the evolution problem
problem = TimeEvolutionProblem(
        hamiltonian, time, aux_operators=[hamiltonian, observable]
    )

# and evolve!
result = pvqd.evolve(problem)
    
# Return result as JSON
json.dumps(result)
