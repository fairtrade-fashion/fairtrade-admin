// // import { Button } from "@/components/button";
// // import { Input } from "@/components/input";
// // import { FormControl, FormField, FormItem } from "@/components/form";
// // import { Control, useFieldArray } from "react-hook-form";
// // import { Plus, X } from "lucide-react";
// // import {
// //   Select,
// //   SelectContent,
// //   SelectItem,
// //   SelectTrigger,
// //   SelectValue,
// // } from "@/components/select";
// // import { ColorRoot } from "@/domain/products/models/colors.model";
// // import { ProductFormData } from "@/utils/validation.schema";

// // interface ColorInputProps {
// //   control: Control<ProductFormData>;
// //   colors: ColorRoot;
// // }

// // export function ColorInput({ control, colors }: ColorInputProps) {
// //   const { fields, append, remove } = useFieldArray({
// //     control,
// //     name: "colors",
// //   });

// //   return (
// //     <div>
// //       {fields.map((field, index) => (
// //         <div key={field.id} className="flex items-center space-x-2 mb-2">
// //           <FormField
// //             control={control}
// //             name={`colors.${index}.id`}
// //             render={({ field }) => (
// //               <FormItem className="flex-1">
// //                 <Select onValueChange={field.onChange} value={field.value}>
// //                   <FormControl>
// //                     <SelectTrigger>
// //                       <SelectValue placeholder="Select color" />
// //                     </SelectTrigger>
// //                   </FormControl>
// //                   <SelectContent>
// //                     {colors.map((color) => (
// //                       <SelectItem key={color.id} value={color.id}>
// //                         {color.name}
// //                       </SelectItem>
// //                     ))}
// //                   </SelectContent>
// //                 </Select>
// //               </FormItem>
// //             )}
// //           />
// //           <FormField
// //             control={control}
// //             name={`colors.${index}.stock`}
// //             render={({ field }) => (
// //               <FormItem>
// //                 <FormControl>
// //                   <Input
// //                     type="number"
// //                     placeholder="Stock"
// //                     {...field}
// //                     onChange={(e) =>
// //                       field.onChange(parseInt(e.target.value, 10))
// //                     }
// //                   />
// //                 </FormControl>
// //               </FormItem>
// //             )}
// //           />
// //           <Button
// //             type="button"
// //             variant="ghost"
// //             size="icon"
// //             onClick={() => remove(index)}
// //           >
// //             <X className="h-4 w-4" />
// //           </Button>
// //         </div>
// //       ))}
// //       <Button
// //         type="button"
// //         variant="outline"
// //         size="sm"
// //         className="mt-2"
// //         onClick={() => append({ id: "", stock: 1 })}
// //       >
// //         <Plus className="h-4 w-4 mr-2" />
// //         Add Color
// //       </Button>
// //     </div>
// //   );
// // }

// import React from "react";
// import { Control } from "react-hook-form";
// // import {
// //   FormField,
// //   FormItem,
// //   FormControl,
// //   FormLabel,
// //   FormMessage,
// // } from "@/components/form";
// import { Input } from "@/components/input";
// import { Checkbox } from "@/components/checkbox";
// import { ProductFormData } from "@/utils/validation.schema";

// interface ColorInputProps {
//   control: Control<ProductFormData>;
//   colors: { id: string; name: string }[];
//   onChange: (colors: { id: string; stock: number }[]) => void;
// }

// export const ColorInput: React.FC<ColorInputProps> = ({
//   // control,
//   colors,
//   onChange,
// }) => {
//   const [selectedColors, setSelectedColors] = React.useState<
//     { id: string; stock: number }[]
//   >([]);

//   const handleColorChange = (colorId: string, isChecked: boolean) => {
//     if (isChecked) {
//       setSelectedColors([...selectedColors, { id: colorId, stock: 0 }]);
//     } else {
//       setSelectedColors(selectedColors.filter((color) => color.id !== colorId));
//     }
//   };

//   const handleStockChange = (colorId: string, stock: number) => {
//     const updatedColors = selectedColors.map((color) =>
//       color.id === colorId ? { ...color, stock } : color
//     );
//     setSelectedColors(updatedColors);
//   };

//   React.useEffect(() => {
//     onChange(selectedColors);
//   }, [selectedColors, onChange]);

//   return (
//     <div>
//       {colors.map((color) => (
//         <div key={color.id} className="flex items-center space-x-2 mb-2">
//           <Checkbox
//             id={`color-${color.id}`}
//             onCheckedChange={(checked) =>
//               handleColorChange(color.id, checked as boolean)
//             }
//           />
//           <label htmlFor={`color-${color.id}`}>{color.name}</label>
//           {selectedColors.some((c) => c.id === color.id) && (
//             <Input
//               type="number"
//               placeholder="Stock"
//               onChange={(e) =>
//                 handleStockChange(color.id, parseInt(e.target.value, 10))
//               }
//               className="w-20"
//             />
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

import { useState, useEffect } from "react";
import { Control } from "react-hook-form";
import { Checkbox } from "@/components/checkbox";
import { Input } from "@/components/input";
import { ProductFormData } from "@/utils/validation.schema";

interface Color {
  id: string;
  name: string;
}

interface ColorInputProps {
  control: Control<ProductFormData>;
  colors: Color[];
  onChange: (colors: { id: string; stock: number }[]) => void;
  initialColors?: { id: string; stock: number }[];
}

export function ColorInput({
  colors,
  onChange,
  initialColors = [],
}: ColorInputProps) {
  const [selectedColors, setSelectedColors] =
    useState<{ id: string; stock: number }[]>(initialColors);

  useEffect(() => {
    setSelectedColors(initialColors);
  }, []);

  const handleColorToggle = (colorId: string, checked: boolean) => {
    if (checked) {
      setSelectedColors([...selectedColors, { id: colorId, stock: 0 }]);
    } else {
      setSelectedColors(selectedColors.filter((color) => color.id !== colorId));
    }
  };

  const handleStockChange = (colorId: string, stock: number) => {
    setSelectedColors(
      selectedColors.map((color) =>
        color.id === colorId ? { ...color, stock } : color
      )
    );
  };

  useEffect(() => {
    onChange(selectedColors);
  }, [selectedColors, onChange]);

  return (
    <div className="space-y-2">
      {colors.map((color) => (
        <div key={color.id} className="flex items-center space-x-2">
          <Checkbox
            id={`color-${color.id}`}
            checked={selectedColors.some((c) => c.id === color.id)}
            onCheckedChange={(checked) =>
              handleColorToggle(color.id, checked as boolean)
            }
          />
          <label htmlFor={`color-${color.id}`}>{color.name}</label>
          {selectedColors.some((c) => c.id === color.id) && (
            <Input
              type="number"
              placeholder="Stock"
              className="w-20"
              value={selectedColors.find((c) => c.id === color.id)?.stock || 0}
              onChange={(e) =>
                handleStockChange(color.id, parseInt(e.target.value, 10))
              }
            />
          )}
        </div>
      ))}
    </div>
  );
}
