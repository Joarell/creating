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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.big_work = exports.cubing = exports.pythagoras = void 0;
// This is a replicable Pythagoras`s theorem.
// a**2 = b**2 + c**2
function pythagoras(a, b, c) {
    if (a && b && !c) {
        a = a ** 2;
        b = b ** 2;
        c = a - b;
        return (Math.floor(Math.sqrt(c)));
    }
    else if (a && !b && c) {
        a = a ** 2;
        c = c ** 2;
        b = a - c;
        return (Math.floor(Math.sqrt(b)));
    }
    else {
        b = b ** 2;
        c = c ** 2;
        a = b + c;
        return (Math.floor(Math.sqrt(a)));
    }
}
exports.pythagoras = pythagoras;
//This function returns the cubed value to the work.
function cubing(dimensions) {
    const cm_to_m = 1000000;
    const cubed = dimensions[1] * dimensions[2] * dimensions[3] / cm_to_m;
    return (Math.floor(cubed * 1000) / 1000);
}
exports.cubing = cubing;
//This function returns the biggest cubed work.
function big_work(work_list) {
    let cubed;
    let greatest;
    cubed = 0;
    greatest = 0;
    work_list.forEach(work => {
        cubed = work;
        if (cubed > greatest) {
            greatest = cubed;
        }
    });
    return (greatest);
}
exports.big_work = big_work;
__exportStar(require("./extras.math"), exports);
