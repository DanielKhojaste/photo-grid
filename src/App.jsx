import { useState } from "react";
import "./App.css";

function App() {
	const [imageItems, setImageItems] = useState([]);

	const handleFileChange = (event) => {
		const files = Array.from(event.target.files);

		const newItems = files.map((file, index) => ({
			id: `${file.name}-${Date.now()}-${index}`,
			name: file.name.replace(/\.[^/.]+$/, ""),
			imageUrl: URL.createObjectURL(file),
		}));

		setImageItems((prevItems) => [...prevItems, ...newItems]);
	};

	const handlePrint = () => {
		window.print();
	};

	const handleClear = () => {
		imageItems.forEach((item) => URL.revokeObjectURL(item.imageUrl));
		setImageItems([]);
	};

	return (
		<div className="app-container">
			<div className="controls-container">
				<label className="btn btn-upload">
					📁 Select Photos
					<input
						type="file"
						accept="image/*"
						multiple
						onChange={handleFileChange}
						style={{ display: "none" }}
					/>
				</label>

				{imageItems.length > 0 && (
					<>
						<button className="btn btn-print" onClick={handlePrint}>
							🖨️ Print Grid
						</button>
						<button className="btn btn-clear" onClick={handleClear}>
							🗑️ Clear Grid
						</button>
					</>
				)}
			</div>

			{imageItems.length === 0 ? (
				<div className="empty-state">
					<p>No photos uploaded yet. Click "Select Photos" to build your grid.</p>
					<small>
						Tip: Select up to 12 portrait images to fill a clean 3x4 layout single page.
					</small>
				</div>
			) : (
				<main className="print-grid">
					{imageItems.map((item) => (
						<div key={item.id} className="grid-card">
							<div className="image-wrapper">
								<img src={item.imageUrl} alt={item.name} className="vertical-image" />
							</div>
							<p className="item-name">{item.name}</p>
						</div>
					))}
				</main>
			)}
		</div>
	);
}

export default App;
