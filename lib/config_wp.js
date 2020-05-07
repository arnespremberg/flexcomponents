#!/usr/bin/env node

require('dotenv').config()
const { exec } = require('child_process')

exec(`vendor/bin/wp --path=public  config create --dbname=${process.env.DB_NAME} --dbuser=${process.env.DB_USER} --dbpass=${process.env.DB_PASS}`, (err, stdout) => {
    err ? console.error(err) : console.log(stdout)

    exec(`vendor/bin/wp --path=public  config set WP_DEBUG ${process.env.DEBUG} --raw`, (err, stdout) => {
        err ? console.error(err) : console.log(stdout)
    })
    
    exec(`vendor/bin/wp --path=public  config set table_prefix ${process.env.DB_PREFIX}`, (err, stdout) => {
        err ? console.error(err) : console.log(stdout)
    })
})
