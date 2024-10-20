// /* eslint-disable import/no-extraneous-dependencies */
// const { Pool } = require('pg');
// const fs = require('fs');
// const { getConfig } = require('../util/getConfig');

// // Use env for the database connection, maintain the backward compatibility
// const connectionSetting = {
//   // host: process.env.DB_HOST || getConfig('system.database.host'),
//   // port: process.env.DB_PORT || getConfig('system.database.port'),
//   // user: process.env.DB_USER || getConfig('system.database.user'),
//   // password: process.env.DB_PASSWORD || getConfig('system.database.password'),
//   // database: process.env.DB_NAME || getConfig('system.database.database'),
//   // max: 20
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false, // Disable SSL certificate verification
//   },
// };

// // Support SSL
// const sslMode = process.env.DB_SSLMODE || getConfig('system.database.ssl_mode');
// switch (sslMode) {
//   case 'disable': {
//     connectionSetting.ssl = false;
//     break;
//   }
//     case 'require':
//   case 'prefer':
//   case 'verify-ca':
//   case 'verify-full': {
//     const ssl = {
//       rejectUnauthorized: false
//     };
//     // const ca = process.env.DB_SSLROOTCERT;
//     // if (ca) {
//     //   ssl.ca = fs.readFileSync(ca).toString();
//     // }
//     // const cert = process.env.DB_SSLCERT;
//     // if (cert) {
//     //   ssl.cert = fs.readFileSync(cert).toString();
//     // }
//     // const key = process.env.DB_SSLKEY;
//     // if (key) {
//     //   ssl.key = fs.readFileSync(key).toString();
//     // }
//     // connectionSetting.ssl = ssl;
//     // break;
//   }
//   case 'no-verify': {
//     connectionSetting.ssl = {
//       rejectUnauthorized: false
//     };
//     break;
//   }
//   default: {
//     connectionSetting.ssl = false;
//     break;
//   }
// }

// const pool = new Pool(connectionSetting);
// // Set the timezone
// pool.on('connect', (client) => {
//   const timeZone = getConfig('shop.timezone', 'UTC');
//   client.query(`SET TIMEZONE TO "${timeZone}";`);
// });

// async function getConnection() {
//   // eslint-disable-next-line no-return-await
//   return await pool.connect();
// }

// // eslint-disable-next-line no-multi-assign
// module.exports = exports = { pool, getConnection };





const { Pool } = require('pg');
const fs = require('fs');
const { getConfig } = require('../util/getConfig');
// const ca = Buffer.from(process.env.DB_SSLROOTCERT, 'base64').toString('utf8');

const connectionSetting = {
  // connectionString: process.env.DATABASE_URL,
  //   host: process.env.DB_HOST ,
  // port: process.env.DB_PORT  ,
  // user: process.env.DB_USER ,
  // password: process.env.DB_PASSWORD  ,
  // database: process.env.DB_NAME ,

  user: "doadmin",
  host: "evershop-do-user-8222163-0.f.db.ondigitalocean.com",
  database: "defaultdb",
  password: process.env.DB_PASSWORD  ,
  port: 25060,

  
  ssl: {
    rejectUnauthorized: false, 
    // ca: ca,
  },
};

const sslMode = process.env.DB_SSLMODE || getConfig('system.database.ssl_mode');
// switch (sslMode) {
//   case 'disable':
//     connectionSetting.ssl = false;
//     break;
//   case 'require':
//   case 'prefer':
//   case 'verify-ca':
//   case 'verify-full':
//     const ssl = {
//       rejectUnauthorized: false,
//     };
//     // Uncomment and modify if needed
//     // const ca = process.env.DB_SSLROOTCERT;
// const ca = Buffer.from(process.env.DB_SSLROOTCERT, 'base64').toString('utf8');

//     if (ca) {
//       ssl.ca = fs.readFileSync(ca).toString();
//     }
//     const cert = process.env.DB_SSLCERT;
//     if (cert) {
//       ssl.cert = fs.readFileSync(cert).toString();
//     }
//     const key = process.env.DB_SSLKEY;
//     if (key) {
//       ssl.key = fs.readFileSync(key).toString();
//     }
//     connectionSetting.ssl = ssl;
//     break;
//   case 'no-verify':
//     connectionSetting.ssl = {
//       rejectUnauthorized: false,
//     };
//     break;
//   default:
//     connectionSetting.ssl = false;
//     break;
// }

const pool = new Pool(connectionSetting);

pool.on('connect', (client) => {
  const timeZone = getConfig('shop.timezone', 'UTC');
  client.query(`SET TIMEZONE TO "${timeZone}";`);
});

async function getConnection() {
  try {
    const client = await pool.connect();
    return client;
  } catch (error) {
    console.error('Database connection failed:', {
      message: error.message,
      stack: error.stack,
      // You can also log other relevant details like:
      // connectionSetting,
    });
    throw error; // Optionally rethrow the error if you want to handle it further up the stack
  }
}

module.exports = { pool, getConnection };
