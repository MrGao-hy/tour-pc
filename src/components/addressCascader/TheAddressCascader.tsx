import addressData from "./address.json";
import {Cascader} from "antd";

interface Option {
    value: string;
    label: string;
    children?: Option[];
}

const AddressCascader = (() => {
    return (
        <Cascader fieldNames={{
            label: "name",
            value: "code",
            children: "areas",
        }} options={addressData} placeholder="请选择地址" />
    )
})

export default AddressCascader;