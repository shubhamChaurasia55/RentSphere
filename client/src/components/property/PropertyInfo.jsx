import {
  MapPin,
  BedDouble,
  Bath,
  Sofa,
  Star,
} from "lucide-react";

const PropertyInfo = ({ property }) => {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">

      <div className="flex items-start justify-between">

        <div>
          <h1 className="text-4xl font-bold text-slate-900">
            {property.title}
          </h1>

          <div className="flex items-center gap-2 mt-3 text-gray-500">
            <MapPin className="w-5 h-5 text-indigo-600" />

            <span>
              {property.location}, {property.city}
            </span>
          </div>
        </div>

        <div className="bg-indigo-50 text-indigo-600 px-5 py-2 rounded-2xl font-bold text-2xl">
          ₹ {property.rent}
        </div>
      </div>

      {/* FEATURES */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-8">

        <FeatureCard
          icon={<BedDouble />}
          title={property.bedrooms}
          label="Bedrooms"
        />

        <FeatureCard
          icon={<Bath />}
          title={property.bathrooms}
          label="Bathrooms"
        />

        <FeatureCard
          icon={<Sofa />}
          title={property.furnished ? "Yes" : "No"}
          label="Furnished"
        />

        <FeatureCard
          icon={<Star />}
          title={property.averageRating || 0}
          label="Rating"
        />
      </div>

      {/* DESCRIPTION */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">
          About this property
        </h2>

        <p className="text-gray-600 leading-8">
          {property.description}
        </p>
      </div>
    </div>
  );
};

const FeatureCard = ({
  icon,
  title,
  label,
}) => {
  return (
    <div className="bg-slate-50 rounded-2xl p-5 flex flex-col items-center">
      <div className="text-indigo-600 mb-3">
        {icon}
      </div>

      <h3 className="font-bold text-lg">
        {title}
      </h3>

      <p className="text-sm text-gray-500">
        {label}
      </p>
    </div>
  );
};

export default PropertyInfo;