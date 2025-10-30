import {
    Image,
    Input,
    Form,
    FormInstance,
    Switch,
    Radio,
    Upload,
    Button,
    DatePicker,
    InputNumber,
    Select,
    AutoComplete, notification, GetProp, UploadProps, UploadFile, Cascader
} from "antd";
import addressData from "@/components/addressCascader/address.json";
import AddressCascader from "@/components/addressCascader/TheAddressCascader"
import { UploadOutlined, LoadingOutlined } from "@ant-design/icons";
import React, {useEffect, useState} from "react";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import cookie from "@/config/cookie";
import config from "@/config";
import {RootState} from "@/store";
import {deleteImageApi} from "@/api";

// @ts-ignore
type Rule = RuleConfig | ((form: FormInstance) => RuleConfig);

export enum FormTypeVo {
  INPUT = 'input',
  TEXTAREA = 'textarea',
  NUMBER = 'number',
  UPLOAD = 'upload',
  RADIO = 'radio',
  SWITCH = 'switch',
  SELECT = 'select',
  BUTTON = 'button',
  DATE = 'date',
  RANGE_DATE = 'rangeDate',
  EMAIL = 'email',
  ADDRESS = 'address'
}
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
interface ColumnsVo {
  /**
   * 表单名称
   * */
  label: string;
  /**
   * 表单字段
   * */
  field: string;
  /**
   * 表单类型
   * */
  type: FormTypeVo;
  /**
   * 表单校验规则
   * */
  rules?: Rule[];
  /**
   * 用于radio选择器
   * */
  select?: any[];
  /**
   * 用于图片上传最大上传数量
   * */
  maxCount?: number;
}

interface PropsType extends EmailType {
  columns: ColumnsVo[];
  disabled?: boolean;
  data: any;
}

interface EmailType {
  sendDataFn: (values: any) => void;
}


const { RangePicker } = DatePicker;

const TheForm = (props: PropsType) => {
    const { columns, disabled, sendDataFn, data } = props;
    const formData = JSON.parse(JSON.stringify(data));
    const [ options, setOptions ] = useState<string[]>([]);
    const [outlineForm] = Form.useForm();

    const formItemLayout = {
      labelCol: {
        xs: { span: 2 },
        sm: { span: 3 }
      },
      wrapperCol: {
        xs: { span: 10 },
        sm: { span: 20 }
      }
    };

    const onFinish = (values: any) => {
      const val: any = {}
      Object.keys(values).forEach((key) => {
        if(values[key]?.$isDayjsObject) {
          val[key] = dayjs(values[key]).format("YYYY-MM-DD")
        } else {
          val[key] = values[key]
        }
      })
      sendDataFn(val);
    };

    /**
     * 效验邮箱
     * */
    const handleSearch = (value: string) => {
      let res = [""];
      if ( !value || value.indexOf("@") >= 0 ) {
        res = [];
      } else {
        res = [ "gmail.com", "163.com", "qq.com" ].map((domain) => `${ value }@${ domain }`);
      }

      setOptions(res);
    };

    return (
      <>
        <Form { ...formItemLayout } variant="filled"
              onFinish={ onFinish }
              form={outlineForm}
              style={ { maxWidth: 600 } }
              disabled={ disabled }
              initialValues={ formData }>
          { columns.map((item) => {
            return (
              <Form.Item label={ item.type === "button" ? "" : item.label }
                         wrapperCol={ item.type === "button" ? { offset: 3 } : {} }
                         name={ item.field }
                         rules={ item.rules }
                         getValueProps={ (value) => ({ value: item.type === "date" && value ? dayjs(value) : value }) }
                         key={ item.field }>
                { item.type === "input" && <Input /> }
                { item.type === "email" && <AutoComplete style={ {
                  width: 200
                } } onSearch={ handleSearch } placeholder="请输入邮箱地址">
                  { options.map((email) => (
                    <AutoComplete.Option key={ email }
                                         value={ email }>
                      { email }
                    </AutoComplete.Option>
                  )) }
                </AutoComplete> }
                { item.type === "number" && <InputNumber min={ 1 }
														 max={ 120 } /> }
                { item.type === "select" && <Select placeholder="">
                  { item.select?.map((twoItem) => {
                    return (<Select.Option value={ twoItem.value }
                                           key={ twoItem.value }>{ twoItem.name }</Select.Option>);
                  }) }
				</Select> }
                  { item.type === "address" && <Cascader fieldNames={{
                      label: "name",
                      value: "name",
                      children: "areas",
                  }} options={addressData} placeholder="请选择地址" /> }
                { item.type === "date" && <DatePicker needConfirm /> }
                { item.type === "rangeDate" && <RangePicker needConfirm /> }
                { item.type === "textarea" && <Input.TextArea rows={ 5 } /> }
                { item.type === "radio" && (<Radio.Group>
                  { item.select?.map((twoItem) => {
                    return (<Radio value={ twoItem.value }
                                   key={ twoItem.value }>{ twoItem.name }</Radio>);
                  }) }
                </Radio.Group>) }
                { item.type === "switch" && <Switch /> }
                { item.type === "upload" && UploadAvatar(item, data, outlineForm)}
                { item.type === "button" && <Button type="primary"
													htmlType="submit">{ item.label }</Button> }
              </Form.Item>
            );
          }) }
        </Form>
      </>
    );
  }
;
const UploadAvatar = (item: ColumnsVo, data: any, outlineForm: any) => {
    const isDarkMode = useSelector((state: RootState) => state.setting.isDarkMode);
    const [previewOpen, setPreviewOpen] = useState(true);
    const [previewImage, setPreviewImage] = useState('');
    const [loading, setLoading] = useState(false);
    const [ fileList, setFileList ] = useState<UploadFile[]>([]);

    useEffect(() => {
        const url = data.avatar?.url;
        if(url) {
            const image = [{
                uid: data.avatar.id,
                name: url.split(".")[url.split(".").length - 1],
                url
            }]
            setFileList(image);
        }
    }, [data.avatar?.id]);

    /**
     * 按钮组件
     * */
    const UploadButton = (
        <button style={ { border: 0, background: "none" } }
                type="button">
            { loading ? <LoadingOutlined style={ { color: isDarkMode ? 'white' : 'black' } } /> : <UploadOutlined style={ { color: isDarkMode ? 'white' : 'black' } } /> }
            <div style={ { marginTop: 8, color: isDarkMode ? 'white' : 'black' } }>Upload</div>
        </button>
    );

    /**
     * 上传条件
     * */
    const beforeUpload = (file: FileType) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            notification.warning({
                message: "请您上传”JPG/PNG“格式的图片"
            });
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            notification.warning({
                message: "图片最大不能超过2MB！"
            });
        }
        return isJpgOrPng && isLt2M;
    };

    /**
     * 上传图片成功
     * */
    const handleChange: UploadProps['onChange'] = (info) => {
        setFileList(info.fileList);
        if (info.file.status === 'done') {
            outlineForm.setFieldsValue({
                avatarId: info.file.response.response.id
            })
        }
    }

    /**
     * 点击预览大图
     * */
    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    /**
     * 点击删除图片
     * */
    const handleRemove = (file: UploadFile) =>{
        setFileList([]);
        if(!file.url) return;
        deleteImageApi({id: file.uid,url: file.url.replace("/ms", "")}).then(res => {
            setFileList([]);
        });
    }

    return (
        <>
            <Upload action="/ms/file/upload"
                    listType="picture-card"
                    fileList={fileList}
                    headers={ {
                        Authorization: cookie.get(config.prefix + 'token') || "",
                    } }
                    maxCount={ item.maxCount || 1 }
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                    onPreview={handlePreview}
                    onRemove={handleRemove}
            >
                {fileList.length >= 1 ? null : UploadButton}
            </Upload>
            {previewImage &&
            <Image
                wrapperStyle={{ display: 'none' }}
                preview={{
                    visible: previewOpen,
                    onVisibleChange: (visible) => setPreviewOpen(visible),
                    afterOpenChange: (visible) => !visible && setPreviewImage(''),
                }}
                src={previewImage}
            />}
        </>
    )
}

const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

export default TheForm;