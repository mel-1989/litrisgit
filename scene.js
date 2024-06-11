class scene {
    constructor(game){
        this.game = game;
        this.width = this.game.ctx.canvas.width;
        //this.height = window.innerHeight;
        game.addEntity(new letter(game, this.width/2, 0, "a"));
        game.addEntity(new wall(game, 200, 800, 'left'));
        game.addEntity(new wall(game, 265, 800, 'left'));
        game.addEntity(new wall(game, 330, 800, 'left'));
        game.addEntity(new wall(game, 395, 800, 'left'));
        game.addEntity(new wall(game, 459, 800, 'left'));
        game.addEntity(new wall(game, 423, 800, 'left'));

        console.log("added entities");

    };


    update(){
        if(this.game.escape){
            this.game.escape = false;
            this.game.reset();
        }
        
        if(this.game.player == 'dead'){
            let newLetter = new letter(this.game, this.width/2, 0, "a");
            this.game.addEntity(newLetter);
            console.log("eoeoeo");
        }
    };

    draw(ctx){
        
    };
};