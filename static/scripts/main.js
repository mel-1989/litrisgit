const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

const lightmode = false;

ASSET_MANAGER.queueDownload('./sprites/lettersdarkmode.png');
ASSET_MANAGER.queueDownload('./sprites/letterslightmode.png');
ASSET_MANAGER.queueDownload('sprites/asgorescastlesprites.png')

async function loadDictionary(ctx) {
	var words;
	try {
	  const response = await fetch('words.txt');
	  if (!response.ok) {
		throw new Error('Network response was not ok');
	  }
	  const text = await response.text();
	  words = text.split('\n').map(word => word.trim()).filter(word => word.length > 0);
	} catch (error) {
	  console.error('Error fetching dictionary:', error);
	}

	gameEngine.init(ctx);
	gameEngine.addEntity(new grid(gameEngine, words));
	console.log(words[1])
	gameEngine.start();
};



ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	loadDictionary(ctx);
});


