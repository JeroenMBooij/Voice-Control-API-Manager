"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestService = void 0;
class TestService {
    constructor() {
    }
    static getInstance() {
        if (!TestService.instance) {
            TestService.instance = new TestService();
        }
        return TestService.instance;
    }
    //#region week 1
    week1Bronze() {
        let dirname = process.argv[2]; //De folder om in te zoeken
        let ext = process.argv[3]; //De extensie waarop we willen zoeken.
        let pat = RegExp('\\.' + ext + '$');
        console.log("searching for all files in '" + dirname + "' with extension '" + ext + "'");
        console.log("---------------------------");
        var fs = require('fs');
        let file = fs.readdir(dirname, function (err, files) {
            for (let i = 0; i < files.length; i++) {
                if (ext == undefined || pat.test(files[i])) {
                    console.log(files[i]);
                }
            }
        });
    }
    week1Silver() {
        return 'Hello World\n';
    }
    week1Gold() {
    }
}
exports.TestService = TestService;
