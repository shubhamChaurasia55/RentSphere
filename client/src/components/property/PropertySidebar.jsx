import {
  CalendarDays,
  Heart,
} from "lucide-react";

const PropertySidebar = ({
  property,
}) => {
  return (
    <div className="sticky top-24 flex flex-col gap-6">

      {/* BOOKING CARD */}
      <div className="bg-white rounded-3xl p-7 shadow-sm border border-gray-100">

        <h2 className="text-4xl font-bold text-indigo-600">
          ₹ {property.rent}
        </h2>

        <p className="text-gray-500 mt-1">
          / month
        </p>

        <button className="w-full mt-8 bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 text-white font-semibold py-4 rounded-2xl shadow-lg">
          Request Booking
        </button>

        <button className="w-full mt-4 border border-gray-200 hover:border-red-200 hover:bg-red-50 transition-all duration-300 py-4 rounded-2xl flex items-center justify-center gap-2 font-semibold">
          <Heart className="w-5 h-5" />

          Save Property
        </button>

        <div className="flex items-center gap-3 mt-6 text-gray-500 text-sm">
          <CalendarDays className="w-4 h-4" />

          Listed recently
        </div>
      </div>

      {/* OWNER */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">

        <h3 className="font-bold text-xl mb-5">
          Hosted By
        </h3>

        <div className="flex items-center gap-4">

          <div className="w-14 h-14 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xl">
            {property.owner?.name?.charAt(0)}
          </div>

          <div>
            <h4 className="font-semibold text-slate-900">
              {property.owner?.name}
            </h4>

            <p className="text-sm text-gray-500">
              Property Owner
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertySidebar;