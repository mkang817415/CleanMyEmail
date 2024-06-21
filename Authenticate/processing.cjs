/* eslint-disable no-undef */ 
const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const {authenticate} = require('@google-cloud/local-auth');
const {google} = require('googleapis');

const {authorize } = require('./authenticate.cjs');


/**
 * Lists the labels in the user's account.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
async function listLabels(auth) {
   const gmail = google.gmail({version: 'v1', auth});
   const res = await gmail.users.labels.list({
     userId: 'me',
   });
   const labels = res.data.labels;
   if (!labels || labels.length === 0) {
     console.log('No labels found.');
     return;
   }
   console.log('Labels:');
   labels.forEach((label) => {
     console.log(`- ${label.name}`);
   });
 }

 authorize().then(listLabels).catch(console.error);