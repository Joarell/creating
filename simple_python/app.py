from packing import Pipedo
import big_work

caixa = Pipedo([[100, 5, 90], [210, 10, 170], [60, 5, 60], [60, 5, 90]])
print(big_work(caixa))
print("A cubagem total é de:" + '{:05.3f}' .format(caixa.total_cubed()) + "kgs cubados.")
print(caixa.crate_puzzle())
