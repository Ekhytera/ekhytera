import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './src/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const fileFilter = (req, file, cb) => {
    const ext = ['image/png', 'image/jpeg', 'image/jpg'];

    if (ext.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(new Error('Apenas arquivos PNG, JPEG e JPG são permitidos'), false)
    }
};



const upload = multer({ storage, fileFilter });
export default upload;