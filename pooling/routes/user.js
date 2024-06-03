const express = require("express");
const route = express.Router();
const { Pool } = require("pg");
const { Client } = require("pg");
let connected = false;

let oldCount = 0;
let oldSum = 0;
let poolCount = 0;
let poolSum = 0;

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "postgres",
  database: "testdb",
  max: 20,
  connectionTimeoutMillis: 0,
  idleTimeoutMillis: 0,
});

let dbConfigDescriptions = {
  user: "", // string, // default process.env.PGUSER || process.env.USER
  password: "", //  string or function, //default process.env.PGPASSWORD
  host: "", // string, // default process.env.PGHOST
  database: "", //  string, // default process.env.PGDATABASE || user
  port: "", // number, // default process.env.PGPORT
  connectionString: "", //  string, // e.g. postgres://user:password@host:5432/database
  ssl: "", // any, // passed directly to node.TLSSocket, supports all tls.connect options
  types: "", //  any, // custom type parsers
  statement_timeout: "", // number, // number of milliseconds before a statement in query will time out, default is no timeout
  query_timeout: "", //  number, // number of milliseconds before a query call will timeout, default is no timeout
  application_name: "", //  string, // The name of the application that created this Client instance
  connectionTimeoutMillis: "", // number, // number of milliseconds to wait for connection, default is no timeout
  idle_in_transaction_session_timeout: "", // number // number of milliseconds before terminating any session with an open idle transaction, default is no timeout
};

// TODO: paste the below code on console to find efficiency of pool vs client
// for (let i = 0; i < 50; i++) {
//     fetch("http://localhost:3001/user/all/[pool/client]")
//     .then(async(res)=> res)
//     .then((result)=>console.log(result))
// }

route.get("/all/client", async (req, res) => {
  const fromDate = new Date();
  oldCount++;

  const client = new Client({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "postgres",
    database: "testdb",
  });

  //connect
  await client.connect();
  const results = await client.query("select * from users");
  //console.table(results.rows);
  client.end();

  const toDate = new Date();
  const elapsed = toDate.getTime() - fromDate.getTime();
  oldSum += elapsed;

  //send it to the wire
  res.send({
    rows: results.rows,
    elapsed: elapsed,
    avg: Math.round(oldSum / oldCount),
    method: "client",
  });
});

route.get("/all/pool", async (req, res) => {
  const fromDate = new Date();
  poolCount++;

  let results = await pool.query("select * from users");
  const toDate = new Date();
  const elapsed = toDate.getTime() - fromDate.getTime();
  poolSum += elapsed;
  //send it to the wire
  res.send({
    rows: results.rows,
    elapsed: elapsed,
    avg: Math.round(poolSum / poolCount),
    method: "pool",
  });
});
module.exports = route;
