import {
  Clock3,
  Ban,
  PawPrint,
  Users,
} from "lucide-react";

const PropertyRules = () => {

  const rules = [
    {
      icon: <Clock3 className="w-5 h-5" />,
      title: "Check-in after 12:00 PM",
    },
    {
      icon: <Clock3 className="w-5 h-5" />,
      title: "Checkout before 11:00 AM",
    },
    {
      icon: <Ban className="w-5 h-5" />,
      title: "No smoking allowed",
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "No parties or events",
    },
    {
      icon: <PawPrint className="w-5 h-5" />,
      title: "Pets allowed",
    },
  ];

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">

      <h2 className="text-2xl font-bold text-slate-900 mb-8">
        House Rules
      </h2>

      <div className="flex flex-col gap-5">

        {rules.map((rule, index) => (
          <div
            key={index}
            className="flex items-center gap-4 border border-gray-100 rounded-2xl p-5 hover:border-indigo-200 transition-all duration-300"
          >
            <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              {rule.icon}
            </div>

            <span className="font-medium text-slate-700">
              {rule.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyRules;