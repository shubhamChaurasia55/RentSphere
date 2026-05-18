import propertyModel from "../models/property.model.js";


export const createProperty = async (req, res) => {
    const { title, description, location, city, rent, bedrooms, bathrooms, furnished, amenities, images, coordinates, status } = req.body;

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
        images,
        coordinates,
        status,
        owner: req.user._id
    });

    return res.status(201).json({
        message: "Property added successfully",
        property
    });
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
    const {id} = req.params;

    const property = await propertyModel.findById(id);

    if(!property){
        return res.status(404).json({
            message: "Property not found"
        });
    }

    return res.status(200).json({
        message: "Property fetched successfully",
        property
    });
}