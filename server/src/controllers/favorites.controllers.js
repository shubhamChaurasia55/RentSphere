import userModel from "../models/user.model.js";

export const addToFavorites = async (req, res) => {
    try {
        const { propertyId } = req.params;
        
        const user = await userModel.findById(req.user._id);

        if(user.favorites.includes(propertyId)) {
            return res.status(400).json({
                success: false,
                message: "Property already in favorites"
            });
        }

        user.favorites.push(propertyId);
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Property added to favorites successfully"
        });
        
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const getFavorites = async (req, res) => {

    try{
        const user = await userModel.findById(req.user._id).populate("favorites");

        return res.status(200).json({
            success: true,
            message: "Favorites fetched successfully",
            favorites: user.favorites
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const removeFromFavorites = async (req, res) => {
    try {
        const { propertyId } = req.params;

        const user = await userModel.findById(req.user._id);

        if(!user.favorites.includes(propertyId)) {
            return res.status(400).json({
                success: false,
                message: "Property not in favorites"
            });
        }

        user.favorites.pull(propertyId);
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Property removed from favorites successfully"
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}