import {
  useDeleteColorMutation,
  useGetColorsQuery,
} from "@/domain/products/api/colors.api";
import { MdDelete } from "react-icons/md";

export default function ColorsTable() {
  const { data: colorData } = useGetColorsQuery();
  const [deleteColor] = useDeleteColorMutation();

  const handleDelete = async (colorId: string) => {
    try {
      await deleteColor({ id: colorId });
      // The query will automatically refetch due to the invalidatesTags in the API
    } catch (error) {
      console.error("Failed to delete color:", error);
      // You might want to show an error message to the user here
    }
  };

  return (
    <div className="w-full bg-white mt-10 rounded">
      <div id="table" className=" w-full  scrollbar-hide h-full">
        <div id="table-header" className="uppercase bg-[#313641] text-white">
          <ul className="w-full flex justify-between font-medium">
            <li className=" basis-0 flex-1 p-2">Name</li>
            <li className=" basis-0  p-2">Delete</li>
          </ul>
        </div>
        <div id="table-body" className="">
          {colorData?.map((data) => (
            <ul
              key={data.id}
              className=" flex justify-between items-center p-2 font-bold  bg-white mb-5 border-b"
            >
              <li className=" basis-0 flex-1 p-1 capitalize flex gap-[10px] items-center">
                <span>{data.name}</span>
              </li>
              <li
                onClick={() => handleDelete(data.id)}
                className=" basis-0  p-1 capitalize text-red-500 cursor-pointer"
              >
                <MdDelete />
              </li>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}
