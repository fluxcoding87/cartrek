/* eslint-disable react/prop-types */
import { Input } from "../ui/input";

export default function InputField({ carInfo, item, ...props }) {
  return (
    <div>
      <Input
        name={item?.name}
        type={item?.fieldType}
        defaultValue={carInfo?.[item.name]}
        {...props}
      />
    </div>
  );
}
