import SqlEditor from "@/components/TheEditCode/TheEditCode";
import completers from "@/config/editConfig";
import { AppDispatch } from "@/store";
import { selectEditFontSize, selectIsDarkMode, setEditFontSize } from "@/store/reducer/settingSlice";
import { debounce, throttle } from "@/utils";
import { Card } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./index.module.scss";

let num = 0;
const EditCode = () => {
  const [ sqlQuery, setSqlQuery ] = useState("function porse() {\n  \n}");
  const isDarkMode = useSelector(selectIsDarkMode);
  const editFontSize = useSelector(selectEditFontSize);
  const dispatch: AppDispatch = useDispatch();

  useEffect(
    () => {
      window.addEventListener("wheel", throttle(handleScroll, 500));

      // 页面销毁，移除事件
      return () => {
        window.removeEventListener("wheel", handleScroll);
      };
    },
    []
  );

  /**
   * 鼠标滚动事件
   * */
  const handleScroll = (e: any) => {
    const newFontSize = e.deltaY > 0 ? num++ : e.deltaY < 0 ? num-- : num;
    if ( (editFontSize + newFontSize * 2) < 10 ) {
      num++;
      return;
    }
    dispatch(setEditFontSize(Math.max(12, editFontSize + newFontSize * 2)));
  };
  /**
   * 代码输入事件
   * */
  const onChangeEidt = (e: React.SetStateAction<string>) => {
    setSqlQuery(e);
  };
  return (
    <div className={ style.container }>
      <Card style={ { flex: 1 } }
            bordered={ false }>
        { "" }
        <SqlEditor defaultValue={ sqlQuery }
                   completers={ completers }
                   fontSize={ editFontSize }
                   theme={ isDarkMode ? "monokai" : "github_light_default" }
                   onChange={ debounce(onChangeEidt, 3000) }
                   placeholder="编辑你的js代码" />
      </Card>
    </div>

  );
};

export default EditCode;
