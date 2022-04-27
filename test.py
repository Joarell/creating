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
code = works.read().split('\n')
yank = code[1].split('\n')
dim = yank[0]

print(f'The work code is: {code[0]}')
print(f'The dimensions are: {dim}')

yank = int()
yank = code[0].split(',')
yank = yank[0]
print(code)

i = 0
while yank != "":
    print(f'Work code: {yank}')
    i += 1
    yank = code[i].split(',')
    yank = yank[0]
