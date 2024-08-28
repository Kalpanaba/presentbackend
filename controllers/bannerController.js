const Banner = require('../models/bannerModel');
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'dhcy56dwx', 
    api_key: '969783251439845', 
    api_secret: 'DZB2kS0fsuvdW5ScoZb6buXjEZE'
});

const addBanner = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ success: false, msg: 'Banner name is required' });
        }

        let image = '';
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            image = result.secure_url;
        } else {
            return res.status(400).json({ success: false, msg: 'Banner image is required' });
        }

        const banner = new Banner({
            name,
            image,
            status: 'active'
        });

        const savedBanner = await banner.save();
        res.status(200).json({ success: true, msg: 'Banner added successfully', data: savedBanner });
    } catch (error) {
        res.status(400).json({ success: false, msg: error.message });
    }
};

const getBanners = async (req, res) => {
    try {
        const banners = await Banner.find();
        res.status(200).json({ success: true, msg: 'Banners retrieved successfully', data: banners });
    } catch (error) {
        res.status(400).json({ success: false, msg: error.message });
    }
};

const getBannerById = async (req, res) => {
    try {
        const banner = await Banner.findById(req.params.id);
        if (!banner) {
            return res.status(404).json({ success: false, msg: 'Banner not found' });
        }
        res.status(200).json({ success: true, msg: 'Banner retrieved successfully', data: banner });
    } catch (error) {
        res.status(400).json({ success: false, msg: error.message });
    }
};

const updateBanner = async (req, res) => {
    try {
        const { name, status } = req.body;
        let updateData = { name, status };

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            updateData.image = result.secure_url;
        }

        const updatedBanner = await Banner.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!updatedBanner) {
            return res.status(404).json({ success: false, msg: 'Banner not found' });
        }
        res.status(200).json({ success: true, msg: 'Banner updated successfully', data: updatedBanner });
    } catch (error) {
        res.status(400).json({ success: false, msg: error.message });
    }
};

const deleteBanner = async (req, res) => {
    try {
        const banner = await Banner.findByIdAndDelete(req.params.id);
        if (!banner) {
            return res.status(404).json({ success: false, msg: 'Banner not found' });
        }
        res.status(200).json({ success: true, msg: 'Banner deleted successfully' });
    } catch (error) {
        res.status(400).json({ success: false, msg: error.message });
    }
};

module.exports = {
    addBanner,
    getBanners,
    getBannerById,
    updateBanner,
    deleteBanner,
};
