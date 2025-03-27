import AWS from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import dotenv from 'dotenv';
dotenv.config();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

// Reusable upload config with dynamic folder
const createS3Uploader = (folder) => {
  return multer({
    storage: multerS3({
      s3,
      bucket: process.env.AWS_BUCKET_NAME,
      key: (req, file, cb) => {
        const timestamp = Date.now();
        const fileName = `${folder}/${timestamp}-${file.originalname}`;
        cb(null, fileName);
      },
    }),
    limits: { fileSize: 10 * 1024 * 1024 }, // Adjust if needed
  });
};

// Export separate uploaders
export const uploadProfilePic = createS3Uploader('profilepics');
export const uploadPostMedia = createS3Uploader('postmedia');
