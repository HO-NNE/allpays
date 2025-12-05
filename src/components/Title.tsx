interface Titletype {
  title: string;
  icon: string;
}

const Title = ({ icon, title }: Titletype) => {
  return (
    <div className="flex items-center">
      <img src={icon} alt="메인 타이틀" className="mr-3" />
      <div className="text-[20px] font-bold">{title}</div>
    </div>
  );
};

export default Title;
