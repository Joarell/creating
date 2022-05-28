# This function provides the calculation of the dimensions of the crate works.
def manual_labor(c, w):
    crated = []
    zipp = zip(c, w)
    for c, w in zipp:
        crated.append(c - w)

    return crated
