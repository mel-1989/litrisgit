class grid {
    constructor(game, words){
        this.game = game;
        this.width = this.game.ctx.canvas.width;
        this.height = this.game.ctx.canvas.height;
        this.score = 0;

        this.words = words;

        //defines grid 
        this.EntityStructure = [],
        this.rows = this.height/64;
        this.cols = this.width/64;
    
        //init the grid matrix
        for ( var i = 0; i < this.rows; i++ ) {
            this.EntityStructure[i] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; 
        }
        console.log(this.EntityStructure)


        game.addEntity(new letter(game, this.width/128, 0, this.EntityStructure, "a"));
        game.addEntity(new wall(game, 0, 18, this.EntityStructure,'left'));
        game.addEntity(new wall(game, 1, 18, this.EntityStructure, 'left'));
        game.addEntity(new wall(game, 2, 18, this.EntityStructure, 'left'));
        game.addEntity(new wall(game, 3, 18, this.EntityStructure, 'left'));
        game.addEntity(new wall(game, 4, 18, this.EntityStructure, 'left'));
        game.addEntity(new wall(game, 5, 18, this.EntityStructure,'left'));
        game.addEntity(new wall(game, 6, 18, this.EntityStructure,'left'));
        game.addEntity(new wall(game, 7, 18, this.EntityStructure, 'left'));
        game.addEntity(new wall(game, 8, 18, this.EntityStructure,'left'));
        game.addEntity(new wall(game, 9, 18, this.EntityStructure, 'right'));
        game.addEntity(new wall(game, 0, 19, this.EntityStructure,'right'));
        game.addEntity(new wall(game, 1, 19, this.EntityStructure, 'right'));
        game.addEntity(new wall(game, 2, 19, this.EntityStructure, 'right'));
        game.addEntity(new wall(game, 3, 19, this.EntityStructure, 'right'));
        game.addEntity(new wall(game, 4, 19, this.EntityStructure, 'right'));
        game.addEntity(new wall(game, 5, 19, this.EntityStructure,'right'));
        game.addEntity(new wall(game, 6, 19, this.EntityStructure,'right'));
        game.addEntity(new wall(game, 7, 19, this.EntityStructure, 'right'));
        game.addEntity(new wall(game, 8, 19, this.EntityStructure,'right'));
        game.addEntity(new wall(game, 9, 19, this.EntityStructure, 'right'));
        
    
        game.addEntity(new wall(game, 0, 17, this.EntityStructure, 'right'));
        game.addEntity(new wall(game, 0, 16, this.EntityStructure, 'right'));
        game.addEntity(new wall(game, 0, 15, this.EntityStructure, 'right'));
        game.addEntity(new wall(game, 0, 14, this.EntityStructure, 'right'));
        game.addEntity(new wall(game, 0, 13, this.EntityStructure,'right'));
        game.addEntity(new wall(game, 0, 12, this.EntityStructure,'right'));
        game.addEntity(new wall(game, 0, 11, this.EntityStructure, 'right'));
        game.addEntity(new wall(game, 0, 10, this.EntityStructure,'right'));
        game.addEntity(new wall(game, 0, 9, this.EntityStructure, 'right'))
        
        game.addEntity(new wall(game, 0, 0, this.EntityStructure, 'right'));
        game.addEntity(new wall(game, 0, 1, this.EntityStructure, 'right'));
        game.addEntity(new wall(game, 0, 2, this.EntityStructure, 'right'));
        game.addEntity(new wall(game, 0, 3, this.EntityStructure, 'right'));
        game.addEntity(new wall(game, 0, 4, this.EntityStructure,'right'));
        game.addEntity(new wall(game, 0, 5, this.EntityStructure,'right'));
        game.addEntity(new wall(game, 0, 6, this.EntityStructure, 'right'));
        game.addEntity(new wall(game, 0, 7, this.EntityStructure,'right'));
        game.addEntity(new wall(game, 0, 8, this.EntityStructure, 'right'));

        game.addEntity(new wall(game, 9, 17, this.EntityStructure, 'right'));
        game.addEntity(new wall(game, 9, 16, this.EntityStructure, 'right'));
        game.addEntity(new wall(game, 9, 15, this.EntityStructure, 'right'));
        game.addEntity(new wall(game, 9, 14, this.EntityStructure, 'right'));
        game.addEntity(new wall(game, 9, 13, this.EntityStructure,'right'));
        game.addEntity(new wall(game, 9, 12, this.EntityStructure,'right'));
        game.addEntity(new wall(game, 9, 11, this.EntityStructure, 'right'));
        game.addEntity(new wall(game, 9, 10, this.EntityStructure,'right'));
        game.addEntity(new wall(game, 9, 9, this.EntityStructure, 'right'));
    
        game.addEntity(new wall(game, 9, 1, this.EntityStructure, 'right'));
        game.addEntity(new wall(game, 9, 2, this.EntityStructure, 'right'));
        game.addEntity(new wall(game, 9, 3, this.EntityStructure, 'right'));
        game.addEntity(new wall(game, 9, 4, this.EntityStructure,'right'));
        game.addEntity(new wall(game, 9, 5, this.EntityStructure,'right'));
        game.addEntity(new wall(game, 9, 6, this.EntityStructure, 'right'));
        game.addEntity(new wall(game, 9, 7, this.EntityStructure,'right'));
        game.addEntity(new wall(game, 9, 8, this.EntityStructure, 'right'));
        game.addEntity(new wall(game, 9, 0, this.EntityStructure, 'right'));



        console.log("added entities!!");

    };


    update(){
        if(this.game.escape){
            this.game.escape = false;
            this.game.reset();
        }
        
        if(this.game.player.toString() == 'dead'){
            var randomChar = (function() {//make common letters more common pls
                const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                let result = "";
                result += chars.charAt(Math.floor(Math.random() * chars.length));
                return result; 
            })();
    
            let newLetter = new letter(this.game, this.width/128, 0, this.EntityStructure, randomChar);
            this.game.addEntity(newLetter);
        }



        this.checkgrid();
    };

    checkgrid(){
        for( var i = 0; i < this.rows; i++){
            var wordCheck = '';
            for(var j = 0; j < this.cols; j++){ //add letters in row to one string
                wordCheck = wordCheck + this.EntityStructure[i][j].toString();
            }
            var dictionaryChecked = this.dictionarycheck(wordCheck)
            //here is where we check for actual words, for now just a string of blocks
            if(dictionaryChecked != -1){ //(broke)
                var pos = dictionaryChecked.location
                for(var g = pos; g < pos + dictionaryChecked.wordLength; g++){ //removing 
                    this.EntityStructure[i][g].game.remove(EntityStructure[i][g]);
                };
                this.score = this.score + dictionaryChecked.wordLength;// increment score
            };
        };
    };

    draw(ctx){
        
    };

    dictionarycheck(wordCheck){
        location = -1
        wordLength = -1
        for(let x = 0; x < this.words.length; x++) {
            if(this.words[x].includes(wordCheck)){ // only works for whole line words
                location = this.words[x].search(wordCheck);
                wordLength = this.words[x].length
                return {location, wordLength} ;
            };
        };
        return {location, wordLength};
    };

};

