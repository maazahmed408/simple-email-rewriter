interface ProgressMessageProps {
  message: string | null;
}

const ProgressMessage = ({ message }: ProgressMessageProps) => {
  if (!message) return null;
  
  return (
    <div className="mt-4 text-sm text-[#6f5cc4]">{message}</div>
  );
};

export default ProgressMessage;