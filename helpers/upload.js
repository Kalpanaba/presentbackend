var cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'dhcy56dwx', 
    api_key: '969783251439845', 
    api_secret: 'DZB2kS0fsuvdW5ScoZb6buXjEZE'
});

const uploadFile = async (filePath) => {
    try {
        let result = await cloudinary.uploader.upload(filePath);
        return result;
    } catch (error) {
        console.error(error.message);
        throw new Error(error.message);
    }
}

module.exports = {
    uploadFile
}
