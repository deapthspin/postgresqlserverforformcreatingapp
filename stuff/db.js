const Pool = require('pg').Pool

const pool = new Pool({
    user: "ovaodtcxfuksdo",
    password: "79a993677e48dd8e057f6a5b5b3a71a9f244a2fc7776eaefb3d0641690398ddc",
    host: "ec2-3-222-74-92.compute-1.amazonaws.com",
    port: 5432,
    database: "d5mph160j3t2rl"
})

module.exports = pool