import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const PaymentResult = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("Đang kiểm tra kết quả...");

  useEffect(() => {
    const checkPayment = async () => {
      try {
        const res = await axios.get("https://localhost:7130/api/Vnpay/Callback", {
          params: Object.fromEntries(searchParams.entries()),
        });
        console.log(res.data);
        setMessage(res.data);
      } catch {
        setMessage("Thanh toán thất bại!");
      }
    };
    checkPayment();
  }, [searchParams]);

  return <div className="p-4 text-center">{message}</div>;
};

export default PaymentResult;
