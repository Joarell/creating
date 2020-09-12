class Pipedo:
    cubing = float() 

    def __init__(self, dimensions):      #Medidas necessárias para definção da obra e caixa
        self.dimensions = dimensions
       # sizes = dimensions
        #print(sizes)

    def cubing (self):
        dimensions = self.dimensions
        cubed = float()
        total = float()
        i = 0

        for sizes in range(len(dimensions)):
            cubing_calc = self.dimensions[i][0] * self.dimensions[i][1] * self.dimensions[i][2]/6000
            i += 1
            total += cubing_calc

        cubed = total


        return cubed

    def crate_factory(self):


caixa = Pipedo([[100, 5, 90], [210, 10, 170], [60, 5, 90]])
print("A cubagem total é de:" + '{:05.3f}' .format(caixa.cubing()) + "kgs cubados.")








































