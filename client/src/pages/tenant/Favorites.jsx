import {
    useMutation,
    useQuery,
    useQueryClient
} from "@tanstack/react-query";

import toast from "react-hot-toast";

import {
    getFavorites,
    removeFromFavorites
} from "../../services/favorite.service";

import { Link } from "react-router-dom";

const Favorites = () => {

    const queryClient = useQueryClient();

    const {
        data,
        isLoading,
        error
    } = useQuery({
        queryKey: ["favorites"],
        queryFn: getFavorites
    });

    const removeMutation = useMutation({
        mutationFn: removeFromFavorites,

        onSuccess: (data) => {
            toast.success(data.message);

            queryClient.invalidateQueries({
                queryKey: ["favorites"]
            });
        },

        onError: (error) => {
            toast.error(
                error?.response?.data?.message ||
                "Failed to remove favorite"
            );
        }
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading favorites</div>;
    }

    return (
        <div className="p-10 flex flex-col gap-8">

            <h1 className="text-3xl font-bold">
                Favorite Properties
            </h1>

            {
                !data?.favorites?.length && (
                    <p>No favorites yet</p>
                )
            }

            <div className="grid grid-cols-3 gap-6">

                {
                    data?.favorites?.map((property) => (

                        <Link
                            key={property._id}
                            to={`/property/${property._id}`}
                            className="border rounded-2xl overflow-hidden"
                        >

                            <img
                                src={property.images?.[0]}
                                alt={property.title}
                                className="w-full h-56 object-cover"
                            />

                            <div className="p-5 flex flex-col gap-4">

                                <div className="flex flex-col gap-2">

                                    <h2 className="text-xl font-semibold">
                                        {property.title}
                                    </h2>

                                    <p>{property.city}</p>

                                    <p className="font-semibold">
                                        ₹ {property.rent}/month
                                    </p>

                                </div>

                                <button
                                    className="bg-red-600 text-white px-4 py-2 rounded-lg"
                                    onClick={(e) => {
                                        e.preventDefault();

                                        removeMutation.mutate(
                                            property._id
                                        );
                                    }}
                                >
                                    Remove Favorite
                                </button>

                            </div>

                        </Link>

                    ))
                }

            </div>

        </div>
    );

};

export default Favorites;