/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Textarea } from "@/components/ui/textarea";

export default function TextAreaField({ carInfo, item, ...props }) {
  return (
    <div>
      <Textarea
        {...props}
        defaultValue={carInfo?.[item.name]}
        className="h-[150px]"
      />
    </div>
  );
}
