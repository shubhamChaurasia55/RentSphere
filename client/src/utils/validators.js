import {z} from 'zod';

export const loginSchema = z.object({
    email: z.string().email("Invalid Email"),
    password: z.string().min(6),
})

export const registerSchema = z.object({

    name: z
        .string()
        .min(3, "Name must be at least 3 characters"),

    email: z
        .string()
        .email("Invalid email"),

    password: z
        .string()
        .min(6, "Password must be at least 6 characters"),

    role: z.enum(["tenant", "landlord"], {

        message: "Please select role"

    })

});

export const propertySchema = z.object({

    title: z
        .string()
        .min(3, "Title is required"),

    description: z
        .string()
        .min(10, "Description is required"),

    location: z
        .string()
        .min(2, "Location is required"),

    city: z
        .string()
        .min(2, "City is required"),

    rent: z
        .string()
        .min(1, "Rent is required"),

    bedrooms: z
        .string()
        .min(1, "Bedrooms required"),

    bathrooms: z
        .string()
        .min(1, "Bathrooms required"),

    furnished: z
        .boolean()
        .optional(),

    status: z.enum([

        "available",

        "booked"

    ]),

    amenities: z
        .string()
        .optional()

});

