interface CardProps {
  title: string;
  description: string;
  emoji: string;
  isSelected: boolean;
  onSelect: (title: string) => void;
}

const Card = ({ title, description, emoji, isSelected, onSelect }: CardProps) => {
  return (
    <div 
      className={`w-full h-[60px] ${
        isSelected 
          ? 'bg-[#2d2747] border-[#6f5cc4] border-2 shadow-lg shadow-[#6f5cc4]/20' 
          : 'bg-[#191828] border-[#39325F] border'
      } rounded-2xl rounded-tl-none p-2 flex items-center justify-between cursor-pointer transition-all duration-200`}
      onClick={() => onSelect(title)}
    >
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-[#2d2747] flex items-center justify-center text-xl">
          {emoji}
        </div>
        <div>
          <h3 className="text-white text-xs font-medium leading-tight">{title}</h3>
          <p className="text-gray-400 text-[11px] mt-0.5 line-clamp-1">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
