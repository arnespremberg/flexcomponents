#!/usr/bin/env node

require('dotenv').config()
const fs = require('fs')
const { exec } = require('child_process')

const [,, ...args] = process.argv
const name = process.env.THEME_NAME

exec(`vendor/bin/wp --path=public scaffold taxonomy ${args}`, (err, stdout) => {
    if (err) {
        console.error(err)
    }
    else {
        fs.writeFile(`./src/functions/cpt_${args}.php`, stdout, (err) => {
            err
                ? console.error(err)
                : console.log(`Generated post type in ./src/functions/tax_${args}.php`)
        })
    }
})