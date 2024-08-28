const Store = require('../models/store');
const upload = require('../helpers/upload');

const uploadFile = async (req, res) => {
    try {
        const uploadResult = await upload.uploadFile(req.file.path);
        const newStore = new Store({
            file_url: uploadResult.secure_url
        });

        const record = await newStore.save();
        res.status(200).send({ success: true, msg: 'Image uploaded successfully', data: record });
    } catch (error) {
        res.status(500).send({ success: false, msg: error.message });
    }
}

module.exports = {
    uploadFile  
}
