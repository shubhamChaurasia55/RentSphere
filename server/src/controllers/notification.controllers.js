import notificationModel from "../models/notification.model.js";

export const getNotifications = async (

    req,

    res

) => {

    try {

        const notifications =

            await notificationModel
                .find({
                    user: req.user._id
                })
                .sort({
                    createdAt: -1
                });

        return res.status(200).json({

            success: true,

            notifications

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

export const markAsRead = async (

    req,

    res

) => {

    try {

        const { id } = req.params;

        await notificationModel.findByIdAndUpdate(
            id,
            { read: true }
        );

        return res.status(200).json({

            success: true,

            message: "Notification marked as read"

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};