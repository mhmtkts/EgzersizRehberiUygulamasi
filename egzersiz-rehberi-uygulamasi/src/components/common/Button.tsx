import React, { ButtonHTMLAttributes } from "react";

type ButtonVariant = 
  | "primary" 
  | "secondary" 
  | "success" 
  | "danger" 
  | "warning" 
  | "info" 
  | "light" 
  | "dark" 
  | "outline" 
  | "link";

type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
  rounded?: boolean;
  elevated?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  type = "button",
  disabled = false,
  fullWidth = false,
  className = "",
  leftIcon,
  rightIcon,
  loading = false,
  rounded = false,
  elevated = false,
  ...rest
}) => {
  const baseClasses = "inline-flex items-center justify-center font-medium focus:outline-none transition-all duration-300";
  
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-2.5 text-lg"
  };
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 active:from-blue-700 active:to-blue-800 focus:ring focus:ring-blue-300",
    secondary: "bg-gradient-to-r from-gray-500 to-gray-600 text-white hover:from-gray-600 hover:to-gray-700 active:from-gray-700 active:to-gray-800 focus:ring focus:ring-gray-300",
    success: "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 active:from-green-700 active:to-green-800 focus:ring focus:ring-green-300",
    danger: "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 active:from-red-700 active:to-red-800 focus:ring focus:ring-red-300",
    warning: "bg-gradient-to-r from-yellow-400 to-yellow-500 text-white hover:from-yellow-500 hover:to-yellow-600 active:from-yellow-600 active:to-yellow-700 focus:ring focus:ring-yellow-300",
    info: "bg-gradient-to-r from-blue-400 to-blue-500 text-white hover:from-blue-500 hover:to-blue-600 active:from-blue-600 active:to-blue-700 focus:ring focus:ring-blue-300",
    light: "bg-gray-100 text-gray-800 hover:bg-gray-200 active:bg-gray-300 focus:ring focus:ring-gray-200",
    dark: "bg-gray-800 text-white hover:bg-gray-900 active:bg-gray-950 focus:ring focus:ring-gray-300",
    outline: "bg-transparent border-2 border-white text-white hover:bg-white/10 active:bg-white/20 focus:ring focus:ring-white/30",
    link: "bg-transparent text-blue-600 hover:text-blue-800 hover:underline p-0 focus:ring-0 active:text-blue-900"
  };
  
  // Özel durumlar
  const widthClass = fullWidth ? "w-full" : "";
  const disabledClass = disabled || loading ? "opacity-70 cursor-not-allowed" : "";
  const roundedClass = rounded ? "rounded-full" : "rounded-md";
  const elevatedClass = elevated ? "shadow-lg hover:shadow-xl active:shadow-md" : "";
  
  const classes = [
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    widthClass,
    disabledClass,
    roundedClass,
    elevatedClass,
    className
  ].join(" ");

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={classes}
      {...rest}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      
      {!loading && leftIcon && <span className="mr-2">{leftIcon}</span>}
      <span>{children}</span>
      {!loading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      
      {variant !== 'link' && (
        <span className="absolute inset-0 w-full h-full bg-black/0 hover:bg-black/5 active:bg-black/10 transition-colors rounded-inherit"></span>
      )}
    </button>
  );
};

export default Button;