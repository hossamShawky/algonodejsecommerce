/* eslint-disable import/no-extraneous-dependencies */
const { Pool } = require('pg');
const fs = require('fs');
const { getConfig } = require('../util/getConfig');

// Use env for the database connection, maintain the backward compatibility
const connectionSetting = {
  user: "doadmin",
  host: "evershop-do-user-8222163-0.f.db.ondigitalocean.com",
  database:process.env.DB_NAME,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD || getConfig('system.database.password'),
   max: 20
};
console.log(process.env.DB_PORT);
// Support SSL
const sslMode = process.env.DB_SSLMODE || getConfig('system.database.ssl_mode');
switch (sslMode) {
  case 'disable': {
    connectionSetting.ssl = false;
    break;
  }
  case 'require':
  case 'prefer':
  case 'verify-ca':
  case 'verify-full': {
    const ssl = {
      rejectUnauthorized: true
    };
    const ca = process.env.DB_SSLROOTCERT;
    if (ca) {
      ssl.ca = fs.readFileSync(ca).toString();
    }
    const cert = process.env.DB_SSLCERT;
    if (cert) {
      ssl.cert = fs.readFileSync(cert).toString();
    }
    const key = process.env.DB_SSLKEY;
    if (key) {
      ssl.key = fs.readFileSync(key).toString();
    }
    connectionSetting.ssl = ssl;
    break;
  }
  case 'no-verify': {
    connectionSetting.ssl = {
      rejectUnauthorized: false
    };
    break;
  }
  default: {
    connectionSetting.ssl = false;
    break;
  }
}

const pool = new Pool(connectionSetting);
// Set the timezone
pool.on('connect', (client) => {
  const timeZone = getConfig('shop.timezone', 'UTC');
  client.query(`SET TIMEZONE TO "${timeZone}";`);
});

async function getConnection() {
  // eslint-disable-next-line no-return-await
  return await pool.connect();
}

// eslint-disable-next-line no-multi-assign
module.exports = exports = { pool, getConnection };