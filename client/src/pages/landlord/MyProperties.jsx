import { useQuery, useMutation, useQueryClient }

from "@tanstack/react-query";

import {

    getMyProperties,

    deleteProperty

} from "../../services/property.service";

import DashboardPropertyCard from

"../../components/dashboard/DashboardPropertyCard";

const MyProperties = () => {

    const queryClient = useQueryClient();

    const {

        data,

        isLoading,

        error

    } = useQuery({

        queryKey: ["my-properties"],

        queryFn: getMyProperties

    });

    const deleteMutation = useMutation({

        mutationFn: deleteProperty,

        onSuccess: () => {

            queryClient.invalidateQueries({

                queryKey: ["my-properties"]

            });

        }

    });

    const handleDelete = (id) => {

        deleteMutation.mutate(id);

    };

    if (isLoading) {

        return <div>Loading...</div>;

    }

    if (error) {

        return <div>Error loading properties</div>;

    }

    return (

        <div className="flex flex-col gap-8">

            <h1 className="text-3xl font-bold">

                My Properties

            </h1>

            {

                !data?.properties?.length ? (

                    <div>

                        No properties found

                    </div>

                ) : (

                    <div className="grid grid-cols-3 gap-6">

                        {

                            data.properties.map((property) => (

                                <DashboardPropertyCard

                                    key={property._id}

                                    property={property}

                                    onDelete={handleDelete}

                                />

                            ))

                        }

                    </div>

                )

            }

        </div>

    );

};

export default MyProperties;