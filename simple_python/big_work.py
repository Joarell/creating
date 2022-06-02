from packing import Pipedo


def crate_def(work_list):
    works = work_list
    great = Pipedo.crate_factory(work_list)
    art = 0
    for art in range(len(works)):
        if works[art] == great:
            return print(works[art])
        else:
            art += 1
