export default class Music {
    constructor(musicSrc, view) {
        this.musicObject = new Audio(musicSrc);
        this.view = view;
        this.view.canvas.addEventListener("mousedown", (event) => {
            const musicButton = this.view.musicButton;
            if(checkCollision(event.offsetX, event.offsetY, musicButton)) {
                this.playSwitch();
            }
            function checkCollision(x, y, obj) {
                return x >= obj.x && x <= obj.x + obj.width &&
                        y >= obj.y && y <= obj.y + obj.height
            }
        });

    }
    playSwitch() {
        if(this.view.playbackStatus === 'off') {
            this.view.playbackStatus = 'on';
            this.musicObject.play();
        } else if(this.view.playbackStatus === 'on') {
            this.view.playbackStatus = 'off';
            this.musicObject.pause();
        }
        this.view.renderMusicButton(this.view.playbackStatus);
    }
}