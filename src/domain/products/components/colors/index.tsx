import ColorsTable from "./components/colors_table";
import CreateColor from "./components/create_color";

export default function ColorsTab() {
  return (
    <div>
      <CreateColor />
      <ColorsTable />
    </div>
  );
}
