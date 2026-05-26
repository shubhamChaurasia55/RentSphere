import {
  Wifi,
  Car,
  ShieldCheck,
  Snowflake,
  Tv,
  CookingPot,
  Dumbbell,
  Building2,
} from "lucide-react";

const PropertyAmenities = ({ property }) => {

  const amenities = [
    {
      icon: <Wifi className="w-4 h-4" />,
      label: "WiFi",
    },
    {
      icon: <Snowflake className="w-4 h-4" />,
      label: "AC",
    },
    {
      icon: <Tv className="w-4 h-4" />,
      label: "Smart TV",
    },
    {
      icon: <CookingPot className="w-4 h-4" />,
      label: "Kitchen",
    },
    {
      icon: <ShieldCheck className="w-4 h-4" />,
      label: "Security",
    },
    {
      icon: <Car className="w-4 h-4" />,
      label: "Parking",
    },
    {
      icon: <Building2 className="w-4 h-4" />,
      label: "Lift",
    },
    {
      icon: <Dumbbell className="w-4 h-4" />,
      label: "Gym",
    },
  ];

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-5">

        <h2 className="text-xl font-bold text-slate-900">
          Amenities
        </h2>

        <span className="text-sm text-gray-500">
          {amenities.length} Available
        </span>
      </div>

      {/* AMENITIES GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3 gap-3">

        {amenities.map((item, index) => (
          <div
            key={index}
            className="group bg-slate-50 hover:bg-indigo-50 border border-transparent hover:border-indigo-100 transition-all duration-300 rounded-2xl px-4 py-3 flex items-center gap-3"
          >

            {/* ICON */}
            <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-indigo-600 shadow-sm group-hover:scale-105 transition-all duration-300">
              {item.icon}
            </div>

            {/* LABEL */}
            <span className="text-sm font-medium text-slate-700 leading-none">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyAmenities;