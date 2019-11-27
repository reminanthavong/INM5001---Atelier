"use strict";

const { Pool } = require('pg');

class Db {
        constructor(file) {
            this.db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

        }
         
        selectByEmail(email, callback) {
            return this.db.get(
                `SELECT * FROM userAuth WHERE email = ?`,
                [email], function (err, row) {
                    callback(err, row)
                })
        }
        insert(user, callback) {
            return this.db.run(
                'INSERT INTO userAuth (name,email,password) VALUES (?,?,?)',
                user, (err) => {
                    callback(err)
                })
        }
    }
module.exports = Db

