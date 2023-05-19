import { FC, useState, useRef } from 'react'
import { Button, ConfigProvider, message } from 'antd';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import { ShowCodeDialog } from '../CustomDialog';

import './ShowCodeBottom.scss';

interface ShowCodeBottomProps {
  codeText: string,
  title: string,
}

export const ShowCodeBottom: FC<ShowCodeBottomProps> = (props) => {
  const { codeText, title } = props;

  const [codeDialogVisible, setCodeDialogVisible] = useState<boolean>(false);
  const textAreaRef: any = useRef(null);
  const [messageApi, contextHolder] = message.useMessage();

  const handleCodeModalOK = () => {
    textAreaRef.current.value = codeText;
    textAreaRef.current.select();
    document.execCommand("copy");
    messageApi.info('复制成功!');
    setCodeDialogVisible(false);
  };

  const handleCodeModalCancel = () => {
    setCodeDialogVisible(false);
  };
  return (
    <div className="show-code-bottom">
      {contextHolder}
      <ConfigProvider theme={{
        token: {
          colorPrimary: '#150C92',
        }
      }}>
        <Button type='primary' onClick={() => { setCodeDialogVisible(true) }}>查看代码</Button>
        <ShowCodeDialog title={title} isModalOpen={codeDialogVisible} onOk={handleCodeModalOK} onCancel={handleCodeModalCancel}>
          <>
            <AceEditor
              mode="javascript"
              theme="github"
              name="codeAceEditor"
              fontSize={14}
              showPrintMargin={true}
              showGutter={true}
              highlightActiveLine={false}
              width='100%'
              height='300px'
              value={codeText}
              setOptions={{
                enableBasicAutocompletion: false,
                enableLiveAutocompletion: false,
                enableSnippets: false,
                showLineNumbers: true,
                tabSize: 2,
                readOnly: true,
              }} />
            <textarea name="hideCode" id="hideCode" cols={0} rows={0} style={{ opacity: 0 }} ref={textAreaRef}></textarea>
          </>
        </ShowCodeDialog>
      </ConfigProvider>
    </div>
  )
}
