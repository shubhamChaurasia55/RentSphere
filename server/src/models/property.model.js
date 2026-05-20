import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
   {
      title: {
         type: String,
         required: true
      },

      description: {
         type: String,
         required: true
      },

      location: {
         type: String,
         required: true
      },

      city: {
         type: String,
         required: true
      },

      rent: {
         type: Number,
         min: 0,
         required: true
      },

      bedrooms: {
         type: Number,
         min: 0,
      },
      bathrooms: {
         type: Number,
         min: 0,
      },

      furnished: {
         type: Boolean,
         default: false
      },

      amenities: [String],

      images: [String],

      owner: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "user",
         required: true
      },

      coordinates: {
         latitude: Number,
         longitude: Number
      },

      status: {
         type: String,
         enum: ["available", "booked"],
         default: "available"
      },

      averageRating: {
         type: Number,
         default: 0
      },

      totalReviews: {
         type: Number,
         default: 0
      }

   },
   {
      timestamps: true
   }
);

const propertyModel = mongoose.model("Property", propertySchema);

export default propertyModel;