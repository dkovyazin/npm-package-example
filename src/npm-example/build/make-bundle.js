const path = require("path");
const dtsBundle = require('dts-bundle');
const copyfiles = require('copyfiles');
const pkg = require("../package.json");

const compiledPath = path.join(__dirname, "..", "source");
const distNpmPath = path.join(__dirname, "..", "dist");

async function build() {
    dtsBundle.bundle({
        name: pkg.name,
        main: path.join(compiledPath, 'index.d.ts'),
        out: path.join(distNpmPath, 'index.d.ts'),
        outputAsModuleFolder: true
    });
}

build().then(() => {
    console.log("done");
    copyfiles(["./source/**/*.less", "./dist/"], { up: 1 }, (e) => {
        console.error(e);
    });
    copyfiles(["./source/**/*.svg", "./dist/"], { up: 1 }, (e) => {
        console.error(e);
    })
}, err => console.log(err.message, err.stack));