import { Input, Pagination, Select, Table, Tag } from "antd";
import "./App.css";
import Card from "./components/Card";
import DealListItem from "./components/DealListItem";
import SmallCard from "./components/SmallCard";
import Title from "./components/Title";
import MonthlyCategoryPieChart from "./components/MonthlyCategoryPieChart";
import { useEffect, useMemo, useState } from "react";
import { fetchPaymentList } from "./api/getPaymentList";
import type {
  DealList,
  mchStatus,
  PaymentStatus,
  PaymentType,
  SmallCardProps,
} from "./type/AllpaysType";
import {
  fetchCommonMchtStatus,
  fetchCommonPaytype,
  fetchCommonStatus,
} from "./api/getCommon";
import { fetchMerchantDetail, fetchMerchantList } from "./api/getMerchant";

const titleIconMap: Record<string, JSX.Element> = {
  "가맹점 코드": (
    <img src="/icons/mini_store.svg" alt="shop" className="w-4 h-4" />
  ),
  "가맹점 상태": (
    <img src="/icons/status.svg" alt="status" className="w-4 h-4" />
  ),
  "가맹점 이름": (
    <img src="/icons/mini_store.svg" alt="shop2" className="w-4 h-4" />
  ),
  업종: <img src="/icons/categoy.svg" alt="biz" className="w-4 h-4" />,
  사업자등록번호: <img src="/icons/user.svg" alt="user" className="w-4 h-4" />,
  주소: <img src="/icons/address.svg" alt="address" className="w-4 h-4" />,
  전화번호: <img src="/icons/phone.svg" alt="phone" className="w-4 h-4" />,
  이메일: <img src="/icons/email.svg" alt="email" className="w-4 h-4" />,
  가입날짜: (
    <img src="/icons/calendar.svg" alt="calendar" className="w-4 h-4" />
  ),
  수정시간: (
    <img src="/icons/calendar.svg" alt="calendar" className="w-4 h-4" />
  ),
};

//테이블 기본
const defaultTableData = [
  {
    col1: { name: "가맹점 코드", value: "없음" },
    col2: { name: "가맹점 상태", value: "없음", tag: null },
  },
  {
    col1: { name: "가맹점 이름", value: "없음" },
    col2: { name: "업종", value: "없음" },
  },
  { col1: { name: "사업자등록번호", value: "없음" } },
  { col1: { name: "주소", value: "없음" } },
  { col1: { name: "전화번호", value: "없음" } },
  { col1: { name: "이메일", value: "없음" } },
  { col1: { name: "가입날짜", value: "없음" } },
  { col1: { name: "수정시간", value: "없음" } },
];
function App() {
  // 결제 리스트
  const [payments, setPayments] = useState<DealList[]>([]);
  //전체 상태
  const [statusList, setStatusList] = useState<PaymentStatus[]>([]);
  //결제 수단
  const [payType, setpayType] = useState<PaymentType[]>([]);
  //결제 선택
  const [selectedPayType, setSelectedPayType] = useState<string>("ALL");
  //결제 상태
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  //가맹점 리스트
  const [merchants, setMerchants] = useState<SmallCardProps[]>([]);
  //가맹점 상태
  const [mchStatus, setmchStatus] = useState<mchStatus[]>([]);
  // 페이지네이션
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(9); // 한 페이지당 보여줄 아이템 수

  // 가맹점 검색및 필터링
  const [searchType, setSearchType] = useState<"code" | "name" | "all">("all"); // 검색 기준
  const [searchValue, setSearchValue] = useState(""); // 검색어
  // 검색 중
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMchStatus, setSelectedMchStatus] = useState<string>("ALL"); // 가맹점 상태

  // 가맹점 상세
  const [tableData, setTableData] = useState(defaultTableData);

  useEffect(() => {
    const getpayments = async () => {
      // / 결제 리스트
      const paymentResponse = await fetchPaymentList();
      // 전체 상태
      const statusResponse = await fetchCommonStatus();
      // 결제타입
      const payTypeResponse = await fetchCommonPaytype();
      // 가맹점 리스트
      const merchantsResponse = await fetchMerchantList();
      // 가맹점 상태
      const mchStatusResponse = await fetchCommonMchtStatus();

      setPayments(paymentResponse.data);
      setStatusList(statusResponse.data);
      setpayType(payTypeResponse.data);
      setMerchants(merchantsResponse.data);
      setmchStatus(mchStatusResponse.data);
    };

    getpayments();
  }, []);

  // 컬럼 정의 (헤더 없음)
  const columns = [
    {
      dataIndex: "col1",
      key: "col1",
      width: 150, // 고정 width
      ellipsis: true,
      onCell: () => ({
        style: {
          minWidth: 150,
          maxWidth: 150,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
      }),
      render: (item: any) =>
        item ? (
          <div className="flex items-center gap-2 truncate">
            <div>{titleIconMap[item.name]}</div>
            <span className="font-semibold truncate">{item.name}</span>
            {item.value && (
              <span className="text-[#8C8C8C] ml-1 truncate">{item.value}</span>
            )}
          </div>
        ) : null,
    },
    {
      dataIndex: "col2",
      key: "col2",
      width: 100,
      ellipsis: true,
      onCell: () => ({
        style: {
          minWidth: 100,
          maxWidth: 100,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
      }),
      render: (item: any) =>
        item ? (
          <div className="flex items-center gap-2 truncate">
            <div>{titleIconMap[item.name]}</div>
            <span className="font-semibold truncate">{item.name}</span>
            {item.value && (
              <span className="text-[#8C8C8C] ml-1 truncate">{item.value}</span>
            )}
            {item.tag && <span className="ml-2 truncate">{item.tag}</span>}
          </div>
        ) : null,
    },
  ];

  // 결제타입 옵션
  const payTypeSelectOptions = [
    { value: "ALL", label: "전체" },
    ...payType.map((item) => ({ value: item.type, label: item.description })),
  ];

  // 결제상태 옵션
  const statusSelectOptions = [
    { value: "ALL", label: "전체" },
    ...statusList.map((item) => ({
      value: item.code,
      label: item.description,
    })),
  ];

  // payType + status 필터링
  const filteredPayments = payments.filter((p) => {
    const payTypeMatch =
      selectedPayType === "ALL" || p.payType === selectedPayType;
    const statusMatch = selectedStatus === "ALL" || p.status === selectedStatus;
    return payTypeMatch && statusMatch;
  });

  // ///////////////////////////////////////////

  // 검섹 엔터
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearchQuery(searchValue);
      setCurrentPage(1);
    }
  };

  //가맹점 필터링
  const filteredMch = useMemo(() => {
    return merchants.filter((m) => {
      // 검색 기준
      const matchesSearch =
        !searchQuery ||
        (searchType === "code" && m.mchtCode.includes(searchQuery)) ||
        (searchType === "name" && m.mchtName.includes(searchQuery)) ||
        (searchType === "all" &&
          (m.mchtCode.includes(searchQuery) ||
            m.mchtName.includes(searchQuery)));

      // 상태 필터
      const matchesStatus =
        selectedMchStatus === "ALL" || m.status === selectedMchStatus;

      return matchesSearch && matchesStatus;
    });
  }, [merchants, searchQuery, searchType, selectedMchStatus]);

  // 페이지네이션
  const paginatedMch = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return filteredMch.slice(start, end);
  }, [filteredMch, currentPage, pageSize]);

  /// 가맹점상세 클릭
  const mapApiToTable = (
    apiData: any,
    statusList: { code: string; description: string }[]
  ) => [
    {
      col1: { name: "가맹점 코드", value: apiData.mchtCode || "없음" },
      col2: {
        name: "가맹점 상태",
        value: apiData.status ? "" : "없음",
        tag: (() => {
          const status = statusList.find((s) => s.code === apiData.status);
          if (!status) return null;

          const colorMap: Record<string, string> = {
            ACTIVE: "#00B505",
            INACTIVE: "#FD8A26",
            CLOSED: "#F64848",
            READY: "#4871F6",
          };

          return (
            <Tag
              style={{
                background: colorMap[status.code],
                color: "#ffffff",
                borderRadius: "12px",
                fontWeight: 500,
                fontSize: "11px",
              }}
            >
              {status.description}
            </Tag>
          );
        })(),
      },
    },
    {
      col1: { name: "가맹점 이름", value: apiData.mchtName || "없음" },
      col2: { name: "업종", value: apiData.bizType || "없음" },
    },
    { col1: { name: "사업자등록번호", value: apiData.bizNo || "없음" } },
    { col1: { name: "주소", value: apiData.address || "없음" } },
    { col1: { name: "전화번호", value: apiData.phone || "없음" } },
    { col1: { name: "이메일", value: apiData.email || "없음" } },
    { col1: { name: "가입날짜", value: apiData.registeredAt || "없음" } },
    { col1: { name: "수정시간", value: apiData.updatedAt || "없음" } },
  ];
  // 가맹점 상세 클릭
  const handleItemClick = async (mchCode: string) => {
    const apiRes = await fetchMerchantDetail(mchCode);
    const statusRes = await fetchCommonMchtStatus();

    if (!apiRes.data) return;

    const tableRows = mapApiToTable(apiRes.data, statusRes.data);
    setTableData(tableRows);
  };

  const tableDataWithKey = tableData.map((row, i) => ({
    ...row,
    key: row.col1.name + i,
  }));

  // smallCard 최적화
  const MemoSmallCard = useMemo(
    () =>
      paginatedMch.length ? (
        paginatedMch.map((merchant, idx) => (
          <SmallCard
            key={idx}
            merchants={merchant}
            statusList={mchStatus}
            onClick={() => handleItemClick(merchant.mchtCode)}
          />
        ))
      ) : (
        <div className="text-center">
          <div className="flex justify-center mb-[15px] mt-[120px]">
            <img src="../public/icons/nodata.svg" alt="아이템이 없습니다" />
          </div>
          <p className=" text-[40px]">검색목록이 없습니다</p>
        </div>
      ),
    [paginatedMch, mchStatus]
  );

  return (
    <div className="flex bg-[#F1F2F6] h-screen">
      {/* 왼쪽 영역 */}
      <div className="w-[35%] bg-[#ffffff] border-r border-gray-300">
        <div className="border-b border-[#D8D8D8] px-[30px] py-[25px]">
          <Title icon="/public/icons/list.svg" title="거래내역"></Title>
        </div>
        <div className="pl-[30px] py-[20px] flex items-center ">
          <div className="w-[70%] flex">
            <div className="flex items-center mr-[40px]">
              <div className="font-semibold mr-[10px]">결제방법</div>
              <Select
                style={{ width: 120 }}
                placeholder="결제수단 선택"
                options={payTypeSelectOptions}
                value={selectedPayType}
                onChange={(value) => setSelectedPayType(value)}
              />
            </div>
            <div className="flex items-center">
              <div className="font-semibold mr-[10px]">결제상태 </div>
              <Select
                style={{ width: 120 }}
                placeholder="결제상태 선택"
                options={statusSelectOptions}
                value={selectedStatus}
                onChange={(value) => setSelectedStatus(value)}
              />
            </div>
          </div>
          <div className="w-[2px] h-[15px] bg-[#b7b7b7]"></div>
          <div className="flex items-center w-[30%] justify-center ">
            <div className="text-[35px] text-[#2E66F8] font-semibold">
              {payments.length}
            </div>
            <div className="text-[15px] ml-[10px]">건</div>
          </div>
        </div>
        <div className="h-[750px] overflow-y-auto">
          {Array.isArray(filteredPayments) &&
            filteredPayments.map((item, index) => (
              <DealListItem
                key={index}
                payment={item}
                statusList={statusList}
              />
            ))}
        </div>
      </div>

      {/* 오른쪽 영역 */}
      <div className="w-[65%] px-[30px] py-[25px]">
        <Title icon="../public/icons/store.svg" title="가맹점"></Title>

        {/* 검색 영역 */}
        <div className="flex mb-[20px] mt-[15px]">
          <Select
            placeholder="검색 가능 Select"
            style={{ width: "15%", height: 46, marginRight: "20px" }}
            value={searchType}
            onChange={(value) => setSearchType(value)}
            allowClear
            options={[
              { value: "all", label: "전체" },
              { value: "code", label: "코드" },
              { value: "name", label: "가맹점 이름" },
            ]}
          />
          <Input
            placeholder={
              searchType === "code"
                ? "코드를 입력해주세요"
                : searchType === "name"
                ? "가맹점 이름 입력을 해주세요"
                : "검색어를 입력해주세요"
            }
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleKeyPress}
          />
        </div>

        <div className="flex ">
          {/* 왼쪽 리스트 */}
          <div className="w-[55%] mr-[25px]">
            <div className="flex justify-between items-center mb-[15px]">
              <div className="font-semibold text-[20px] ">가맹점 목록</div>

              <Select
                placeholder="가맹점 상태 선택"
                style={{ width: 120, height: 38 }}
                value={selectedMchStatus}
                onChange={setSelectedMchStatus}
                options={[
                  { value: "ALL", label: "전체" },
                  ...mchStatus.map((s) => ({
                    value: s.code,
                    label: s.description,
                  })),
                ]}
              />
            </div>
            <div className="h-[660px] overflow-hidden ">{MemoSmallCard}</div>
            <div className="flex justify-center mt-4 ">
              <div className="flex justify-center mt-4">
                <Pagination
                  current={currentPage}
                  total={filteredMch.length}
                  pageSize={pageSize}
                  onChange={(page, size) => {
                    setCurrentPage(page);
                    setPageSize(size || pageSize);
                  }}
                />
              </div>
            </div>
          </div>

          {/* 오른쪽 상세 */}
          <div className="w-[45%]">
            <div className="font-semibold text-[20px] mb-[15px] mt-[10px]">
              가맹점 상세
            </div>

            {/* Table */}
            <div className="mb-[10px]">
              <Card>
                <Table
                  showHeader={false}
                  pagination={false}
                  size="small"
                  columns={columns}
                  dataSource={tableDataWithKey}
                  rowKey="key"
                />
              </Card>
            </div>

            {/* 파이차트 */}
            <Card>
              <MonthlyCategoryPieChart />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
