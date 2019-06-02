"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var child_process_1 = require("child_process");
var fs_1 = require("fs");
var lodash_1 = require("lodash");
var path = require("path");
var path_1 = require("path");
var program = require("commander");
var semver_1 = require("semver");
var projName = 'nwx-cfg';
var projDir = path_1.resolve(__dirname, '..');
var porjPkgJson = require(path.join(projDir, 'package.json'));
var moduleBuildPath = path.join(projDir, 'builds', projName);
var modulePkgPath = path.join(projDir, 'builds', projName, 'package.json');
var publishOptions = "--access public --non-interactive --no-git-tag-version ";
var execute = function (script) {
    return new Promise(function (resolvePromise, rejectPromise) {
        child_process_1.exec(script, function (error, stdout, stderr) {
            if (error) {
                rejectPromise(stderr);
            }
            else {
                resolvePromise(stdout);
            }
        });
    });
};
function syncPackageData() {
    return __awaiter(this, void 0, void 0, function () {
        var modulePkg, parentInfo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    modulePkg = require(modulePkgPath);
                    parentInfo = lodash_1.pick(porjPkgJson, [
                        'author',
                        'version',
                        'license',
                        'homepage',
                        'repository',
                        'contributors',
                        'keywords',
                        'bugs'
                    ]);
                    modulePkg = __assign({}, modulePkg, parentInfo);
                    // flush new files to build dir of each package
                    return [4 /*yield*/, fs_1.writeFile(modulePkgPath, JSON.stringify(modulePkg, null, 2), function () {
                            console.error("Flushed package.json  ...");
                        })];
                case 1:
                    // flush new files to build dir of each package
                    _a.sent();
                    return [4 /*yield*/, fs_1.writeFileSync(path.join(moduleBuildPath, './README.md'), fs_1.readFileSync('./README.md'))];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function buildPackage() {
    return __awaiter(this, void 0, void 0, function () {
        var cmd;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!program.build) return [3 /*break*/, 2];
                    cmd = "ng build --prod";
                    console.log(cmd);
                    return [4 /*yield*/, execute(cmd)["catch"](function (error) {
                            console.log("Failed to build @nwx/cfg ... " + error);
                            return false;
                        })];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2: return [2 /*return*/, true];
            }
        });
    });
}
function getDevVersion() {
    return __awaiter(this, void 0, void 0, function () {
        var lastCommit, commitHash, version, semVer, devVersion;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, execute('git rev-parse HEAD')];
                case 1:
                    lastCommit = _a.sent();
                    commitHash = lastCommit
                        .toString()
                        .trim()
                        .slice(0, 10);
                    version = semver_1.parse(porjPkgJson.version);
                    semVer = version.major + "." + version.minor + "." + version.patch;
                    devVersion = semVer + "-dev-" + commitHash;
                    return [2 /*return*/, devVersion];
            }
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var built, newVersion, publishCmd;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, buildPackage()];
                case 1:
                    built = _a.sent();
                    if (!built) {
                        return [2 /*return*/, 1];
                    }
                    return [4 /*yield*/, syncPackageData()];
                case 2:
                    _a.sent();
                    newVersion = porjPkgJson.version;
                    publishCmd = "yarn publish " + publishOptions + " --new-version " + newVersion + " --tag latest";
                    if (!program.dev) return [3 /*break*/, 4];
                    return [4 /*yield*/, getDevVersion()];
                case 3:
                    newVersion = _a.sent();
                    publishCmd = "yarn publish " + publishOptions + " --new-version " + newVersion + " --tag dev";
                    _a.label = 4;
                case 4:
                    if (!program.publish) return [3 /*break*/, 6];
                    console.log('Publishing new version', newVersion);
                    console.log(publishCmd);
                    return [4 /*yield*/, execute("cd " + moduleBuildPath + " && " + publishCmd)["catch"](function (error) {
                            console.log("Failed to publish package. " + error);
                        })];
                case 5:
                    _a.sent();
                    if (!program.dev) {
                        console.log('You probably want to also tag the version now:');
                        console.log(" git tag -a " + newVersion + " -m 'version " + newVersion + "' && git push --tags");
                    }
                    _a.label = 6;
                case 6: return [2 /*return*/];
            }
        });
    });
}
program
    .version('0.0.1', '-v, --version')
    .option('-b, --build', 'Build @nwx/cfg')
    .option('-p, --publish', 'Publish @nwx/cfg@latest')
    .option('-d, --dev', 'Publish @nwx/cfg@next')
    .parse(process.argv);
main();
