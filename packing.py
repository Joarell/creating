class Pipedo:
    """Object class for the artworks and crates.
    All methods are defined here:
    manual_labor
    cubing
    crate_factory
    crate_puzzle """

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

        for d in range(len(work_list)):
            cub = work_list[s][0] * work_list[s][1] * work_list[s][2]/6000
            if cub > work:
                work = cub
                biggest_work = work_list[s]
            else:
                pass
            s += 1
            biggest_work
            

        work_list.pop(work_list.index(biggest_work))
        return biggest_work
 
       
    
    
    def crate_puzzle(self):
       
        work_list = self.dimensions
        crate_template = self.crate_factory()
        default_crate = crate_template
        new_crate = []

        while len(work_list) > 0:
            work = self.crate_factory()

            #Each variabel for each dimensions for crate and work
            long1 = crate_template[0]
            hight1 = crate_template[2]

            long2 = work[0]
            hight2 = work[2]

            if crate_template[0] and crate_template[2] > work[0] and work[2]:
                crate = Labor()
                crate.manual_labor(crate_template, work)
                print(f'Actual crate dimensions: {crate_template}')

            elif crate_template[0] and crate_template[2] < work[0] and work[2]: 
                #replacement of long and hight of the work to next verification
                work[0] = hight2[2]
                work[2] = long2[0]
                if crate_template[0] and crate_template[2] > work[0] and work[2]:
                   crate = manual_labor(crate_template, work)
            
            else:
               pass

            new_crate = default_crate
            new_crate[1] += 10
            crate_template = new_crate


        return crate_template

       
class Labor:
    def __init__(self):
        pass
    
    #This method provides the calculation of the dimensions of the works to the crate.
    @staticmethod
    def manual_labor(c, w):
        crated = []
        zipp = zip(c, w)
        for c, w in zipp:
            crated.append(c - w)
        
        return crated





caixa = Pipedo([[100, 5, 90], [210, 10, 170], [60, 5, 90]])
print("A cubagem total é de:" + '{:05.3f}' .format(caixa.cubing()) + "kgs cubados.")
print(f"A medida final da caixa será de:{caixa.crate_puzzle()}")