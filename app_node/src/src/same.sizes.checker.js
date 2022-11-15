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
exports.sameSizes = exports.checking = exports.howManySizes = exports.zeroSizes = exports.defineCrate = void 0;
const clean = __importStar(require("./layer.puzzle.man"));
const arrange = __importStar(require("./labor.same.sizes.man"));
//This function provides de map of each sizes found at howManySizes.
function defineCrate(works_sizes) {
    let sizes;
    let crate;
    let i;
    let result;
    i = 0;
    sizes = [];
    result = [];
    while (i++ < works_sizes.length - 1) {
        if (!Array.isArray(works_sizes[i]))
            sizes.push(works_sizes[i]);
    }
    i = 0;
    while (i <= sizes.length) {
        if (i + 1 < sizes.length && sizes[i] != sizes[i + 1])
            sizes[i].push(1);
        i++;
    }
    result = arrange.manager(works_sizes, sizes);
    return (result);
}
exports.defineCrate = defineCrate;
//This funciont is responsible to check if all works were put int to the crate.
function zeroSizes(work_list, sizes) {
    let crate;
    let tmp;
    let len;
    let dump;
    let drain;
    tmp = [];
    crate = [];
    len = work_list.length - 1;
    //this arrow function drops the tmp content to crate variable.
    drain = (t, c) => {
        if (t.length <= 0)
            return (c);
        c.unshift(clean.arrayLess(t.splice(0, 1)));
        return (drain(t, c));
    };
    //this arrow function drops the work_list content to tmp variable.
    dump = (w, s, l) => {
        if (w[len][1] === s[s.length - 2][1])
            return (tmp = clean.arrayLess(tmp));
        if (w[len][1] != s[0][1])
            tmp.push(work_list.splice(len, 1));
        return (dump(w, s, len--));
    };
    while (work_list.length > 0) {
        if (sizes.length > 0 && work_list[0][0] === sizes[0][0])
            crate.unshift(defineCrate(sizes));
        if (sizes.length != 0)
            dump(work_list, sizes, len);
        else {
            tmp.push(work_list.splice(0, len + 1));
            tmp = clean.arrayLess(tmp);
        }
        if (tmp.length > 0)
            drain(tmp, crate);
    }
    return (crate);
}
exports.zeroSizes = zeroSizes;
//This function is the second part to solve all the equal works with the 
//same sizes. The design argument is regarding to consolidate or not the works
//in side de same crate.
function howManySizes(works) {
    let len;
    let counter;
    let i;
    let last;
    i = 0;
    len = 0;
    last = 0;
    counter = [];
    while (len <= works.length) {
        if (len === works.length) {
            counter.push(len - last);
            break;
        }
        else if (counter.length === 0 || counter[i][1] != works[len][1]) {
            if (counter.length != 0) {
                i += 2;
                counter.push(len - last);
                last = len;
            }
            if (works[len])
                counter.push(works[len]);
        }
        len++;
    }
    return (zeroSizes(works, counter));
}
exports.howManySizes = howManySizes;
//This function check if all sizes of the works is really equal to take it 
//of the list.
function checking(arr, works, length) {
    let cleaner;
    if (length > works.length - 1 || works[length][4] != arr[0][4])
        return;
    if (works[length][1] === arr[0][1] && works[length][2] === arr[0][2]
        && works[length][3] === arr[0][3]) {
        cleaner = works.splice(length, 1);
        cleaner = clean.arrayLess(cleaner);
        arr.push(cleaner);
    }
    else
        length++;
    return checking(arr, works, length);
}
exports.checking = checking;
//This function finds the works 4 works or more with the same sizes based on
//the cube values.
function sameSizes(list) {
    let len;
    let equals;
    let checked;
    let remainder;
    len = 0;
    equals = [];
    checked = [];
    remainder = [];
    while (len <= list.length - 1) {
        if (list[len][2] <= 10) {
            checked = list.splice(0, 1);
            checking(checked, list, 0);
            if (checked.length <= 3)
                remainder = remainder.concat(checked);
            else
                equals = equals.concat(checked);
            checked.splice(0, checked.length);
        }
        len++;
    }
    if (equals.length > 3) {
        equals.unshift(howManySizes(equals));
        while (remainder.length > 0)
            list.push(clean.arrayLess(remainder.splice(0, 1)));
        return (clean.arrayLess(equals));
    }
    list.unshift(0);
    return (list);
}
exports.sameSizes = sameSizes;
__exportStar(require("./same.sizes.checker"), exports);
