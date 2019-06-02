"use strict";
/**
 * @license
 * Copyright Neekware Inc. All Rights Reserved.
 *
 * Use of this source code is governed by a proprietary notice
 * that can be found at http://neekware.com/license/PRI.html
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var shelljs_1 = require("shelljs");
var path = require("path");
var program = require("commander");
exports.PROJ_DIR = '..';
exports.PROJ_PKG_PATH = path.join(exports.PROJ_DIR, 'package.json');
var DEBUG = false;
/**
 * Update packages
 */
function update2Latest(pkgName, devDep) {
    if (devDep === void 0) { devDep = true; }
    return __awaiter(this, void 0, void 0, function () {
        var pkgMgr, cmd, devFlag, devFlag_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    pkgMgr = program.manager || 'yarn';
                    cmd = "yarn add " + pkgName;
                    devFlag = '-D';
                    if (pkgMgr === 'npm') {
                        cmd = "npm install " + pkgName;
                        devFlag_1 = '--save-dev';
                    }
                    if (devDep) {
                        cmd = cmd + " " + devFlag;
                    }
                    console.log("Updating " + pkgName + " ...");
                    return [4 /*yield*/, shelljs_1.exec(cmd, { silent: !DEBUG })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function updateDependencies() {
    return __awaiter(this, void 0, void 0, function () {
        var pkgCfg, _a, _b, _i, pkgName;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    pkgCfg = require(exports.PROJ_PKG_PATH);
                    if (!pkgCfg.hasOwnProperty('dependencies')) return [3 /*break*/, 4];
                    _a = [];
                    for (_b in pkgCfg.dependencies)
                        _a.push(_b);
                    _i = 0;
                    _c.label = 1;
                case 1:
                    if (!(_i < _a.length)) return [3 /*break*/, 4];
                    pkgName = _a[_i];
                    return [4 /*yield*/, update2Latest(pkgName, false)];
                case 2:
                    _c.sent();
                    _c.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function updateDevDependencies() {
    return __awaiter(this, void 0, void 0, function () {
        var pkgCfg, _a, _b, _i, pkgName;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    pkgCfg = require(exports.PROJ_PKG_PATH);
                    if (!pkgCfg.hasOwnProperty('devDependencies')) return [3 /*break*/, 4];
                    _a = [];
                    for (_b in pkgCfg.devDependencies)
                        _a.push(_b);
                    _i = 0;
                    _c.label = 1;
                case 1:
                    if (!(_i < _a.length)) return [3 /*break*/, 4];
                    pkgName = _a[_i];
                    return [4 /*yield*/, update2Latest(pkgName, true)];
                case 2:
                    _c.sent();
                    _c.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, updateDependencies()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, updateDevDependencies()];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
program
    .version('0.0.1', '-v, --version')
    .option('-m', '--manager <manager>', 'Package manager, [yarn | npm] (default: yarn)')
    .parse(process.argv);
main()["catch"](function (err) {
    console.error("Error updating package.json", err);
    process.exit(111);
});
