export default class Controller {
    get speed() {
        return 1000 - this.game.level * 100 <= 0 ? 100 : 1000 - this.game.level * 100;
    }
    get isGameOver() {
        return this.game.topOut;
    }
    constructor(game, view) {
        this.game = game;
        this.view = view;
        this.isPlaying = false;
        this.timerId = null;

        this.view.renderMainScreen(this.game.getState());
        this.view.renderStartScreen();
        document.addEventListener('keydown', (event) => this.handleKeyDown(event));
        document.addEventListener('keyup', (event) => this.handleKeyUp(event))
    }
    start() {
        this.isPlaying = true;
        this.view.renderMainScreen(this.game.getState());
        this.startTimer();
    }
    pause() {
        this.isPlaying = false;
        this.stopTimer();
        this.view.renderResumeScreen();
    }
    startTimer() {
        let tick;
        this.timerId = setTimeout(tick = () => {
            this.game.movePieceDown();

            if(this.isGameOver) {
                this.view.renderEndScreen(this.game.getState());
                this.game.resetAll();
                this.isPlaying = false;
                this.game.topOut = false;
            } else {
                this.view.renderMainScreen(this.game.getState());
                this.isPlaying = true;
                this.timerId = setTimeout(tick, this.speed);
            }
    
        }, this.speed);
    }
    stopTimer() {
        clearInterval(this.timerId);
    }
    handleKeyDown(event) {
        if(this.isPlaying) {
            switch (event.key) {
                case 'ArrowRight':
                    this.game.movePieceRight();
                    this.view.renderMainScreen(this.game.getState())
                    break;
                case 'ArrowLeft':
                    this.game.movePieceLeft();
                    this.view.renderMainScreen(this.game.getState())
                    break;
                case 'ArrowUp':
                    this.game.rotatePiece();
                    this.view.renderMainScreen(this.game.getState())

                    break;
                case 'ArrowDown':
                    this.game.movePieceDown();
                    this.view.renderMainScreen(this.game.getState())

                    if(this.isGameOver) {
                        this.view.renderEndScreen(this.game.getState());
                        this.game.resetAll();
                        this.isPlaying = false;
                        this.game.topOut = false;
                    } else {
                        this.view.renderMainScreen(this.game.getState());
                        this.isPlaying = true;
                    }
                    this.stopTimer();
                    break;
                case 'Enter':
                    this.pause();
                    break;
            }
        } else if(!this.isPlaying && event.key === 'Enter') {
            this.start();
        }
    }
    handleKeyUp(event) {
        if(this.isPlaying && event.key === 'ArrowDown') {
            this.startTimer();
        }
    }
}
