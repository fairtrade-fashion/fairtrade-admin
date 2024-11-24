// import * as React from "react";
// import { X } from "lucide-react";
// import { Command as CommandPrimitive } from "cmdk";

// import { Badge } from "@/components/badge";
// import { Command, CommandGroup, CommandItem } from "@/components/command";

// export type Option = {
//   value: string;
//   label: string;
//   disable?: boolean;
// };

// type MultipleSelectProps = {
//   value?: Option[];
//   onChange?: (value: Option[]) => void;
//   placeholder?: string;
//   options: Option[];
//   emptyIndicator?: React.ReactNode;
// };

// export function MultipleSelector({
//   value = [],
//   onChange,
//   placeholder,
//   options,
//   emptyIndicator,
// }: MultipleSelectProps) {
//   const inputRef = React.useRef<HTMLInputElement>(null);
//   const [open, setOpen] = React.useState(false);
//   const [selected, setSelected] = React.useState<Option[]>(value);
//   const [inputValue, setInputValue] = React.useState("");

//   const handleUnselect = React.useCallback((option: Option) => {
//     setSelected((prev) => prev.filter((s) => s.value !== option.value));
//   }, []);

//   const handleKeyDown = React.useCallback(
//     (e: React.KeyboardEvent<HTMLDivElement>) => {
//       const input = inputRef.current;
//       if (input) {
//         if (e.key === "Delete" || e.key === "Backspace") {
//           if (input.value === "") {
//             setSelected((prev) => {
//               const newSelected = [...prev];
//               newSelected.pop();
//               return newSelected;
//             });
//           }
//         }
//         if (e.key === "Escape") {
//           input.blur();
//         }
//       }
//     },
//     []
//   );

//   const selectables = options.filter((option) => !selected.includes(option));

//   React.useEffect(() => {
//     onChange?.(selected);
//   }, [selected, onChange]);

//   return (
//     <Command
//       onKeyDown={handleKeyDown}
//       className="overflow-visible bg-transparent"
//     >
//       <div className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
//         <div className="flex gap-1 flex-wrap">
//           {selected.map((option) => {
//             return (
//               <Badge key={option.value} variant="secondary">
//                 {option.label}
//                 <button
//                   className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
//                   onKeyDown={(e) => {
//                     if (e.key === "Enter") {
//                       handleUnselect(option);
//                     }
//                   }}
//                   onMouseDown={(e) => {
//                     e.preventDefault();
//                     e.stopPropagation();
//                   }}
//                   onClick={() => handleUnselect(option)}
//                 >
//                   <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
//                 </button>
//               </Badge>
//             );
//           })}
//           <CommandPrimitive.Input
//             ref={inputRef}
//             value={inputValue}
//             onValueChange={setInputValue}
//             onBlur={() => setOpen(false)}
//             onFocus={() => setOpen(true)}
//             placeholder={placeholder}
//             className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1"
//           />
//         </div>
//       </div>
//       <div className="relative mt-2">
//         {open && selectables.length > 0 ? (
//           <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
//             <CommandGroup className="h-full overflow-auto">
//               {selectables.map((option) => {
//                 return (
//                   <CommandItem
//                     key={option.value}
//                     onMouseDown={(e) => {
//                       e.preventDefault();
//                       e.stopPropagation();
//                     }}
//                     onSelect={() => {
//                       setInputValue("");
//                       setSelected((prev) => [...prev, option]);
//                     }}
//                     className={"cursor-pointer"}
//                   >
//                     {option.label}
//                   </CommandItem>
//                 );
//               })}
//             </CommandGroup>
//           </div>
//         ) : null}
//       </div>
//     </Command>
//   );
// }

import React, { useState } from "react";

export type Option = {
  value: string;
  label: string;
};

interface MultiSelectorProps {
  options: Option[];
  value: Option[];
  onChange: (value: Option[]) => void;
}

export const MultipleSelector: React.FC<MultiSelectorProps> = ({
  options,
  value,
  onChange,
}) => {
  const [inputValue, setInputValue] = useState("");

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {value.map((v) => (
          <span key={v.value} className="px-2 py-1 bg-gray-200 rounded">
            {v.label}
          </span>
        ))}
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="mt-2 border px-2 py-1 rounded"
      />
      <div>
        {options
          .filter((o) =>
            o.label.toLowerCase().includes(inputValue.toLowerCase())
          )
          .map((o) => (
            <div key={o.value} onClick={() => onChange([...value, o])}>
              {o.label}
            </div>
          ))}
      </div>
    </div>
  );
};
