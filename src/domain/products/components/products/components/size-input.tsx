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
// // import { SizeRoot } from "@/domain/products/models/size.model";
// // import { ProductFormData } from "@/utils/validation.schema";

// // interface SizeInputProps {
// //   control: Control<ProductFormData>;
// //   sizes: SizeRoot;
// // }

// // export function SizeInput({ control, sizes }: SizeInputProps) {
// //   const { fields, append, remove } = useFieldArray({
// //     control,
// //     name: "sizes",
// //   });

// //   return (
// //     <div>
// //       {fields.map((field, index) => (
// //         <div key={field.id} className="flex items-center space-x-2 mb-2">
// //           <FormField
// //             control={control}
// //             name={`sizes.${index}.id`}
// //             render={({ field }) => (
// //               <FormItem className="flex-1">
// //                 <Select onValueChange={field.onChange} value={field.value}>
// //                   <FormControl>
// //                     <SelectTrigger>
// //                       <SelectValue placeholder="Select size" />
// //                     </SelectTrigger>
// //                   </FormControl>
// //                   <SelectContent>
// //                     {sizes.map((size) => (
// //                       <SelectItem key={size.id} value={size.id}>
// //                         {size.name}
// //                       </SelectItem>
// //                     ))}
// //                   </SelectContent>
// //                 </Select>
// //               </FormItem>
// //             )}
// //           />
// //           <FormField
// //             control={control}
// //             name={`sizes.${index}.stock`}
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
// //         Add Size
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

// interface SizeInputProps {
//   control: Control<ProductFormData>;
//   sizes: { id: string; name: string }[];
//   onChange: (sizes: { id: string; stock: number }[]) => void;
// }

// export const SizeInput: React.FC<SizeInputProps> = ({
//   // control,
//   sizes,
//   onChange,
// }) => {
//   const [selectedSizes, setSelectedSizes] = React.useState<
//     { id: string; stock: number }[]
//   >([]);

//   const handleSizeChange = (sizeId: string, isChecked: boolean) => {
//     if (isChecked) {
//       setSelectedSizes([...selectedSizes, { id: sizeId, stock: 0 }]);
//     } else {
//       setSelectedSizes(selectedSizes.filter((size) => size.id !== sizeId));
//     }
//   };

//   const handleStockChange = (sizeId: string, stock: number) => {
//     const updatedSizes = selectedSizes.map((size) =>
//       size.id === sizeId ? { ...size, stock } : size
//     );
//     setSelectedSizes(updatedSizes);
//   };

//   React.useEffect(() => {
//     onChange(selectedSizes);
//   }, [selectedSizes, onChange]);

//   return (
//     <div>
//       {sizes.map((size) => (
//         <div key={size.id} className="flex items-center space-x-2 mb-2">
//           <Checkbox
//             id={`size-${size.id}`}
//             onCheckedChange={(checked) =>
//               handleSizeChange(size.id, checked as boolean)
//             }
//           />
//           <label htmlFor={`size-${size.id}`}>{size.name}</label>
//           {selectedSizes.some((s) => s.id === size.id) && (
//             <Input
//               type="number"
//               placeholder="Stock"
//               onChange={(e) =>
//                 handleStockChange(size.id, parseInt(e.target.value, 10))
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

interface Size {
  id: string;
  name: string;
}

interface SizeInputProps {
  control: Control<ProductFormData>;
  sizes: Size[];
  onChange: (sizes: { id: string; stock: number }[]) => void;
  initialSizes?: { id: string; stock: number }[];
}

export function SizeInput({
  sizes,
  onChange,
  initialSizes = [],
}: SizeInputProps) {
  const [selectedSizes, setSelectedSizes] =
    useState<{ id: string; stock: number }[]>(initialSizes);

  useEffect(() => {
    setSelectedSizes(initialSizes);
  }, [initialSizes]);

  const handleSizeToggle = (sizeId: string, checked: boolean) => {
    if (checked) {
      setSelectedSizes([...selectedSizes, { id: sizeId, stock: 0 }]);
    } else {
      setSelectedSizes(selectedSizes.filter((size) => size.id !== sizeId));
    }
  };

  const handleStockChange = (sizeId: string, stock: number) => {
    setSelectedSizes(
      selectedSizes.map((size) =>
        size.id === sizeId ? { ...size, stock } : size
      )
    );
  };

  useEffect(() => {
    onChange(selectedSizes);
  }, [selectedSizes, onChange]);

  return (
    <div className="space-y-2">
      {sizes.map((size) => (
        <div key={size.id} className="flex items-center space-x-2">
          <Checkbox
            id={`size-${size.id}`}
            checked={selectedSizes.some((s) => s.id === size.id)}
            onCheckedChange={(checked) =>
              handleSizeToggle(size.id, checked as boolean)
            }
          />
          <label htmlFor={`size-${size.id}`}>{size.name}</label>
          {selectedSizes.some((s) => s.id === size.id) && (
            <Input
              type="number"
              placeholder="Stock"
              className="w-20"
              value={selectedSizes.find((s) => s.id === size.id)?.stock || 0}
              onChange={(e) =>
                handleStockChange(size.id, parseInt(e.target.value, 10))
              }
            />
          )}
        </div>
      ))}
    </div>
  );
}
