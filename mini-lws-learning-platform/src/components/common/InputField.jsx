import { useState } from 'react';

const InputField = (props) => {
    // Local state
    const [focused, setFocused] = useState(false);

    const { label, id, errorMessage, type, className, ...rest } = props;

    // Handle focus
    const handleFocus = () => {
        setFocused(true);
    };

    return type === 'textarea' ? (
        <div className="mt-1 mb-2">
            {label && <label htmlFor={id}>{label}</label>}
            <textarea
                type={type}
                className={`form-control rounded ${className && className}`}
                rows="6"
                cols="15"
                required
                onBlur={handleFocus}
                focused={focused.toString()}
                {...rest}
            ></textarea>
            <span className="text-sm text-red-500">{errorMessage}</span>
        </div>
    ) : (
        <div className="mt-1 mb-2">
            {label && <label htmlFor={id}>{label}</label>}
            <input
                type={type}
                className={`form-control rounded ${className && className}`}
                required
                onBlur={handleFocus}
                focused={focused.toString()}
                {...rest}
            />
            <span className="text-sm text-red-500">{errorMessage}</span>
        </div>
    );
};

export default InputField;
