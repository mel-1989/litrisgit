const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

const lightmode = false;

ASSET_MANAGER.queueDownload('./sprites/lettersdarkmode.png');
ASSET_MANAGER.queueDownload('./sprites/letterslightmode.png');
ASSET_MANAGER.queueDownload('sprites/asgorescastlesprites.png')

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	
	gameEngine.init(ctx);
	gameEngine.addEntity(new scene(gameEngine));


	
	gameEngine.start();
});
