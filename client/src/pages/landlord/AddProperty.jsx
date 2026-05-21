import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { useMutation } from "@tanstack/react-query";

import { propertySchema } from "../../utils/validators";

import { createProperty } from "../../services/property.service";

const AddProperty = () => {

    const navigate = useNavigate();

    const {

        register,

        handleSubmit,

        formState: {

            errors,

            isSubmitting

        }

    } = useForm({

        resolver:

            zodResolver(propertySchema),

        defaultValues: {

            furnished: false,

            status: "available"

        }

    });

    const mutation = useMutation({

        mutationFn: createProperty,

        onSuccess: () => {

            navigate(

                "/landlord/properties"

            );

        }

    });

    const [images, setImages] = useState([]);

    const onSubmit = async (data) => {

        const formData = new FormData();

        formData.append("title", data.title);

        formData.append("description", data.description);

        formData.append("location", data.location);

        formData.append("city", data.city);

        formData.append("rent", data.rent);

        formData.append("bedrooms", data.bedrooms);

        formData.append("bathrooms", data.bathrooms);

        formData.append("furnished", data.furnished);

        formData.append("status", data.status);

        if (images && images.length > 0) {

            for (

                let i = 0;

                i < images.length;

                i++

            ) {

                formData.append(

                    "images",

                    images[i]

                );

            }

        }

        for (let pair of formData.entries()) {

            console.log(pair[0], pair[1]);

        }

        mutation.mutate(formData);

    };
    return (

        <div className="max-w-3xl">

            <h1 className="text-3xl font-bold mb-8">

                Add Property

            </h1>

            <form

                onSubmit={handleSubmit(onSubmit)}

                className="flex flex-col gap-5"

            >

                <input

                    type="text"

                    placeholder="Title"

                    {...register("title")}

                    className="border p-3 rounded-lg"

                />

                <p className="text-red-500">

                    {errors.title?.message}

                </p>

                <textarea

                    placeholder="Description"

                    {...register("description")}

                    className="border p-3 rounded-lg"

                />

                <input

                    type="text"

                    placeholder="Location"

                    {...register("location")}

                    className="border p-3 rounded-lg"

                />

                <input

                    type="text"

                    placeholder="City"

                    {...register("city")}

                    className="border p-3 rounded-lg"

                />

                <input

                    type="number"

                    placeholder="Rent"

                    {...register("rent")}

                    className="border p-3 rounded-lg"

                />

                <input

                    type="number"

                    placeholder="Bedrooms"

                    {...register("bedrooms")}

                    className="border p-3 rounded-lg"

                />

                <input

                    type="number"

                    placeholder="Bathrooms"

                    {...register("bathrooms")}

                    className="border p-3 rounded-lg"

                />

                <input

                    type="text"

                    placeholder="Amenities (wifi,gym,parking)"

                    {...register("amenities")}

                    className="border p-3 rounded-lg"

                />

                <div className="flex items-center gap-3">

                    <input

                        type="checkbox"

                        {...register("furnished")}

                    />

                    <label>

                        Furnished

                    </label>

                </div>

                <select

                    {...register("status")}

                    className="border p-3 rounded-lg"

                >

                    <option value="available">

                        Available

                    </option>

                    <option value="booked">

                        Booked

                    </option>

                </select>

                <input

                    type="file"

                    multiple

                    accept="image/*"

                    onChange={(e) =>

                        setImages(e.target.files)

                    }

                />

                <button

                    disabled={isSubmitting}

                    className="bg-black text-white py-3 rounded-xl"

                >

                    {

                        isSubmitting

                            ? "Creating..."

                            : "Create Property"

                    }

                </button>

            </form>

        </div>

    );

};

export default AddProperty;