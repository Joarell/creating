from cubing import cubing_calc


def sort_work_list(work_list):
    sort_list = []
    index = 0

    for work in work_list:
        sort_list.append(float('{:05.3f}' .format((cubing_calc(work_list[index])))))
        index += 1
    sort_list.sort()
    return sort_list
