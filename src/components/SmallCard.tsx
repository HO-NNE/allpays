import type { mchStatusProps } from "../type/AllpaysType";

const SmallCard = ({ merchants, statusList, onClick }: mchStatusProps) => {
  const currentStatus = statusList.find((s) => s.code === merchants.status);
  const colorMap: Record<string, string> = {
    ACTIVE: "#00B505",
    INACTIVE: "#FD8A26",
    CLOSED: "#F64848",
    READY: "#4871F6",
    NONE: "#dddddd",
  };

  const statusCode = currentStatus?.code ?? "NONE";

  return (
    <div
      className="bg-[#ffffff] border border-transparent p-[10px] rounded-[12px] relative shadow-[1px_2px_3px_rgba(0,0,0,0.2)] flex overflow-hidden mb-[10px]  hover:border hover:border-[#cfcfcf] cursor-pointer"
      onClick={onClick}
    >
      <div
        className=" w-[20px] "
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          background: colorMap[statusCode],
        }}
      ></div>
      <div className="w-full pl-[40px]">
        <div className="flex w-full">
          <div className="flex mb-[10px] items-center text-[14px] w-[40%]">
            <div className="font-semibold mr-[15px] w-[30%]">가맹점 코드</div>
            <div className="text-[#5b5b5b]">{merchants.mchtCode}</div>
          </div>
          <div className="flex mb-[10px] items-center text-[14px] w-[60%]">
            <div className="font-bold mr-[15px] ">가맹점 이름</div>
            <div className="text-[#5b5b5b]">{merchants.mchtName}</div>
          </div>
        </div>
        <div className="flex items-center text-[14px] w-[40%]">
          <div className="font-bold mr-[15px] w-[30%]">업종</div>
          <div className="text-[#5b5b5b] ">{merchants.bizType}</div>
        </div>
      </div>
    </div>
  );
};

export default SmallCard;
