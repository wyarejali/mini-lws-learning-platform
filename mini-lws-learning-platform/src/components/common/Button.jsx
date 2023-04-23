const Button = ({ children, type, style, ...rest }) => {
    return (
        <button
            type={type ? type : 'button'}
            className={`group relative flex justify-center py-2 px-4  border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 ${
                style && style
            }`}
            {...rest}
        >
            {children}
        </button>
    );
};

export default Button;
