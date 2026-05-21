const Button = ({

    children,

    loading,

    ...props

}) => {

    return (

        <button

            className="bg-black text-white rounded-lg py-3 px-4 hover:opacity-90 transition"

            disabled={loading}

            {...props}

        >

            {

                loading

                ? "Loading..."

                : children

            }

        </button>

    );

};

export default Button;