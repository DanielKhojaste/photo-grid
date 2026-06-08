import "./App.css";

// Sample data for 12 items (3x4 grid)
// Replace the imageUrls and names with your actual data
const imageItems = Array.from({ length: 12 }, (_, i) => ({
	id: i + 1,
	name: `Person Name ${i + 1}`,
	imageUrl: `https://picsum.photos/300/400?random=${i + 1}`, // Vertical 3:4 aspect ratio placeholder
}));

function App() {
	const handlePrint = () => {
		window.print();
	};

	return (
		<div className="app-container">
			{/* This button will automatically disappear on the actual printed page */}
			<button className="print-actions-btn" onClick={handlePrint}>
				🖨️ Print Grid
			</button>

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
		</div>
	);
}

export default App;
