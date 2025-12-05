import { Tag } from "antd";
import type { DealListItemProps } from "../type/AllpaysType";

const DealListItem = ({ payment, statusList }: DealListItemProps) => {
  // 상태 색
  const currentStatus = statusList.find((s) => s.code === payment.status);
  const colorMap: Record<string, string> = {
    SUCCESS: "#00B505",
    PENDING: "#FD8A26",
    FAILED: "#F64848",
    CANCELLED: "#4871F6",
  };

  // 결제타입

  const payTypeMap: Record<
    string,
    { imgSrc: string; bgColor: string; label: string }
  > = {
    DEVICE: {
      imgSrc: "/public/icons/DEVICE.svg",
      bgColor: "#C8E7E9",
      label: "단말기",
    },
    VACT: {
      imgSrc: "/public/icons/VACT.svg",
      bgColor: "#FFECD5",
      label: "가상계좌",
    },
    BILLING: {
      imgSrc: "/public/icons/BILLING.svg",
      bgColor: "#D5F1FF",
      label: "정기결제",
    },
    ONLINE: {
      imgSrc: "/public/icons/ONLINE.svg",
      bgColor: "#E8E8E8",
      label: "온라인",
    },
    MOBILE: {
      imgSrc: "/public/icons/MOBILE.svg",
      bgColor: "#FFD5D5",
      label: "모바일",
    },
  };

  const { imgSrc, bgColor, label } = payTypeMap[payment.payType] || {
    imgSrc: "/icons/BILLING.png",
    bgColor: "#dddddd",
    label: "알 수 없음",
  };

  return (
    <div className="border border-[#EAEAEA]  py-[15px] px-[20px] flex items-center hover:bg-gray-50 cursor-pointer">
      <div
        className="w-[70px] h-[70px] rounded-[50%]  flex flex-col justify-center items-center mr-[40px] min-w-[70px] min-h-[70px]"
        style={{ background: bgColor }}
      >
        <img
          src={imgSrc}
          alt={payment.payType}
          className="w-[30px] h-[30px] "
        />
        <div className="text-[12px] mt-[5px] font-semibold">{label}</div>
      </div>
      <div className="w-full">
        {currentStatus && (
          <Tag
            style={{
              background: colorMap[currentStatus.code],
              color: "#ffffff",
              borderRadius: "12px",
              fontWeight: 500,
              fontSize: "11px",
              marginBottom: "8px",
            }}
          >
            {currentStatus.description}
          </Tag>
        )}
        <div className="flex mb-[10px]">
          <div className="flex w-1/2">
            <div className="w-2/6 font-semibold text-[14px]">결제코드</div>
            <div className="w-4/6 text-[14px]">{payment.paymentCode}</div>
          </div>
          <div className="flex w-1/2">
            <div className="w-2/6 font-semibold text-[14px]">가맹점 코드</div>
            <div className="w-4/6 text-[14px]">{payment.mchtCode}</div>
          </div>
        </div>
        <div className="flex mb-[10px]">
          <div className="flex w-1/2 items-center">
            <div className="w-2/6 font-semibold text-[14px]">금액</div>
            <div className="w-4/6 flex items-center  text-[14px]">
              {payment.amount}{" "}
              <div className="text-[#5C72E3]  ml-[25px]">
                {payment.currency}
              </div>
            </div>
          </div>
          <div className="flex w-1/2">
            <div className="w-2/6 font-semibold text-[14px]">결제시간</div>
            <div className="w-4/6 text-[14px]">{payment.paymentAt}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealListItem;
