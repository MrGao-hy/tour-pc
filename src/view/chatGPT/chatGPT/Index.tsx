import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const ChatGPT = () => {
  let iframe = document.getElementById("iframe");

  // 向 iframe 发送消息
  //     iframe.contentWindow.postMessage({ type: 'greeting', text: 'Hello iframe!' }, 'https://example.com');

  useEffect(() => {
    const url =
      "http://test.iwenqi.cn:81/wenqi-test/#/smallAides/500?flag=yueke&ticket=U3ZQVDWMNBT";
    let data = "hello";
    // 发消息
    if (iframe) {
      iframe.contentWindow.postMessage(data, "*");
    }
  });
  return (
    <iframe
      id="iframe"
      title="Embedded Web Page"
      src={
        "http://test.iwenqi.cn:81/wenqi-test/#/smallAides/500?flag=yueke&ticket=U3ZQVDWMNBT"
      }
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default ChatGPT;
