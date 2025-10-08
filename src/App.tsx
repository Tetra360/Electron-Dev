import ButtonTab from "@/components/body/ButtonTab";
import ComboBoxTab from "@/components/body/ComboBoxTab";
import DataTableTab from "@/components/body/DataTableTab";
import InputTab from "@/components/body/InputTab";
import LabelTab from "@/components/body/LabelTab";
import SplitterTab from "@/components/body/SplitterTab";
import StepperTab from "@/components/body/StepperTab";
import TableTab from "@/components/body/TableTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function App() {
  return (
    <div className="flex min-h-svh justify-center p-8">
      <Tabs defaultValue="button" className="w-full space-y-6 items-center">
        <TabsList>
          <TabsTrigger value="button">ボタン</TabsTrigger>
          <TabsTrigger value="label">ラベル</TabsTrigger>
          <TabsTrigger value="input">テキストボックス</TabsTrigger>
          <TabsTrigger value="combobox">コンボボックス</TabsTrigger>
          <TabsTrigger value="stepper">ステッパー</TabsTrigger>
          <TabsTrigger value="table">テーブル</TabsTrigger>
          <TabsTrigger value="datatable">データテーブル</TabsTrigger>
          <TabsTrigger value="splitter">スプリッター</TabsTrigger>
        </TabsList>
        <TabsContent value="button">
          <ButtonTab />
        </TabsContent>
        <TabsContent value="label">
          <LabelTab />
        </TabsContent>
        <TabsContent value="input">
          <InputTab />
        </TabsContent>
        <TabsContent value="combobox">
          <ComboBoxTab />
        </TabsContent>
        <TabsContent value="stepper">
          <StepperTab />
        </TabsContent>
        <TabsContent value="table">
          <TableTab />
        </TabsContent>
        <TabsContent value="datatable">
          <DataTableTab />
        </TabsContent>
        <TabsContent value="splitter">
          <SplitterTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default App;
