/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

function InputComp({
  control,
  name,
  label,
  description = "",
  placeholder = "",
  type = "text",
}: {
  control: any;
  name: string;
  label: string;
  description?: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              type={type}
              {...field}
              onChange={(e) =>
                field.onChange(
                  type === "number" ? Number(e.target.value) : e.target.value
                )
              }
            />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default InputComp;
