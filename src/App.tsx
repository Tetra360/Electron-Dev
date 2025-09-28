import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

function App() {
	return (
		<div className="flex min-h-svh items-center justify-center">
			<div className="flex flex-col items-center gap-6">
				{/* ボタンとセレクトを縦方向に並べる */}
				<Button className="px-8 py-4 text-lg">Click me</Button>
				<Input />
				<Select>
					<SelectTrigger className="w-[200px]">
						<SelectValue placeholder="Theme" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="light">Light</SelectItem>
						<SelectItem value="dark">Dark</SelectItem>
						<SelectItem value="system">System</SelectItem>
					</SelectContent>
				</Select>
			</div>
		</div>
	);
}

export default App;
