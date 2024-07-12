const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'Zokou-MD-WHATSAPP-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS1BlQms2QlpYYTh2MWwrMkRmOFI5Y1BnME1EU3R3ckgyZWhzeVlvWHZrTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV0ZmcTVoR0h2YmdBQ3c3dmtCdDIyc1RCNnZWV05ndG85blREcXpRUDV5UT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJlTVRyQ2pyVW5UZUFaRWQ4bXNOMWMwbDhXZXVjanp5bFVVdHNWSHJ6UUcwPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJYbUNRZ2Fsdk5sNFN3TEZ2cUFSOGZlc2NXOGY0eXZ2RTRGck9FQ0hzbkE4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1IeXN2UXMyU0lrcnlhSDhHUFc0ZUJja1VFb05FZlI1S090TlBHTjFlbE09In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjF4eDhtMmNXeVFIUnd5UkY3STJyZ2w0K0luRnZ2V0FkSnh6MHpRNnhPd0U9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0h1Ny9RRkpBQ2lSOHozbzd0bHdFNEMwazdaTlZVOWNqY2tqWnBsNEhFYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUJseWFkSVdWeUdBTmhUaGI3YkdTNDFxRUlQZzJ4eVZqSTNyUS9DWXlUST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklmdVRicXBuem1PcG02RDdIM3lkVGtUVkpqSWRDK1ZXMWhLZmhhY2xiYkFiN3Q4eTk0K0xQNmYyWndiR3BhVWVyQnJONFJOcnpONndKQ0hTNDRxeGdBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjQsImFkdlNlY3JldEtleSI6IkNXbmZHRlFIRFNHOGtDZmtHL2pKYVhwdkZzUnNjVDRXZGJrb3FLYjI1UWM9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjM3NjU2Mjc2OTgwQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjY5MTYyMDZDMUJEMjZEQ0VEN0MwQjdFRkNDOUU3QTA0In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MjA4MTcyMDN9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IlZlTld6Y2dZUzVlX0R6Z1lJYmk2cnciLCJwaG9uZUlkIjoiMzZjZmQ3MWMtNGUxNS00MDU0LTlmM2ItZDM2Yzg0ZTRjN2IzIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImxBaExhWEUrQWgwM04vMHRMd1kvcnFQZDFYRT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJObTR2c3BheVQ2WW5jNmJCMnh4and3T0QzZG89In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiMVNIOEY3RTYiLCJsYXN0UHJvcEhhc2giOiIxbE9TRUkiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBSUlEUT09In0sIm1lIjp7ImlkIjoiMjM3NjU2Mjc2OTgwOjEzQHMud2hhdHNhcHAubmV0IiwibmFtZSI6IuKAovCdkJLwnZCU8J2QjfCdkIbigKLwnZCJ8J2QiPCdkI3wnZCW8J2QjvCdkI7igKJMRU9OSURBUyIsImxpZCI6IjEwMjMxMDg2ODk3OTkxNjoxM0BsaWQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0xudTBLSUZFS2lzeHJRR0dBSWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IlRsa3hHdy9GWThYMkVWM1dKNlZhbU9RTWdvK2FveEhwMExtODNKeDZtbEE9IiwiYWNjb3VudFNpZ25hdHVyZSI6Ind5Q1NDR0pjM09FQUxRMkIwZlVCclIxdEhsODBCVU94dVdiSHREL3JBdEV5NDhGT1lQOVJ4Lzg0eDVxK1QwZnQzTTNBdmZkcDBab0JyWGVpanF6aER3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJlUWZ5aXFUdkM3cUNYVlNmVXJXTkJSZmdrTU5sdlk1RkV2eVQxNG53eEJXYVA2ZlJFcWtLRDB6K3NiNXJ1dDROR3ZQZGF6SFd4TzFXOXgybHJjN2JnQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNzY1NjI3Njk4MDoxM0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJVNVpNUnNQeFdQRjloRmQxaWVsV3Bqa0RJS1BtcU1SNmRDNXZOeWNlcHBRIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIwODE3MTk1LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUJ3byJ9',
     ETAT:process.env.ETAT,
    PREFIXE: process.env.PREFIXE,#
    NOM_OWNER: process.env.NOM_OWNER || "SUNG JINWOO ",
    NUMERO_OWNER : PROCESS.ENV.NUMERO,         
    LECTURE_AUTO_STATUS: process.env.LECTURE_AUTO_STATUS || "non",
    TELECHARGER_AUTO_STATUS: process.env.TELECHARGER_AUTO_STATUS || 'non',
    MODE: process.env.MODE_PUBLIC,
    PM_PERMIT: process.env.PM_PERMIT || 'non',
    BOT : process.env.NOM_BOT || 'ARISE',
    URL : process.env.LIENS_MENU || 'https://telegra.ph/file/9e44fb1e2d90aae66d7f2.jpg',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    //GPT : process.env.OPENAI_API_KEY,
    DP : process.env.STARTING_BOT_MESSAGE || 'oui',
    ATD : process.env.ANTI_DELETE_MESSAGE || 'non',            
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
