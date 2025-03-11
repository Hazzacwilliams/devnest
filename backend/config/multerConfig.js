import multer from "multer";

// Storage configuration for posts
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/posts/"); // Store in 'uploads/posts/'
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Unique file names
  },
});

// File filter to allow only images and videos
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif", "video/mp4", "video/mov"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"), false);
  }
};

// Multer upload middleware
const uploadPostMedia = multer({
  storage,
  limits: { fileSize: 500 * 1024 * 1024 }, // 10MB limit
  fileFilter,
});

export { uploadPostMedia };

