import { HiSparkles } from "react-icons/hi";

interface ButtonProps {
  onClick?: () => void;
  disabled?: boolean;
}

const Button = ({ onClick, disabled = false }: ButtonProps) => {
  return (
    <div className="mt-8 w-[75%] relative group cursor-pointer">
    { !disabled && <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6f5cc4] via-[#8872d9] to-[#6f5cc4] rounded-xl opacity-0 
        group-hover:opacity-20 blur-xs transition duration-500 group-hover:duration-200 
        animate-gradient-xy"
      />}
      <button 
        onClick={onClick}
        disabled={disabled}
        className=" cursor-pointer relative w-full py-3 bg-[#191828] rounded-xl text-white font-medium 
        flex items-center justify-center gap-2 border border-[#39325F]
        transition-all duration-300 
        hover:shadow-xl hover:shadow-[#6f5cc4]/20 hover:scale-[1.02] active:scale-[0.98]
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
        group-hover:border-[#6f5cc4]"
      >
        <HiSparkles className="w-5 h-5" />
        Rewrite Email
      </button>
    </div>
  );
};

export default Button;