import {
    useMutation,
    useQuery,
    useQueryClient
} from "@tanstack/react-query";

import toast from "react-hot-toast";

import {
    getNotifications,
    markAsRead
} from "../services/notification.service";

const Notifications = () => {

    const queryClient = useQueryClient();

    const {
        data,
        isLoading,
        error
    } = useQuery({
        queryKey: ["notifications"],
        queryFn: getNotifications
    });

    const markReadMutation = useMutation({
        mutationFn: markAsRead,

        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: ["notifications"]
            });

        },

        onError: (error) => {

            toast.error(
                error?.response?.data?.message ||
                "Failed to update notification"
            );

        }
    });

    if (isLoading) {
        return <div className="p-10">Loading...</div>;
    }

    if (error) {
        return <div className="p-10">Error loading notifications</div>;
    }

    return (
        <div className="p-10 flex flex-col gap-8">

            <h1 className="text-3xl font-bold">
                Notifications
            </h1>

            {
                !data?.notifications?.length && (
                    <p>No notifications yet</p>
                )
            }

            <div className="flex flex-col gap-5">

                {
                    data?.notifications?.map((notification) => (

                        <div
                            key={notification._id}
                            className={`border rounded-2xl p-5 flex justify-between items-start gap-5
                            
                            ${
                                notification.read
                                ? "bg-white"
                                : "bg-blue-50"
                            }
                            
                            `}
                        >

                            <div className="flex flex-col gap-2">

                                <h2 className="text-lg font-semibold">
                                    {notification.title}
                                </h2>

                                <p className="text-gray-700">
                                    {notification.message}
                                </p>

                                <p className="text-sm text-gray-500">
                                    {
                                        new Date(
                                            notification.createdAt
                                        ).toLocaleString()
                                    }
                                </p>

                            </div>

                            {
                                !notification.read && (

                                    <button
                                        className="bg-black text-white px-4 py-2 rounded-lg"
                                        onClick={() =>
                                            markReadMutation.mutate(
                                                notification._id
                                            )
                                        }
                                    >
                                        Mark Read
                                    </button>

                                )
                            }

                        </div>

                    ))
                }

            </div>

        </div>
    );

};

export default Notifications;