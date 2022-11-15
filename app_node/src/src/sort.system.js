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
exports.newArraySorted = exports.zipper = exports.quickSort = exports.cubeAll = exports.getDimensions = exports.splitInt = void 0;
const extra_math = __importStar(require("./extras.math"));
//This function is responsible to get only the sizes of the Object split with ",".
function splitInt(dimensions, codes) {
    dimensions = dimensions.split(",");
    let work_dimensions = [];
    let i = 0;
    while (i != 3) {
        work_dimensions.push(parseInt(dimensions[i]));
        i++;
    }
    work_dimensions.unshift(codes);
    return work_dimensions;
}
exports.splitInt = splitInt;
//This function get the codes and sizes of the works from the list proveided.
function getDimensions(w_list) {
    let i = 0;
    let hold = 0;
    let code = 0;
    let dimensions = [];
    // while (i < Object.values(w_list).length) {
    hold = (Object.values(w_list)[i]);
    code = (Object.keys(w_list)[i]);
    dimensions.push(splitInt(hold, code));
    i++;
}
exports.getDimensions = getDimensions;
return dimensions;
//This function provides the airfreight cube to each sizes of the works in the 
//Object list.
function cubeAll(w_list) {
    let result = [];
    let i = 0;
    let dimensions = getDimensions(w_list);
    while (i < dimensions.length) {
        result.push(extra_math.cubing(dimensions[i]));
        i++;
    }
    return result;
}
exports.cubeAll = cubeAll;
//This function acts sorting the smallest work to the biggest one. The "index"
//argument provides the correct array index where the value is to be sorted.
function quickSort(works, index) {
    if (works.length <= 1)
        return works;
    let left = [];
    let right = [];
    let i = 0;
    let pivot = [works[0]];
    while (i++ < works.length - 1)
        works[i][index] <= pivot[0][index] ? left.push(works[i]) : right.push(works[i]);
    return (quickSort(left, index).concat(pivot, quickSort(right, index)));
}
exports.quickSort = quickSort;
//This function returns the code and cubed values in new arrays to each code
//baased on the its sizes.
function zipper(codes, cubes, index) {
    let new_arranje = [];
    new_arranje.push(codes[index]);
    new_arranje.push(cubes[index]);
    return new_arranje;
}
exports.zipper = zipper;
//This function applies the zipper function to each code and dimensions to 
//provide a new array sorted with the quickSort function.
function newArraySorted(works) {
    let new_a = [];
    let i = 0;
    while (i < Object.values(works).length) {
        new_a.push(zipper(Object.keys(works), cubeAll(works), i));
        i++;
    }
    return quickSort(new_a, 1);
}
exports.newArraySorted = newArraySorted;
__exportStar(require("./sort.system"), exports);
