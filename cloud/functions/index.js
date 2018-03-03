const functions = require('firebase-functions');

exports.getWebsiteScreenshot = functions.database.ref('/bookmarks/{userId}/{folder}/{linkId}').onCreate((event) => {
  if (!event.data.exists()) {
    return null;
  }

  const { spawn } = require('child-process-promise');
  const fs = require('fs');
  const os = require('os');
  const path = require('path');
  const screenshot = require('screenshot-promise');
  const Storage = require('@google-cloud/storage');
  const UUID = require('uuid/v4');
  const storage = new Storage({
    credentials: {
      type: functions.config().storage.type,
      project_id: functions.config().storage.project_id,
      private_key_id: functions.config().storage.private_key_id,
      private_key: functions.config().storage.private_key.replace(/\\n/g, '\n'),
      client_email: functions.config().storage.client_email,
      client_id: functions.config().storage.client_id,
      auth_uri: functions.config().storage.auth_uri,
      token_uri: functions.config().storage.token_uri,
      auth_provider_x509_cert_url: functions.config().storage.auth_provider_x509_cert_url,
      client_x509_cert_url: functions.config().storage.client_x509_cert_url,
    },
    projectId: functions.config().fire.projectid,
  });
  const fileName = event.params.linkId;
  const tempFilePath = path.join(os.tmpdir(), `${fileName}.jpg`);
  const tempThumbPath = path.join(os.tmpdir(), `${fileName}-thumb.jpg`);

  const uuid = UUID();

  return screenshot(event.data.val().href, '1024x768', { crop: true })
    .then((buffer) => {
      fs.writeFileSync(tempFilePath, buffer);
    })
    .then(() =>
      spawn('convert', [tempFilePath, '-thumbnail', '640x480', tempThumbPath], {
        capture: ['stdout', 'stderr'],
      }))
    .then(() => {
      storage
        .bucket(functions.config().fire.bucket)
        .upload(tempThumbPath, {
          metadata: {
            metadata: {
              firebaseStorageDownloadTokens: uuid,
            },
          },
        })
        .then(() => {
          const file = storage.bucket(functions.config().fire.bucket).file(`${fileName}-thumb.jpg`);
          file.getSignedUrl({
            action: 'react',
            expires: '03-01-2500',
            contentType: 'image/jpeg',
          });
        })
        .then(() => {
          console.log('Uploaded');
          return event.data.ref.update({ imageId: uuid });
        })
        .then(() => {
          fs.unlinkSync(tempFilePath);
          fs.unlinkSync(tempThumbPath);
          return event;
        })
        .catch((error) => {
          console.error('There was an error uploading the image', error);
          return event;
        });
    });
});
