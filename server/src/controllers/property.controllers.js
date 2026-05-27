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

        const property =

            await propertyModel.findById(id);

        // Check property exists
        if (!property) {

            return res.status(404).json({

                success: false,

                message: "Property not found"

            });

        }

        // Check ownership
        if (

            property.owner.toString()

            !==

            req.user._id.toString()

        ) {

            return res.status(403).json({

                success: false,

                message: "Unauthorized"

            });

        }

        const {

            title,
            description,
            location,
            city,
            rent,
            bedrooms,
            bathrooms,
            furnished,
            status

        } = req.body;

        // Handle amenities
        let amenities = req.body.amenities;

        if (!Array.isArray(amenities)) {

            amenities = amenities

                ? [amenities]

                : [];

        }

        // Handle images
        let imageUrls = property.images;

        if (req.files && req.files.length > 0) {

            imageUrls = [];

            for (const file of req.files) {

                const uploadResult =

                    await cloudinary.uploader.upload(

                        file.path

                    );

                imageUrls.push(

                    uploadResult.secure_url

                );

                fs.unlinkSync(file.path);

            }

        }

        const updatedProperty =

            await propertyModel.findByIdAndUpdate(

                id,

                {

                    title,
                    description,
                    location,
                    city,

                    rent: Number(rent),

                    bedrooms: Number(bedrooms),

                    bathrooms: Number(bathrooms),

                    furnished:

                        furnished === "true",

                    amenities,

                    images: imageUrls,

                    status

                },

                {

                    new: true,

                    runValidators: true

                }

            );

        return res.status(200).json({

            success: true,

            message:

                "Property updated successfully",

            property: updatedProperty

        });

    } catch (error) {

    console.log(error);

    return res.status(500).json({

        success: false,

        message: error.message,

        error

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
    try {
        // 1. Added 'category' to the destructured query parameters
        const { 
            city, minRent, maxRent, bedrooms, bathrooms, 
            furnished, keyword, category, page, limit, sort 
        } = req.query;

        const query = {};

        // --- FILTERS ---

        if (city) {
            // Using regex for case-insensitive exact matching (e.g., "bangalore" matches "Bangalore")
            query.city = { $regex: new RegExp(`^${city}$`, "i") };
        }

        // 2. Added Category Filter Logic
        if (category && category !== "All") {
            // Allows the frontend category slider to filter properties
            query.category = { $regex: new RegExp(`^${category}$`, "i") };
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
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
                { location: { $regex: keyword, $options: "i" } },
                { city: { $regex: keyword, $options: "i" } }
            ];
        }

        // --- PAGINATION & SORTING ---
        const currentPage = Number(page) || 1;
        const perPage = Number(limit) || 10;
        const skip = (currentPage - 1) * perPage;

        const sortBy = sort || "-createdAt";

        // --- DATABASE QUERIES ---
        const properties = await propertyModel
            .find(query)
            .sort(sortBy)
            .skip(skip)
            .limit(perPage)
            .populate("owner", "_id name email profileImage") // Added profileImage for frontend UI
            .lean();

        // 3. Instead of returning 404 when empty, it's better API practice 
        // to return 200 with an empty array. The frontend handles the "No properties found" UI.
        if (!properties.length) {
            return res.status(200).json({
                success: true,
                message: "No properties found matching your criteria",
                count: 0,
                properties: [],
                pagination: { totalProperties: 0, totalPages: 0, currentPage, perPage }
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

    } catch (error) {
        // 4. Added error handling to prevent server crashes
        console.error("Error in searchProperties:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching properties",
            error: error.message
        });
    }
};