import axios from "axios";
import _ from "lodash";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  basePaymemt: 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?vnp_Amount=35000000&vnp_Command=pay&vnp_CreateDate=20230102001834&vnp_CurrCode=VND&vnp_IpAddr=127.0.0.1&vnp_Locale=vn&vnp_OrderInfo=test+create+payment+350.000+VND&vnp_OrderType=other&vnp_ReturnUrl=http://localhost:3000/detail-doctor/161&vnp_TmnCode=U71WYR2Q&vnp_TxnRef=001834&vnp_Version=2.1.0&vnp_SecureHash=3fa41c583690dc85ee04d47cf6c25e739a498299fbded11305ab3992d6b50954701b60f967dd8ed91bc9a01a7ece419447b7d4d887f86c64d6a3dda0c28fdda8/api/get-schedule-doctor-by-date?doctorId=160&date=1672678800000'

  // withCredentials: true,
});

instance.interceptors.response.use((response) => {
  // Thrown error for request with OK status code
  const { data } = response;
  return response.data;
});
export default instance;
