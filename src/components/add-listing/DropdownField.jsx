/* eslint-disable react/prop-types */
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function DropdownField({ carInfo, item, ...props }) {
  console.log(carInfo[item?.name]);

  return (
    <div>
      <Select {...props} defaultValue={carInfo[item?.name]}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={carInfo?.[item?.name] ?? item.label} />
        </SelectTrigger>
        <SelectContent>
          {item?.options?.map((option, index) => (
            <SelectItem key={index} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
