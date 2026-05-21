import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {

    useMutation,

    useQuery

} from "@tanstack/react-query";

import { propertySchema } from "../../utils/validators";

import {

    getPropertyById,

    updateProperty

} from "../../services/property.service";

const EditProperty = () => {

    const navigate = useNavigate();

    const { id } = useParams();

    const [images, setImages] = useState([]);

    const {

        register,

        handleSubmit,

        reset,

        formState: {

            errors,

            isSubmitting

        }

    } = useForm({

        resolver:

            zodResolver(propertySchema)

    });

    const {

        data,

        isLoading,

        error

    } = useQuery({

        queryKey: ["property", id],

        queryFn: () => getPropertyById(id)

    });

    useEffect(() => {

        if (data?.property) {

            reset({

                title:

                    data.property.title,

                description:

                    data.property.description,

                location:

                    data.property.location,

                city:

                    data.property.city,

                rent:

                    data.property.rent,

                bedrooms:

                    data.property.bedrooms,

                bathrooms:

                    data.property.bathrooms,

                furnished:

                    data.property.furnished,

                status:

                    data.property.status,

                amenities:

                    data.property.amenities?.join(",")

            });

        }

    }, [data, reset]);

    const mutation = useMutation({

        mutationFn: updateProperty,

        onSuccess: () => {

            navigate(

                "/landlord/properties"

            );

        }

    });

    const onSubmit = async (formDataValues) => {

        const formData = new FormData();

        formData.append(

            "title",

            formDataValues.title

        );

        formData.append(

            "description",

            formDataValues.description

        );

        formData.append(

            "location",

            formDataValues.location

        );

        formData.append(

            "city",

            formDataValues.city

        );

        formData.append(

            "rent",

            formDataValues.rent

        );

        formData.append(

            "bedrooms",

            formDataValues.bedrooms

        );

        formData.append(

            "bathrooms",

            formDataValues.bathrooms

        );

        formData.append(

            "furnished",

            formDataValues.furnished

        );

        formData.append(

            "status",

            formDataValues.status

        );

        const amenitiesArray =

            formDataValues.amenities

                ?.split(",")

                .map((item) => item.trim());

        if (amenitiesArray?.length) {

            amenitiesArray.forEach(

                (item) => {

                    formData.append(

                        "amenities",

                        item

                    );

                }

            );

        }

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

        mutation.mutate({

            id,

            formData

        });

    };

    if (isLoading) {

        return (

            <div>

                Loading property...

            </div>

        );

    }

    if (error) {

        return (

            <div>

                Failed to load property

            </div>

        );

    }

    return (

        <div className="max-w-3xl">

            <h1 className="text-3xl font-bold mb-8">

                Edit Property

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

                <p className="text-red-500">

                    {errors.description?.message}

                </p>

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

                <div className="flex flex-col gap-3">

                    <label>

                        Upload New Images

                    </label>

                    <input

                        type="file"

                        multiple

                        accept="image/*"

                        onChange={(e) =>

                            setImages(

                                e.target.files

                            )

                        }

                    />

                </div>

                <button

                    disabled={

                        isSubmitting ||

                        mutation.isPending

                    }

                    className="bg-black text-white py-3 rounded-xl"

                >

                    {

                        mutation.isPending

                            ? "Updating..."

                            : "Update Property"

                    }

                </button>

            </form>
        </div>
    );

};

export default EditProperty;