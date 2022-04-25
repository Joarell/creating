def manual_labor(c, w):
    crated = list()
    zipp = zip(c, w)
    for c, w in zipp:
        crated.append(c - w)
    return (crated)


work_list = {"145": [100, 5, 100], "100": [50, 3, 50]}
crate = list()
crate = manual_labor(work_list["145"], work_list["100"])
print(crate)

val = list(work_list.values())
key = list(work_list.keys())
print(val[0])
print(key[0])

works = open("works.txt")
lines = works.read().split('\n')
print(f'all crates are: {lines}')
temp = list()
temp = str(lines[0])

works.close()
works = open("works.txt")
code = works.read().split(',')
yank = code[1].split('\n')
dim = yank[0]

print(f'The work code is: {code[0]}')
print(f'The dimensions are: {dim}')

work_l = {code[0]: dim}
print(work_l)

works.close()
works = open("works.txt")
code = works.read().split(',')

i = 1
work_l = dict()
while code[i] is True:
    yank = code[i].split('\n')
    dim = yank[i - 1]
    work_l[code[i - 1]] = yank
    i += 1

print(work_l)
