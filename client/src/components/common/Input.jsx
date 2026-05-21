import FormError from "./FormError";

const Input = ({label, type="text", placeholder, error, ...props}) => {
    return (
        <div>
        <label className="block text-sm font-medium mb-2">{label}</label>
        <input className="w-full px-3 py-2 border border-gray-300 rounded-md" type={type} placeholder={placeholder} {...props} />
        {
            error && <FormError message={error} />
        }
        </div>
    )
}

export default Input;