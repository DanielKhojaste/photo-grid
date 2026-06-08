import { useState } from "react";
import "./App.css";

function App() {
	const [imageItems, setImageItems] = useState([]);

	const handleFileChange = (event) => {
		const files = Array.from(event.target.files);

		// Convert local files into temporary object URLs that React can render
		const newItems = files.map((file, index) => ({
			id: `${file.name}-${Date.now()}-${index}`,
			// Cleans up the name by removing the file extension (e.g., "john_doe.jpg" -> "john_doe")
			name: file.name.replace(/\.[^/.]+$/, ""),
			imageUrl: URL.createObjectURL(file),
		}));

		// Appends new selections to the grid
		setImageItems((prevItems) => [...prevItems, ...newItems]);
	};

	const handlePrint = () => {
		window.print();
	};

	const handleClear = () => {
		// Clean up memory by revoking object URLs before wiping state
		imageItems.forEach((item) => URL.revokeObjectURL(item.imageUrl));
		setImageItems([]);
	};

	return (
		<div className="app-container">
			{/* Control panel hidden entirely during printing */}
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
					<small>Tip: Select 12 portrait images for a perfect 3x4 layout page.</small>
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
