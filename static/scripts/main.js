const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

const lightmode = false;

var openDictionary;
var jsonobject;

ASSET_MANAGER.queueDownload("./sprites/lettersbright3.png");
ASSET_MANAGER.queueDownload("./sprites/letterslightmode.png");
ASSET_MANAGER.queueDownload("sprites/asgorescastlesprites.png");

async function loadDictionary(ctx) {
  jsonobject = await open();
  openDictionary = JSON.parse(jsonobject.message);

  var words;
  try {
    const response = await fetch("words.txt");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const text = await response.text();
    words = text
      .split("\n")
      .map((word) => word.trim())
      .filter((word) => word.length > 0);
  } catch (error) {
    console.error("Error fetching dictionary:", error);
  }

  gameEngine.init(ctx);
  gameEngine.addEntity(new grid(gameEngine, words));
  console.log(words[1]);
  gameEngine.start();
}

ASSET_MANAGER.downloadAll(() => {
  const canvas = document.getElementById("gameWorld");
  const ctx = canvas.getContext("2d");
  loadDictionary(ctx);
});

async function open() {
  try {
    const response = await fetch("/api/openai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message:
          'Generate a set of twenty words between three and 6 letters long. Output a JSON object that separates words by length and includes an array of unique characters used. Use this exact format, without any markdown or extra characters: { "3": { "words": ["cat", "dog", "sun", "hat", "run"], "characters": ["c", "a", "t", "d", "o", "g", "u", "n", "s", "h", "r"] }, "4": { "words": ["bird", "work", "moon", "star"], "characters": ["b", "i", "r", "d", "w", "o", "k", "m", "n", "s", "t", "a"] } } Ensure the output is valid JSON without any surrounding backticks or \'json\' tag. I should be able to access the information with openDictionary[\'3\'][\'characters\'][1].',
      }),
    });

    const data = await response.json();
    console.log(data);
    console.log(typeof data);
    // sanitize? check that the file is json
    return data;
  } catch (error) {
    console.error("Error fetching OpenAI response:", error);
  }
}
