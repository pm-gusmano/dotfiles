#!/usr/bin/env node
const inquire = require('inquirer')
const fse = require('fs-extra')
const p = require('path')
const { readFileSync } = require('fs')

inquire.prompt([
    {
        type: 'list',
        message: "Pick a setting",
        name: "choice",
        choices: ["server", "server and router", "server, router and db"]
    }
]).then(({ choice }) => {
    const src = {
        "server": p.resolve(__dirname,'..', 'projects','server'),
        "server and router": p.resolve(__dirname,'..', 'projects','server_router'),
        "server, router and db": p.resolve(__dirname,'..', 'projects','server_router_db'),
    }
    const dest = process.cwd()
    fse.copy(src[choice], dest).then(() => console.log('run $ npm i koa config js-yaml!')).catch((e)=> console.log(e))
})
