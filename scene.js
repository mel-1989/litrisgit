class scene {
    constructor(game){
        this.game = game;


        game.addEntity(new letter(game, 0, 0, "a"));
        game.addEntity(new wall(game, 800, 800, 'left'));
        game.addEntity(new wall(game, 865, 800, 'left'));
        game.addEntity(new wall(game, 930, 800, 'left'));
        game.addEntity(new wall(game, 995, 800, 'left'));
        game.addEntity(new wall(game, 1059, 800, 'left'));
        game.addEntity(new wall(game, 1123, 800, 'left'));

        console.log("added entities");

    };


    update(){

    };

    draw(ctx){
        
    };
};