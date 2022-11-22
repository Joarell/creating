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
exports.boss = exports.whichAirport = exports.finishedOp = void 0;
const next_work = __importStar(require("./next.work.checker"));
const man = __importStar(require("./procedures.adm"));
//This function returns how many crates each airport will have based on the
//crates from the list.
function finishedOp(list, g_crates, g_cub, v_crates, v_cub) {
    let gru;
    let vcp;
    if (v_crates.length === 0 && g_crates.length > 0) {
        gru = ["GRU", g_crates, "cub", g_cub];
        return (list.push(gru));
    }
    else if (v_crates.length > 0 && g_crates.length === 0) {
        vcp = ["VCP", v_crates, "cub", v_cub];
        return (list.push(vcp));
    }
    else if (v_crates && g_crates > 0) {
        gru = ["GRU", g_crates, "cub", g_cub];
        vcp = ["VCP", v_crates, "cub", v_cub];
        list.push(gru);
        list.push(vcp);
        return (list);
    }
    else
        return (list);
}
exports.finishedOp = finishedOp;
//This function provides which will be the airport to ship all the crates, or
//partially between them based on the provided list.
function whichAirport(proc_list) {
    let i;
    let g_crates;
    let v_crates;
    let g_cub;
    let v_cub;
    const pax_lim = [300, 200, 160];
    i = 0;
    g_crates = 0;
    g_cub = 0;
    v_crates = 0;
    v_cub = 0;
    while (i < proc_list) {
        if (proc_list[i][0] === "Final" && proc_list[i][1] <= pax_lim[0] &&
            proc_list[i][2] <= pax_lim[1] && proc_list[i][3] <= pax_lim[2]) {
            g_crates++;
            g_cub += proc_list[i][4];
        }
        else if (proc_list[i][0] === "Final") {
            v_crates++;
            v_cub += proc_list[i][4];
        }
        i++;
    }
    return (finishedOp(proc_list, g_crates, g_cub, v_crates, v_cub));
}
exports.whichAirport = whichAirport;
//This function is responsible to handle all the steps in order to solve the
//art work list.
function boss(the_list) {
    let crates;
    let std_layer;
    let largest;
    let proc_list;
    let layer;
    largest = [];
    std_layer = [];
    proc_list = man.firstThingFirst(the_list);
    crates = man.sameSizesChecker(proc_list);
    layer = proc_list.length;
    next_work.noCanvasOut(proc_list, layer, largest);
    if (largest.length != 0) {
        if (crates.length > 0)
            crates = crates.concat(man.largest(largest, crates, std_layer));
        else
            crates = man.largest(largest, crates, std_layer);
    }
    else
        next_work.noCanvasOut(proc_list, layer, largest);
    crates = man.lastStep(std_layer, proc_list, 0, crates);
    return (whichAirport(man.finishedDimensions(crates)));
}
exports.boss = boss;
const test = {
    88800: "70, 70, 70",
    230202: "70, 70, 70",
    1298: "200, 05, 100",
    123: "100, 05, 100",
    5908: "150, 05, 90",
    8899: "120, 03, 100",
    777: "50, 03, 50",
    8980: "30, 03, 30",
    71234: "30, 03, 30",
    1111: "30, 03, 30",
    2313: "30, 03, 30",
    1112: "60, 05, 90",
    1897: "180, 05, 100",
    9897: "75, 05, 80",
    9884: "100, 05, 120",
    8745: "130, 05, 100",
    8877: "160, 05, 160",
    34733: "130, 05, 50",
    18988: "130, 05, 50",
    38388: "130, 05, 50",
    75784: "130, 05, 50",
    90909: "100, 05, 90",
    12345: "89, 05, 88",
    98099: "120, 03, 100",
    44444: "60, 5, 60",
    98239: "40, 5, 50",
    23984: "40, 5, 50",
    999299: "40, 5, 50",
    134144: "40, 5, 50",
    121231: "50, 5, 50",
    190923: "50, 5, 50",
    9898: "50, 5, 50",
    98888: "50, 5, 50",
    11111: "60, 5, 60",
    22222: "60, 5, 60",
    33333: "60, 5, 60",
};
console.log(boss(test));
console.log(test);
console.log("Finished!");
console.log("Done!");
__exportStar(require("./start.adm"), exports);
