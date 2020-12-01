class Pipedo:
    def __init__(self, dimensions):
        self.dimensions = dimensions
        
    #Function for cubing crate dimensions
    def cubing(self):
        dimensions = self.dimensions
        cubed = float()
        total = float()
        i = 0

        for sizes in range(len(dimensions)):
            cubing_calc = dimensions[i][0] * dimensions[i][1] * dimensions[i][2]/6000
            i += 1
            total += cubing_calc
        #variable contain the total cubaded for all crates 
        cubed = total

        return cubed

    def crate_factory(self):
        work_list = self.dimensions
        work = float()
        s = 0
        biggest_work = list()
        cratesizes = list()

        for d in range(len(work_list)):
            cub = work_list[s][0] * work_list[s][1] * work_list[s][2]/6000
            if cub > work:
                work = cub
                biggest_work = work_list[s]
            else:
                pass
            s += 1
            cratesizes = biggest_work
            
        return cratesizes
        

        #while len(work_list) >= 0:
            

        #work_list.remove(crate_sizes)
        #return crate_sizes







caixa = Pipedo([[100, 5, 90], [210, 10, 170], [60, 5, 90]])
print("A cubagem total é de:" + '{:05.3f}' .format(caixa.cubing()) + "kgs cubados.")
print(f"A maior obra da lista mede:{caixa.crate_factory()}")







































