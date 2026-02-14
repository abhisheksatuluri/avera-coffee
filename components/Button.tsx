import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  to?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  to, 
  onClick, 
  className = '',
  type = 'button'
}) => {
  const baseStyles = "inline-flex items-center justify-center px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 ease-out";
  
  const variants = {
    primary: "bg-gold text-obsidian hover:bg-cream hover:text-obsidian",
    secondary: "bg-espresso text-cream border border-transparent hover:border-gold hover:text-gold",
    outline: "bg-transparent border border-cream text-cream hover:bg-cream hover:text-obsidian",
    text: "bg-transparent text-gold hover:text-cream padding-0",
  };

  const combinedClasses = `${baseStyles} ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={combinedClasses}>
      {children}
    </button>
  );
};

export default Button;