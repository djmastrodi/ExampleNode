/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */

const fs = require('fs');
const fetch = require('../services/node_modules/node-fetch');

const jsonData = fs.readFileSync('../tasks/pyramid/testPyramid.json');
const j = JSON.parse(jsonData);

const url = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSfXs_mH-Jc5I7oIN17rWuwUlsHUjyAuC6eDbg8vPsq4GV0O8g/formResponse';
const edit = '?edit2=2_ABaOnucMe86LGR_ZrFCNz6DKa7sqbV6tlgohmB8WCjUjgOrSlBAE28j_mbpaPVYZBep21Nk';
let body = '';
body += `entry.1541583461=${j.u}&`;
//body += `entry.656124587=${j.cp}&`;
body += `entry.1018214976=${j.i}&`;
body += `entry.387668578=${j.ct}&`;
body += `entry.1115479058=${j.e}&`;
console.log(body)
fetch(url + edit, {
  body,
  method: 'POST',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
})
  .then(() => {
    console.log(j);
  });
