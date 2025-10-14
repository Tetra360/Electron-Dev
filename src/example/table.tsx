import { DataTable } from "./components/DataTable";
import { columnDefinitions } from "./data/columnDefinitions";
import sampleData from "./data/sampleData.json";

/**
 * データテーブルの使用例コンポーネント
 *
 * このコンポーネントは、DataTableコンポーネントの基本的な使用方法を示します。
 * サンプルデータとカラム定義を使用してテーブルを表示します。
 */
export default function App() {
  return <DataTable data={sampleData} columns={columnDefinitions} />;
}
