#!/usr/bin/env node

require('dotenv').config()
const fs = require('fs')
const [, , ...args] = process.argv
const loader = `  case "${args}":\n    include dirname(__FILE__) . "/components/${args}/index.php";\n  break;\n\n\/* FLEXCOMP_INSERT_HERE *\/`

fs.mkdirSync(`./src/components/${args}`, { recursive: true })

fs.mkdirSync(`./src/components/${args}/assets`, { recursive: true })

fs.readdir(`./lib/component/`, (err, files) => {
    err && console.error(err)

    files.forEach((file) => {
        fs.readFile(`./lib/component/${file}`, 'utf8', (err, data) => {
            err && console.error(err)
            data = data.replace(/COMPONENT/g, args)

            fs.writeFile(`./src/components/${args}/${file}`, data, (err) => {
                err
                    ? console.error(err)
                    : console.log(`Generated ${file} for component ${args}`)
            })
        })
    })
})

fs.readFile(`./src/load_components.php`, 'utf8', (err, data) => {
    err && console.error(err)
    data = data.replace(/\/\*.+?\*\/|\/\/.*(?=[\n\r])/g, loader)

    fs.writeFile(`./src/load_components.php`, data, (err) => {
        err
            ? console.error(err)
            : console.log(`Registered Component ${args}`)
    })
})