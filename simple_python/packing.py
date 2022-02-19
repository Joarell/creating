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
        biggest_work = list()

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
        # new_crate = list()

        while len(work_list) > 0:
            work = self.crate_factory()

            #Each variabel for each dimensions for crate and work
            long1 = crate_template[0]
            hight1 = crate_template[2]
            long2 = work[0]
            hight2 = work[2]
            crate_packed = Labor()

            #It's verification how the current work will be put or not into the crate.
            if long2 > long1 or hight2 > hight1:
                hight2 = work[0]
                long2 = work[2]
                work[0] = long2
                work[2] = hight2
           
                if long2 < long1 or hight2 < hight1:
                    crate_template = crate_packed.manual_labor(crate_template, work)
                    crate_template[1] = default_crate[1] + 10
                    print(f'Actual crate dimensions: {crate_template}')
                else:
                    crate_template = default_crate
                    long1 = crate_template[0]
                    hight1 = crate_template[2]
                    crate_template = crate_packed.manual_labor(crate_template, work)
                    crate_template[1] = default_crate[1] + 10
                    crate_template[1] += 10
                    print(f'Actual crate dimensions: {crate_template}')
            else:
                crate_packed = Labor()
                crate_template = crate_packed.manual_labor(crate_template, work)
                crate_template[1] = default_crate[1] + 10
                print(f'Actual crate dimensions: {crate_template}')
            if len(work_list) == 0:
                 default_crate[1] += 23
                 default_crate[0] += 23
                 default_crate[2] += 28

            else:
                pass

        VCP = f'A caixa deve ser enviada pelo aeroporto de Viracopos, medida final: {default_crate}'
        GRU = f'A caixa deve ser enviada pelo aeroporto de Guarulhos, medida final: {default_crate}'


        if default_crate[0] > 300 or default_crate[2] > 160:
            return VCP
        else:
            return GRU



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




caixa = Pipedo([[100, 5, 90], [210, 10, 170],[60, 5, 60], [60, 5, 90]])
print("A cubagem total é de:" + '{:05.3f}' .format(caixa.cubing()) + "kgs cubados.")
print(caixa.crate_puzzle())


