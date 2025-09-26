import multer from 'multer';
import { supabase } from '../config/supabase.js';

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Apenas arquivos PNG, JPEG, JPG e WebP são permitidos'), false);
    }
};

const upload = multer({ 
    storage, 
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});

export async function uploadToSupabase(file, folder = 'uploads') {
    try {
        const fileExt = file.originalname.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `${folder}/${fileName}`;

        const { data, error } = await supabase.storage
            .from('pictures') 
            .upload(filePath, file.buffer, {
                contentType: file.mimetype,
                upsert: false
            });

        if (error) {
            throw error;
        }

        const { data: publicUrlData } = supabase.storage
            .from('pictures')
            .getPublicUrl(filePath);

        return {
            success: true,
            fileName: fileName,
            filePath: filePath,
            publicUrl: publicUrlData.publicUrl
        };

    } catch (error) {
        console.error('Supabase upload error:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

export async function deleteFromSupabase(filePath) {
    try {
        const { error } = await supabase.storage
            .from('pictures')
            .remove([filePath]);

        if (error) {
            throw error;
        }

        return { success: true };
    } catch (error) {
        console.error('Supabase delete error:', error);
        return { success: false, error: error.message };
    }
}

export default upload;