import React, { memo, useEffect, useState } from "react";
import { Tooltip, Button } from "antd";
import { FullscreenOutlined, FullscreenExitOutlined } from "@ant-design/icons";

function FullScreenHeaderButton () {
  const [ isFullscreen, setIsFullscreen ] = useState(false);
  const toggleFullscreen = () => {
    if ( document.fullscreenElement ) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  };

  useEffect(() => {
    // 设置是否全屏
    const handleChangeIsFullScreen = () => {
      console.log(document.fullscreenElement);
      setIsFullscreen(!!document.fullscreenElement);
    };
    // 监听全屏
    document.addEventListener("fullscreenchange", handleChangeIsFullScreen);
    return () => {
      //移除全屏
      document.removeEventListener("fullscreenchange", handleChangeIsFullScreen);
    };
  }, []);
  return (
    <Tooltip placement="bottom"
             title={ isFullscreen ? "退出全屏" : "进入全屏" }
             arrow>
      <Button type="text"
              icon={ isFullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined /> }
              onClick={ toggleFullscreen } />
    </Tooltip>
  );
}

export default memo(FullScreenHeaderButton);