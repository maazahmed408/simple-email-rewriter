import { MdMarkEmailRead } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import Card from "./component/card";
import Button from "./component/Button";
import { useState } from "react";
import { useEmailRewriter } from "./hooks/useEmailRewriter";
import { cardData } from "./data/cardData";
import ProgressMessage from "./component/ProgressMessage";
import LoadingAnimation from "./component/LoadingAnimation";
// import EmailClientIndicator from "./component/EmailClientIndicator";

function App() {
  const [selectedCard, setSelectedCard] = useState<string>("");
  const { isLoading, progress, handleRewrite } = useEmailRewriter(selectedCard);

  const handleClose = () => {
    window.close();
  };

  return (
    <div className="w-[400px] flex flex-col items-center bg-[#141121] p-8">
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center gap-2">
          <MdMarkEmailRead className="w-6 h-6 text-[#6f5cc4]" />
          <span className="text-white font-medium text-sm">Simple Email Rewriter</span>
        </div>
        <RxCross2 
          className="w-6 h-6 text-white hover:text-[#6f5cc4] cursor-pointer transition-colors duration-200" 
          onClick={handleClose}
        />
      </div>
      
      <div className="w-full min-h-[360px] flex flex-col items-center justify-center mt-8">
        {!isLoading ? (
          <div className="w-full flex flex-col gap-4 animate-fade-in">
            {cardData.map((card) => (
              <Card 
                key={card.title}
                {...card}
                isSelected={selectedCard === card.title}
                onSelect={setSelectedCard}
              />
            ))}
          </div>
        ) : (
          <div className="animate-fade-in">
            <LoadingAnimation />
          </div>
        )}
      </div>
      
      {!isLoading && <ProgressMessage message={progress} />}
      
      {!isLoading && (
        <Button 
          onClick={handleRewrite}
          disabled={!selectedCard || isLoading}
        />
      )}
    </div>
  );
}

export default App;

