var fg = require("fast-glob");
let fs = require("fs-extra");
let rimraf = require("rimraf");
let config = require("../build-config");
rimraf.sync("dist");

fs.mkdirSync("dist");
fs.copySync("src/", "dist");

function replaceTextByGlobPattern(srcGlobPattern, searchRegexPatterns, replaceValues) {
    fg.sync(srcGlobPattern).forEach(f => {
        let fileContent = fs.readFileSync(f).toString();
        searchRegexPatterns.forEach((regex, index) => {
            fileContent = fileContent.replace(regex, replaceValues[index]);
        })
        fs.writeFileSync(f, fileContent);
    });
}

function replaceWynHost() {
    replaceTextByGlobPattern(
        ["dist/**/*.html", "dist/**/*.js"],
        [/WYN_SERVER_HOST/g, /WYN_SERVER_TOKEN/g, /WYN_INTERFACE_HOST/g, /WYN_INTERFACE_TOKEN/g],
        [config.WynHost, config.WynToken, config.WynInterfaceHost, config.WynInterfaceToken]);
}

replaceWynHost();