"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lastStep = exports.finishedDimensions = exports.defineCrateSizes = exports.invert = exports.largest = exports.sameSizesChecker = exports.firstThingFirst = void 0;
const next_work = __importStar(require("./next.work.checker"));
const sort = __importStar(require("./sort.system"));
const start = __importStar(require("./layer.puzzle.man"));
const same_size_check = __importStar(require("./same.sizes.checker"));
const extra_math = __importStar(require("./extras.math"));
//This function provides a new list with cubed values, handling with the 
//object sizes to int, and sort them based on the cube values.
function firstThingFirst(work_list) {
    let new_list;
    new_list = sort.getDimensions(work_list);
    new_list = sort.quickSort(next_work.cubVersionList(new_list), 4);
    return (new_list);
}
exports.firstThingFirst = firstThingFirst;
//This function check if were find works with the same sizes on the list.
function sameSizesChecker(list) {
    let works_crate;
    works_crate = same_size_check.sameSizes(list);
    if (list[0] === 0) {
        works_crate = [];
        list.splice(0, 1);
        return;
    }
    return (works_crate);
}
exports.sameSizesChecker = sameSizesChecker;
//This function is required when the list has sculptures or furniture.
//Just to split the list between canvas from every thing else.
function largest(large_works, layer) {
    let colector;
    large_works = start.arrayLess(large_works);
    layer = next_work.standardLayer(large_works);
    layer = next_work.largestWorks(large_works, layer);
    colector = start.crateArrange(layer, large_works, 0);
    colector.push(layer);
    return (colector);
}
exports.largest = largest;
//This function is responsible to invert the position of the each item in the
//list.
function invert(sizes, len, new_list) {
    if (len < 0)
        return (new_list);
    new_list.push(start.arrayLess(sizes.splice(len, 1)));
    return (invert(sizes, len - 1, new_list));
}
exports.invert = invert;
//This function returns the ultimate crate size.
//23, 23, and 28 are external dimensions added due to padding and wood of the
//crate after it was done.
function defineCrateSizes(inner_size, layers) {
    let x;
    let z;
    let y;
    let external_size;
    x = 23 + inner_size[0];
    if (layers > 0)
        z = 23 * layers;
    else
        z = 23 + inner_size[1];
    if (inner_size.length > 2)
        y = 28 + inner_size[2];
    else
        y = 28 + inner_size[1];
    external_size = ['Final', x, z, y];
    external_size.push(extra_math.cubing(external_size));
    return (external_size);
}
exports.defineCrateSizes = defineCrateSizes;
//This is the function is responsible to add the final sizes to each crate in the
// crates_done list.
function finishedDimensions(crates_done) {
    let aux;
    let map;
    let result;
    result = [];
    map = [];
    aux = 0;
    while (crates_done.length > 0) {
        if (crates_done[0] > aux)
            aux = crates_done[0];
        if (crates_done[0].length === 3)
            map.push(defineCrateSizes(crates_done[0], 0));
        else if (crates_done[0].length === 2) {
            map.push(defineCrateSizes(crates_done[0], aux));
            aux = 0;
        }
        map.push(start.arrayLess(crates_done.splice(0, 1)));
    }
    return (invert(map, map.length - 1, result));
}
exports.finishedDimensions = finishedDimensions;
//This function is responsible to handle all last works on the list and return
//the finished solved list.
function lastStep(layer_size, list, len, storage) {
    if (list.length <= 0)
        return (storage);
    layer_size = next_work.standardLayer(list);
    storage = storage.concat(start.crateArrange(layer_size, list, len));
    storage.push(layer_size);
    return (lastStep(layer_size, list, len = 0, storage));
}
exports.lastStep = lastStep;
__exportStar(require("./procedures.adm"), exports);
