import { Pie } from "@ant-design/plots";

import { useEffect, useState } from "react";
import { fetchPaymentgraph } from "../api/getPaymentList";
import type { PaymentData } from "../type/AllpaysType";

const MonthlyPaymentPieChart = () => {
  const [data, setData] = useState<{ category: string; value: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth() + 1
  );

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const paymentsRaw: any[] = await fetchPaymentgraph();
        const payments: PaymentData[] = paymentsRaw.map((p: any) => ({
          paymentAt: p.paymentAt,
          amount: p.amount,
          payType: p.payType,
        }));

        const monthlyData = payments.filter((p) => {
          const date = new Date(p.paymentAt);
          return (
            date.getMonth() + 1 === selectedMonth &&
            date.getFullYear() === new Date().getFullYear()
          );
        });

        const typeMap: Record<string, number> = {};
        monthlyData.forEach((p) => {
          const type = p.payType;
          typeMap[type] = (typeMap[type] || 0) + parseFloat(p.amount);
        });

        const chartData = Object.entries(typeMap).map(([category, value]) => ({
          category,
          value,
        }));

        setData(chartData);
      } catch (error) {
        console.error("Payment data load failed:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [selectedMonth]);

  const totalValue = data.reduce((sum, item) => sum + item.value, 0);

  const config = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "category",
    radius: 0.8,
    height: 300, // <-- 높이 지정
    label: {
      type: "outer",
      content: (item: any) =>
        `${item.category}: ${(item.percent * 100).toFixed(2)}%`,
    },
    statistic: {
      title: false,
      content: {
        style: { fontSize: "20px", fontWeight: "bold" },
        content: `${totalValue.toLocaleString()}원`,
      },
    },
    interactions: [{ type: "element-active" }],
  };

  return (
    <div
      style={{
        width: "100%",
        height: 320,
        paddingBottom: "20px",
      }}
    >
      {/* Pie 영역 */}
      {loading ? (
        <div>Loading...</div>
      ) : data.length === 0 ? (
        <div className="">
          <div className="flex justify-between items-center">
            <div
              style={{
                textAlign: "center",
                fontWeight: 600,
                fontSize: "23px",
                marginBottom: "10px",
              }}
            >
              {selectedMonth}월 결제 데이터가 없습니다.
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "15px",
                gap: "10px",
              }}
            >
              <button
                style={{
                  padding: "8px 16px",
                  backgroundColor:
                    selectedMonth === new Date().getMonth() + 1
                      ? "#1890ff"
                      : "#f0f0f0",
                  color:
                    selectedMonth === new Date().getMonth() + 1
                      ? "#fff"
                      : "#000",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                onClick={() => setSelectedMonth(new Date().getMonth() + 1)}
              >
                이번 달
              </button>
              <button
                style={{
                  padding: "8px 16px",
                  backgroundColor:
                    selectedMonth === new Date().getMonth()
                      ? "#1890ff"
                      : "#f0f0f0",
                  color:
                    selectedMonth === new Date().getMonth() ? "#fff" : "#000",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                onClick={() => setSelectedMonth(new Date().getMonth())}
              >
                전달
              </button>
            </div>
          </div>
          <div className="w-full text-center">
            <div className="w-full flex justify-center mt-[50px]">
              <img src="/public/icons/nodata.svg" alt="그래프" />
            </div>
            <div className="mt-[20px] text-[20px] font-semibold">
              그래프가 없습니다
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <div
              style={{
                textAlign: "center",
                fontWeight: 600,
                fontSize: "23px",
                marginBottom: "10px",
              }}
            >
              {selectedMonth}월 결제합계: {totalValue.toLocaleString()}원
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "15px",
                gap: "10px",
              }}
            >
              <button
                style={{
                  padding: "8px 16px",
                  backgroundColor:
                    selectedMonth === new Date().getMonth() + 1
                      ? "#1890ff"
                      : "#f0f0f0",
                  color:
                    selectedMonth === new Date().getMonth() + 1
                      ? "#fff"
                      : "#000",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                onClick={() => setSelectedMonth(new Date().getMonth() + 1)}
              >
                이번 달
              </button>
              <button
                style={{
                  padding: "8px 16px",
                  backgroundColor:
                    selectedMonth === new Date().getMonth()
                      ? "#1890ff"
                      : "#f0f0f0",
                  color:
                    selectedMonth === new Date().getMonth() ? "#fff" : "#000",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                onClick={() => setSelectedMonth(new Date().getMonth())}
              >
                전달
              </button>
            </div>
          </div>

          <div style={{ margin: "0 auto" }}>
            <Pie {...config} />
          </div>
        </>
      )}
    </div>
  );
};

export default MonthlyPaymentPieChart;
