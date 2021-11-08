export default class View {
    constructor(element, width, height, columns, rows) {
        this.colors = {
            1: 'blue',
            2: 'purple',
            3: 'orange',
            4: 'green',
            5: 'cyan',
            6: 'yellow',
            7: 'red',
        };
        this.primaryFontColor = 'white';
        this.secondaryFontColor = 'black'
        this.fontSize = 18;
        this.lineHeight = 2 * this.fontSize;
        this.fontFamily = 'Press Start 2P';

        this.width = width;
        this.height = height;
        this.columns = columns;
        this.rows = rows;

        this.playfieldBorderWidth = 4;
        this.playfieldWidth = this.width / 3 * 2;
        this.playfieldHeight = this.height;
        this.playfieldX = this.playfieldBorderWidth + 1;
        this.playfieldY = this.playfieldBorderWidth + 1;
        this.playfieldInnerWidth = this.playfieldWidth - this.playfieldBorderWidth * 2;
        this.playfieldInnerHeight = this.playfieldHeight - this.playfieldBorderWidth * 2;
        this.panelWidth = this.width - this.playfieldWidth;
        this.panelHeight = this.height;
        this.panelX = this.playfieldWidth + this.fontSize;
        this.panelY = this.fontSize;
        this.blockWidth = (this.playfieldInnerWidth - 2) / this.columns;
        this.blockHeight = (this.playfieldInnerHeight - 2)/ this.rows;

        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');

        this.canvas.width = this.width;
        this.canvas.height = this.height;
        element.style.width = `${width + 20}px`;
        element.appendChild(this.canvas)

        this.renderPlayfieldBorder();
    }
    renderPlayfieldBorder() {
        this.context.strokeStyle = this.primaryFontColor;
        this.context.lineWidth = this.playfieldBorderWidth;
        this.context.strokeRect(
            this.playfieldBorderWidth / 2,
            this.playfieldBorderWidth / 2,
            this.playfieldWidth - this.playfieldBorderWidth,
            this.playfieldHeight - this.playfieldBorderWidth
        );
    }
    renderPanel(state) {
        const score = state.score;
        const lines = state.lines;
        const level = state.level;
        const nextPiece = state.nextPiece;
        this.context.fillStyle = this.primaryFontColor;
        this.context.font = `${this.fontSize}px "${this.fontFamily}"`;
        this.context.textBaseline = 'top';
        this.context.textAlign = 'start';
        this.context.fillText('Score:', this.panelX, this.panelY);
        this.context.fillText(score, this.panelX, 1 * this.lineHeight + this.panelY);
        this.context.fillText('Lines:', this.panelX, 2 * this.lineHeight + this.panelY);
        this.context.fillText(lines, this.panelX, 3 * this.lineHeight + this.panelY);
        this.context.fillText('Level:', this.panelX, 4 * this.lineHeight + this.panelY);
        this.context.fillText(level, this.panelX, 5 * this.lineHeight + this.panelY);
        this.context.fillText('Next:', this.panelX, 6 * this.lineHeight + this.panelY);
        for(let y = 0; y < nextPiece.length; y++) {
            for(let x = 0; x < nextPiece[y].length; x++) {
                if(nextPiece[y][x]) {
                    this.renderBlock(
                        x * this.blockWidth * 0.5 + this.panelX,
                        y * this.blockHeight * 0.5 + (7 * this.lineHeight + this.panelY),
                        this.blockWidth * 0.5,
                        this.blockHeight * 0.5,
                        this.colors[nextPiece[y][x]]
                    );
                }
            }
        }

    }
    renderMainScreen(state) {
        this.clearScreen()
        this.renderPlayfield(state);
        this.renderPanel(state)
    }
    renderStartScreen() {
        this.context.fillStyle = 'rgba(255, 255, 255, 0.9)'
        this.context.fillRect(
            this.playfieldBorderWidth,
            this.playfieldBorderWidth,
            this.playfieldInnerWidth,
            this.playfieldInnerHeight
        );
        this.context.fillRect(
            this.playfieldWidth,
            0,
            this.panelWidth,
            this.panelHeight
        );

        this.context.textBaseline = "middle";
        this.context.textAlign =  "center";
        this.context.font = `${this.fontSize}px "${this.fontFamily}"`;
        this.context.fillStyle = this.secondaryFontColor;
        this.context.fillText('Press ENTER to Start', this.width / 2, this.height / 2)
    }
    renderResumeScreen() {
        this.context.fillStyle = 'rgba(255, 255, 255, 0.9)'
        this.context.fillRect(
            this.playfieldBorderWidth,
            this.playfieldBorderWidth,
            this.playfieldInnerWidth,
            this.playfieldInnerHeight
        );
        this.context.fillRect(
            this.playfieldWidth,
            0,
            this.panelWidth,
            this.panelHeight
        );

        this.context.textBaseline = "middle";
        this.context.textAlign =  "center";
        this.context.font = `${this.fontSize}px "${this.fontFamily}"`;
        this.context.fillStyle = this.secondaryFontColor;
        this.context.fillText('Press ENTER to Resume', this.width / 2, this.height / 2)
    }

    renderEndScreen(state) {
        this.context.fillStyle = 'rgba(255, 255, 255, 0.9)'
        this.context.fillRect(
            this.playfieldBorderWidth,
            this.playfieldBorderWidth,
            this.playfieldInnerWidth,
            this.playfieldInnerHeight
        );
        this.context.fillRect(
            this.playfieldWidth,
            0,
            this.panelWidth,
            this.panelHeight
        );

        this.context.textBaseline = "middle";
        this.context.textAlign =  "center";
        this.context.font = `${this.fontSize}px "${this.fontFamily}"`;
        this.context.fillStyle = this.secondaryFontColor;
        this.context.fillText('Game Over', this.width / 2, this.height / 2 - this.lineHeight);
        let score = state.score;
        this.context.fillText(`Score: ${score}`, this.width / 2, this.height / 2)
        this.context.fillText('Press ENTER to Restart', this.width / 2, this.height / 2 + this.lineHeight);
    }
    renderPlayfield(state) {
        const playfield = state.playfield;

        for(let y = 0; y < playfield.length; y++) {
            for(let x = 0; x < playfield[y].length; x++) {
                if(playfield[y][x]) {
                    this.renderBlock(
                        x * this.blockWidth + this.playfieldX,
                        y * this.blockHeight + this.playfieldY,
                        this.blockWidth,
                        this.blockHeight,
                        this.colors[playfield[y][x]]
                    );
                }
            }
        }
    }
    renderBlock(x, y, width, height, color) {
        this.context.fillStyle = color;
        this.context.fillRect(x, y, width, height);
        this.context.strokeStyle = this.primaryFontColor;
        this.context.lineWidth = 1;
        this.context.strokeRect(x, y, width, height)
    }
    clearScreen() {
        this.context.clearRect(
            this.playfieldBorderWidth,
            this.playfieldBorderWidth,
            this.playfieldInnerWidth,
            this.playfieldInnerHeight
        );
        this.context.clearRect(
            this.playfieldWidth,
            0,
            this.panelWidth,
            this.panelHeight
        );
    }
}