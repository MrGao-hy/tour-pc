import {Suspense, useEffect} from "react";
import { Watermark } from 'antd';
import {RouterProvider, useNavigate} from "react-router-dom";
import { useSelector } from "react-redux";
import router from "@/router/index";
import { selectUserInfo } from "@/store/reducer/userSlice";
import TheLoading from "@/components/TheLoading/TheLoading";

const App = () => {
  const userInfo = useSelector(selectUserInfo);
  return (
    <Watermark content={userInfo?.userName || ''}>
      <Suspense fallback={<TheLoading />}>
        <RouterProvider router={ router } />
      </Suspense>
    </Watermark>
  );
};

export default App;
