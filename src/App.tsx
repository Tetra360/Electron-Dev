import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ButtonTab from "./components/ButtonTab";
import ComboBoxTab from "./components/ComboBoxTab";
import DataTableTab from "./components/DataTableTab";
import InputTab from "./components/InputTab";
import TableTab from "./components/TableTab";

function App() {
  return (
    <div className="flex min-h-svh justify-center p-8">
      <Tabs defaultValue="button" className="w-full items-center space-y-6">
        <TabsList>
          <TabsTrigger value="button">ボタン</TabsTrigger>
          <TabsTrigger value="input">テキストボックス</TabsTrigger>
          <TabsTrigger value="combobox">コンボボックス</TabsTrigger>
          <TabsTrigger value="table">テーブル</TabsTrigger>
          <TabsTrigger value="datatable">データテーブル</TabsTrigger>
        </TabsList>
        <TabsContent value="button">
          <ButtonTab />
        </TabsContent>
        <TabsContent value="input">
          <InputTab />
        </TabsContent>
        <TabsContent value="combobox">
          <ComboBoxTab />
        </TabsContent>
        <TabsContent value="table">
          <TableTab />
        </TabsContent>
        <TabsContent value="datatable">
          <DataTableTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default App;
