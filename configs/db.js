const{Client } = require("pg");
const client = new Client ({
  user:process.env.PSQl_USER, 
  host:process.env.PSQl_HOST, 
  database:process.env.PSQl_DATABASE, 
  password:process.env.PSQl_PASS, 
  port: 5432,
});

module.exports =  client;