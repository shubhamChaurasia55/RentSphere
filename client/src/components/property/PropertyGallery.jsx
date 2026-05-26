const PropertyGallery = ({ property }) => {
  return (
    <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100">

      <div className="relative overflow-hidden rounded-3xl">
        <img
          src={property.images?.[0]}
          alt={property.title}
          className="w-full h-[500px] object-cover"
        />
      </div>

      <div className="grid grid-cols-4 gap-4 mt-4">
        {property.images?.slice(1, 5).map((image, index) => (
          <img
            key={index}
            src={image}
            alt=""
            className="h-28 w-full object-cover rounded-2xl"
          />
        ))}
      </div>
    </div>
  );
};

export default PropertyGallery;