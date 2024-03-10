const { google } = require('googleapis');
const fs = require('fs').promises;

if (!process.env["SERVICE_ACCOUNT_FILE_PATH"]){
    console.error("please define SERVICE_ACCOUNT_FILE_PATH env")
    exit(1)
}

// Load the service account credentials from the JSON key file
const keyFile = require(process.env["SERVICE_ACCOUNT_FILE_PATH"]);

// Replace these values with your specific information
const packageName = 'ir.sanatisharif.android.konkur96';
const aabFilePath = 'dist/capacitor/android/bundle/release/app-release.aab';

async function authenticate() {
  try {
    // Create a JWT client using the service account credentials
    const auth = new google.auth.GoogleAuth({
      credentials: keyFile,
      scopes: ['https://www.googleapis.com/auth/androidpublisher'],
    });

    // Obtain an authenticated client
    const client = await auth.getClient();

    return google.androidpublisher({ version: 'v3', auth: client });
  } catch (error) {
    console.error('Authentication failed:', error);
    throw error;
  }
}

async function uploadAab(androidPublisher, packageName, aabFilePath) {
  try {
    // Create a new edit
    const edit = await androidPublisher.edits.insert({
      packageName,
    });

    const editId = edit.data.id;

    // Upload AAB file
    const bundle = await androidPublisher.edits.bundles.upload({
      packageName,
      editId,
      media: {
        mimeType: 'application/octet-stream',
        body: await fs.readFile(aabFilePath),
      },
    });

    console.log('AAB file uploaded successfully.');

    return { editId, versionCode: bundle.data.versionCode };
  } catch (error) {
    console.error('Error uploading AAB file:', error);
    throw error;
  }
}

async function createRelease(androidPublisher, packageName, editId, versionCode) {
  try {
    // Specify the track and version code for the release
    const track = 'production';

    // Create a release
    const release = await androidPublisher.edits.tracks.update({
      packageName,
      editId,
      track,
      requestBody: {
        track,
        releases: [{ versionCodes: [versionCode.toString()], status: 'completed' }],
      },
    });

    console.log('Release created successfully.');

    // Commit the changes
    await androidPublisher.edits.commit({
      packageName,
      editId,
    });


    console.log('Changes committed.');
  } catch (error) {
    console.error('Error creating release:', error);
    throw error;
  }
}

// Main execution
async function deployToPlayConsole() {
  try {
    // Authenticate with the Google Play Console API
    const androidPublisher = await authenticate();

    // Upload AAB file and get editId and versionCode
    const { editId, versionCode } = await uploadAab(androidPublisher, packageName, aabFilePath);

    // Create a release on the production track
    await createRelease(androidPublisher, packageName, editId, versionCode);
  } catch (error) {
    console.error('Deployment to Play Console failed:', error);
  }
}

// Run the script
deployToPlayConsole();
