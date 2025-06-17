import { useEffect, useRef } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript"; // 引入 SQL 模式
import "ace-builds/src-noconflict/theme-github_light_default"; // 引入 GitHub 暗黑主题
import "ace-builds/src-noconflict/theme-monokai"; // 引入 GitHub 暗黑主题
import "ace-builds/src-noconflict/theme-github"; // 引入 GitHub 主题
// 如果要有代码提示，下面这句话必须引入!!!
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/ext-error_marker";

const SqlEditor = (props: any) => {
  const editorInstance = useRef<any>(); // 获取编辑器实例
  const { placeholder, defaultValue, onChange, completers, height, theme, fontSize } = props;
  const complete = (editor: any) => {
    editor.completers = [
      // 自己的代码提示
      {
        getCompletions: function (
          editor: any,
          session: any,
          pos: any,
          prefix: any,
          callback: any
        ) {
          callback(null, completers);
        }
      }
      // 编辑器的代码提示
      // ...editor.completers,
    ];
  };

  useEffect(() => {
    // !动态改变编辑器的代码提示，必须重新设置
    complete(editorInstance.current.editor);
  }, [ completers ]);

  return (
    <AceEditor ref={ editorInstance }
               placeholder={ placeholder }
               mode="javascript"
               theme={ theme }
               defaultValue={ defaultValue }
               name="UNIQUE_ID_OF_EDITOR"
               fontSize={ fontSize }
               editorProps={ { $blockScrolling: true } }
               onChange={ onChange }
               onPaste={ onChange }
               onLoad={ complete }
               showPrintMargin={ true }
               showGutter={ true }
               highlightActiveLine={ true }
               setOptions={ {
                 useWorker: true,
                 enableBasicAutocompletion: true,
                 enableLiveAutocompletion: true,
                 enableSnippets: true,
                 showLineNumbers: true,
                 tabSize: 2
               } }
               width="100%"
               height={ height ?? "100%" } />
  );
};

export default SqlEditor;

