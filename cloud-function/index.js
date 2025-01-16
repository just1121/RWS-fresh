const functions = require('@google-cloud/functions-framework');
const { google } = require('googleapis');
const nodemailer = require('nodemailer');
const credentials = require('./credentials.json');
const twilio = require('twilio');
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Setup transporter and twilioClient
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'awsrws2024@gmail.com',
    pass: process.env.EMAIL_PASS,
  }
});

const SPREADSHEET_ID = '1_z_BdApaUYq7xVkir0t1tEXpG2tjDtoqYRgUzjW1YyQ';

async function writeToGoogleSheets(formData) {
  try {
    console.log('🔍 Starting writeToGoogleSheets...');
    console.log('🔍 Using spreadsheet ID:', SPREADSHEET_ID);
    console.log('🔍 Credentials being used:', {
      client_email: credentials.client_email,
      has_private_key: !!credentials.private_key
    });
    
    const auth = new google.auth.JWT(
      credentials.client_email,
      null,
      credentials.private_key,
      ['https://www.googleapis.com/auth/spreadsheets']
    );
    console.log('✅ Auth created successfully');
    
    const sheets = google.sheets({ version: 'v4', auth });
    console.log('✅ Sheets API initialized');

    // Verify sheet exists
    try {
      const sheetData = await sheets.spreadsheets.get({
        spreadsheetId: SPREADSHEET_ID
      });
      console.log('📊 Sheet info:', sheetData.data.properties.title);
    } catch (sheetError) {
      console.error('❌ Error accessing sheet:', sheetError);
      throw sheetError;
    }

    console.log('📝 Attempting to append data...');
    const timestamp = new Date().toLocaleString('en-US', {
      timeZone: 'America/Los_Angeles',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    const values = [
      formData.firstChoice,
      formData.secondChoice,
      formData.fullName,
      formData.email,
      formData.phone,
      formData.facility,
      timestamp,
      !formData['Source 1'] || formData['Source 1'] === 'No' || formData['Source 1'] === '"No"' ? '' : formData['Source 1'],
      !formData['Source 2'] || formData['Source 2'] === 'No' || formData['Source 2'] === '"No"' ? '' : formData['Source 2'],
      !formData['Usage 1'] || formData['Usage 1'] === 'No' || formData['Usage 1'] === '"No"' ? '' : formData['Usage 1'],
      !formData['Usage 2'] || formData['Usage 2'] === 'No' || formData['Usage 2'] === '"No"' ? '' : formData['Usage 2'],
      !formData['Usage 3'] || formData['Usage 3'] === 'No' || formData['Usage 3'] === '"No"' ? '' : formData['Usage 3'],
      !formData['Disposal 1'] || formData['Disposal 1'] === 'No' || formData['Disposal 1'] === '"No"' ? '' : formData['Disposal 1'],
      !formData['Disposal 2'] || formData['Disposal 2'] === 'No' || formData['Disposal 2'] === '"No"' ? '' : formData['Disposal 2'],
      !formData['Disposal 3'] || formData['Disposal 3'] === 'No' || formData['Disposal 3'] === '"No"' ? '' : formData['Disposal 3']
    ];
    console.log('📝 Values to append:', values);

    const result = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet1',
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [values]
      }
    });
    console.log('✅ Append result:', JSON.stringify(result.data, null, 2));
  } catch (error) {
    console.error('❌ Error in writeToGoogleSheets:', error.message);
    console.error('❌ Full error:', error);
    throw error;
  }
}

functions.http('handleBooking', async (req, res) => {
  console.log('🔍 RECEIVED REQUEST');
  console.log('🔍 Request Method:', req.method);
  console.log('🔍 Request Type:', req.body?.requestType);
  console.log('🔍 Full Body:', JSON.stringify(req.body, null, 2));

  console.log('🔍 Full request body:', req.body);
  console.log('🔍 RequestType:', req.body.requestType);

  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'POST');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  try {
    const { requestType, ...formData } = req.body;

    console.log(`🔍 Incoming RequestType: "${requestType}"`);
    console.log(`🔍 Is signup-only? ${requestType === 'signup-only'}`);
    console.log(`📄 Received Data:`, formData);

    if (!requestType) {
      console.error('❌ Missing requestType in request');
      return res.status(400).json({ error: 'Missing requestType' });
    }

    // 🚨 THIS SECTION ENSURES `signup-only` NEVER SENDS AN EMAIL
    if (requestType === 'signup-only' || requestType === "signup-only") {
      console.log('📄 Writing to Google Sheets (NO EMAIL)');
      await writeToGoogleSheets(formData);
      console.log('✅ Data saved to Google Sheets.');
      return res.status(200).json({ message: 'Data saved to Google Sheets' });
    }

    // 🚨 ONLY SEND EMAIL WHEN REQUEST TYPE IS `email-only`
    if (requestType === 'email-only') {
      console.log('📩 EMAIL: Sending confirmation email...');
      await transporter.sendMail({
        from: {
          name: 'Recovered Water Solutions',
          address: 'awsrws2024@gmail.com'
        },
        to: formData.email,
        subject: 'Water Risk Assessment Scheduling',
        html: `
          <h2>We are glad you have taken the first step to achieve Water Balance at your facility!</h2>
          <p>We will contact you next week to schedule your assessment.</p>
          <h3>Your Details:</h3>
          <p>First Choice: ${formData.firstChoice}</p>
          <p>Second Choice: ${formData.secondChoice}</p>
          <p>Name: ${formData.fullName}</p>
          <p>Facility: ${formData.facility}</p>
          <p><strong>If you need to reach us, call Eric at (707) 738-5083</strong></p>
        `
      });
      console.log('✅ EMAIL: Email sent successfully');
      return res.status(200).json({ message: 'Email sent' });
    }

    // 🚨 ONLY SEND SMS WHEN REQUEST TYPE IS `sms-only`
    if (requestType === 'sms-only') {
      console.log('📲 SMS: Sending confirmation SMS...');
      await twilioClient.messages.create({
        body: `Thank you for booking your Water Risk Assessment! We will contact you next week to schedule.
        \nFirst Choice: ${formData.firstChoice}
        \nSecond Choice: ${formData.secondChoice}`,
        to: formData.phone,
        from: '+18888909794'
      });
      console.log('✅ SMS: Sent successfully');
      return res.status(200).json({ message: 'SMS sent' });
    }

    // If an unknown requestType is received, reject it
    console.error('❌ Invalid requestType:', requestType);
    return res.status(400).json({ error: 'Invalid requestType' });

  } catch (error) {
    console.error('❌ Function error:', error);
    res.status(500).json({ error: error.message });
  }
});