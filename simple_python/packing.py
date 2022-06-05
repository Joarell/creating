import labor
from cubing import cubing_calc


class Pipedo:
    """Object class for the artworks and crates.
    All methods are defined here:
    manual_labor
  cubing
        crate_factory
        crate_puzzle """

    def __init__(self, dimensions):
        self.dimensions = dimensions

    def total_cubed(self):
        sizes = self.dimensions
        cubed = float()
        total = float()
        work = 0

        for work in range(len(sizes)):
            cubed = cubing_calc(sizes[work])
            total += cubed
            work += 1
        return total

    def crate_factory(self):

        work_list = self.dimensions
        work = float()
        s = 0
        biggest_work = list()

        for dimensions in range(len(work_list)):
            cub = cubing_calc(work_list[s])
            if cub > work:
                work = cub
                biggest_work = work_list[s]
            else:
                pass
            s += 1
        work_list.pop(work_list.index(biggest_work))
        return biggest_work


    def crate_puzzle(self):
        """This Function is responsible to arragen the whole list of the works
        in crate dimensions defined. """

        work_list = self.dimensions
        crate_template = self.crate_factory()
        default_crate = crate_template

        while len(work_list) > 0:
            work = self.crate_factory()

            # Each variable for each dimensions for crate and work
            long1 = crate_template[0]
            hight1 = crate_template[2]
            long2 = work[0]
            hight2 = work[2]

            # It's verification how the current work will be put in the crate.
            # if the crate dimensions were biger than the work
            if long2 > long1 or hight2 > hight1:
                hight2 = work[0]
                long2 = work[2]
                work[0] = long2
                work[2] = hight2

                if long2 < long1 or hight2 < hight1:
                    crate_template = labor.manual_labor(crate_template, work)
                    crate_template[1] = default_crate[1] + 10
                    print(f'Actual crate dimensions: {crate_template}')
                else:
                    crate_template = default_crate
                    long1 = crate_template[0]
                    hight1 = crate_template[2]
                    crate_template = labor.manual_labor(crate_template, work)
                    crate_template[1] = default_crate[1] + 10
                    crate_template[1] += 10
                    print(f'Actual crate dimensions: {crate_template}')
            else:
                crate_template = labor.manual_labor(crate_template, work)
                crate_template[1] = default_crate[1] + 10
                print(f'Actual crate dimensions: {crate_template}')
            if len(work_list) == 0:
                default_crate[0] += 23
                default_crate[1] += 23
                default_crate[2] += 28
        print(work_def)
        VCP = f'A caixa deve ser enviada pelo aeroporto de Viracopos, medida final: {default_crate}'
        GRU = f'A caixa deve ser enviada pelo aeroporto de Guarulhos, medida final: {default_crate}'
        if default_crate[0] > 300 or default_crate[2] > 160:
            return VCP
        else:
            return GRU
