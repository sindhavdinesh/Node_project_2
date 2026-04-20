import multer, { diskStorage } from "multer";
import fs from 'fs';
import path from "path";

const dir = 'public/images'
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })

const storage = diskStorage({
    destination: (req, file, cb) => {
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${Math.floor(Math.random() * 100)}${path.extname(file.originalname)}`);
    },
})

const IMAGE = multer({storage})

export default IMAGE;