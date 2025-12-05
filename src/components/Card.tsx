interface CardProps {
  children?: React.ReactNode;
}

const Card = ({ children }: CardProps) => {
  return (
    <div className="p-[20px] rounded-[15px] bg-white border-[#EAEAEA] border">
      {children}
    </div>
  );
};

export default Card;
