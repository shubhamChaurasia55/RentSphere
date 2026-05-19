import propertyModel from "../models/property.model.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";



export const createProperty = async (req, res) => {
    try {

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Please upload at least one image"
            });
        }

        const { title, description, location, city, rent, bedrooms, bathrooms, furnished, amenities, coordinates, status } = req.body;

        if (!title || !city || !rent) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields"
            });
        }

        const imageUrls = [];

        for (const file of req.files) {
            try {
                const uploadResult = await cloudinary.uploader.upload(file.path);
                imageUrls.push(uploadResult.secure_url);
                fs.unlinkSync(file.path);
            } catch (error) {
                console.error("Error uploading file to Cloudinary:", error);
                throw new Error("Failed to upload image to Cloudinary");
            }
        }

        const property = await propertyModel.create({
            title,
            description,
            location,
            city,
            rent,
            bedrooms,
            bathrooms,
            furnished,
            amenities,
            images: imageUrls,
            coordinates,
            status,
            owner: req.user._id
        });



        return res.status(201).json({
            success:true,
            message: "Property added successfully",
            property
        });

    } catch (error) {
        
        return res.status(500).json({
            success: false,
            message: error.message
        });

    }


}

export const getMyProperties = async (req, res) => {
    const properties = await propertyModel.find({
        owner: req.user._id
    });

    return res.status(200).json({
        message: "My properties fetched successfully",
        count: properties.length,
        properties
    });
}

export const updateProperty = async (req, res) => {

    try {

        const { id } = req.params;

        const property = await propertyModel.findById(id);

        // Check property exists
        if (!property) {
            return res.status(404).json({
                success: false,
                message: "Property not found"
            });
        }

        // Check ownership
        if (property.owner.toString() !== req.user._id.toString()) {

            return res.status(403).json({
                success: false,
                message: "Unauthorized"
            });

        }

        // Update property
        const updatedProperty = await propertyModel.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        return res.status(200).json({
            success: true,
            message: "Property updated successfully",
            property: updatedProperty
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

export const deleteProperty = async (req, res) => {

    try {

        const { id } = req.params;

        const property = await propertyModel.findById(id);

        // Check property exists
        if (!property) {
            return res.status(404).json({
                success: false,
                message: "Property not found"
            });
        }

        // Check ownership
        if (property.owner.toString() !== req.user._id.toString()) {

            return res.status(403).json({
                success: false,
                message: "Unauthorized"
            });

        }

        await property.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Property deleted successfully"
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


export const getAllProperties = async (req, res) => {
    const properties = await propertyModel.find();

    return res.status(200).json({
        message: "Properties fetched successfully",
        count: properties.length,
        properties
    });
}

export const getPropertyById = async (req, res) => {
    const { id } = req.params;

    const property = await propertyModel.findById(id);

    if (!property) {
        return res.status(404).json({
            message: "Property not found"
        });
    }

    return res.status(200).json({
        message: "Property fetched successfully",
        property
    });
}


export const searchProperties = async (req, res) => {
    const { city, minRent, maxRent, bedrooms, bathrooms, furnished, keyword, page, limit, sort } = req.query;

    const query = {};

    if (city) {
        query.city = city;
    }

    if (minRent || maxRent) {
        query.rent = {};

        if (minRent) query.rent.$gte = Number(minRent);
        if (maxRent) query.rent.$lte = Number(maxRent);
    }

    if (bedrooms) {
        query.bedrooms = Number(bedrooms);
    }

    if (bathrooms) {
        query.bathrooms = Number(bathrooms);
    }

    if (furnished) {
        query.furnished = furnished === "true";
    }

    if (keyword) {
        query.$or = [
            {
                title: {
                    $regex: keyword,
                    $options: "i"
                }
            },
            {
                description: {
                    $regex: keyword,
                    $options: "i"
                }
            },
            {
                location: {
                    $regex: keyword,
                    $options: "i"
                }
            },
            {
                city: {
                    $regex: keyword,
                    $options: "i"
                }
            }
        ]
    }

    const currentPage = Number(page) || 1;
    const perPage = Number(limit) || 10;
    const skip = (currentPage - 1) * perPage;

    const sortBy = sort || "-createdAt";

    const properties = await propertyModel
        .find(query)
        .sort(sortBy)
        .skip(skip)
        .limit(perPage)
        .populate("owner", "_id name email")
        .lean();


    if (!properties.length) {
        return res.status(404).json({
            message: "No properties found",
            count: 0,
            properties: []
        });
    }

    const totalProperties = await propertyModel.countDocuments(query);

    const totalPages = Math.ceil(totalProperties / perPage);

    return res.status(200).json({
        success: true,
        message: "Properties fetched successfully",
        count: properties.length,
        properties,
        pagination: {
            totalProperties,
            totalPages,
            currentPage,
            perPage
        }
    });
}