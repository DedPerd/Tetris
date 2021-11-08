export default class Game {
    get level() {
        return Math.floor(this.lines / 10);
    }
    constructor(columns, rows) {
        this.rows = rows;
        this.columns = columns;
        this.playfield = this.createPlayfield();
        this.activePiece = this.createPiece();
        this.nextPiece = this.createPiece();

        this.score = 0;
        this.lines = 0;
    }

    movePieceRight() {
        this.activePiece.x += 1;
        if(this.hasCollision()) {
            this.activePiece.x -= 1;
        }
    }
    movePieceLeft() {
        this.activePiece.x -= 1;
        if(this.hasCollision()) {
            this.activePiece.x += 1;
        }
    }
    movePieceDown() {
        this.activePiece.y += 1;
        if(this.hasCollision()) {
            this.activePiece.y -= 1;
            this.lockPiece();
            this.updateScore(this.clearLines());
            this.updatePieces();
        }
    }
    rotatePiece() {
        if (this.activePiece.rotationIndex < this.activePiece.rotations.length - 1) {
            this.activePiece.rotationIndex += 1;
        } else {
            this.activePiece.rotationIndex = 0;
        }

        if(this.hasCollision()) {
            if (this.activePiece.rotationIndex > 0) {
                this.activePiece.rotationIndex -= 1;
            } else {
                this.activePiece.rotationIndex = 3;
            }
        }
    }
    hasCollision() {
        const blocks = this.activePiece.blocks;
        for(let y = 0; y < blocks.length; y++) {
            for(let x = 0; x < blocks[y].length; x++) {
                if(blocks[y][x]) {
                    if(
                        (this.playfield[this.activePiece.y + y] === undefined ||
                        this.playfield[this.activePiece.y + y][this.activePiece.x + x] === undefined) || // если фигура вышла за пределы игрового поля
                        this.playfield[this.activePiece.y + y][this.activePiece.x + x] // если место куда хочет встать фигура уже занято
                    ) return true;
                }
            }
        }
        return false;
    }
    lockPiece() {
        const blocks = this.activePiece.blocks;
        for(let y = 0; y < blocks.length; y++) {
            for(let x = 0; x < blocks[y].length; x++) {
                if(blocks[y][x]) {
                    this.playfield[this.activePiece.y + y][this.activePiece.x + x] = blocks[y][x];
                }
            }
        }
    }
    getState() {
        const playfield = this.createPlayfield();
        for(let y = 0; y < this.playfield.length; y++) {
            for(let x = 0; x < this.playfield[y].length; x++) {
                playfield[y][x] = this.playfield[y][x];
            }
        }
        const blocks = this.activePiece.blocks;
        for(let y = 0; y < blocks.length; y++) {
            for(let x = 0; x < blocks[y].length; x++) {
                if(blocks[y][x]) {
                    playfield[this.activePiece.y + y][this.activePiece.x + x] = blocks[y][x];
                }
            }
        }
        return {
            playfield,
            score: this.score,
            lines: this.lines,
            level: this.level,
            nextPiece: this.nextPiece.blocks
        }
    }
    updatePieces() {
        this.activePiece = this.nextPiece;
        this.nextPiece = this.createPiece();
    }
    createPiece() {
        let index = Math.floor(Math.random() * 7);
        let type = 'JTLSIOZ'[index];
        let piece = {
            get blocks() {
                return piece.rotations[piece.rotationIndex];
            },
            rotationIndex: 0,
        };
        switch (type) {
            case 'J':
                piece.rotations = [
                    [
                        [1,0,0],
                        [1,1,1],
                        [0,0,0]
                    ],
                    [
                        [0,1,1],
                        [0,1,0],
                        [0,1,0]
                    ],
                    [
                        [0,0,0],
                        [1,1,1],
                        [0,0,1]
                    ],
                    [
                        [0,1,0],
                        [0,1,0],
                        [1,1,0]
                    ]
                ];
                break;
            case 'T':
                piece.rotations = [
                    [
                        [0,2,0],
                        [2,2,2],
                        [0,0,0]
                    ],
                    [
                        [0,2,0],
                        [0,2,2],
                        [0,2,0]
                    ],
                    [
                        [0,0,0],
                        [2,2,2],
                        [0,2,0]
                    ],
                    [
                        [0,2,0],
                        [2,2,0],
                        [0,2,0]
                    ]
                ];
                break;
            case 'L':
                piece.rotations = [
                    [
                        [0,0,0],
                        [3,3,3],
                        [3,0,0]
                    ],
                    [
                        [3,3,0],
                        [0,3,0],
                        [0,3,0]
                    ],
                    [
                        [0,0,3],
                        [3,3,3],
                        [0,0,0]
                    ],
                    [
                        [0,3,0],
                        [0,3,0],
                        [0,3,3]
                    ]
                ];
                break;
            case 'S':
                piece.rotations = [
                    [
                        [0,4,4],
                        [4,4,0],
                        [0,0,0]
                    ],
                    [
                        [0,4,0],
                        [0,4,4],
                        [0,0,4]
                    ],
                    [
                        [0,0,0],
                        [0,4,4],
                        [4,4,0]
                    ],
                    [
                        [4,0,0],
                        [4,4,0],
                        [0,4,0]
                    ]
                ];
                break;
            case 'I':
                piece.rotations = [
                    [
                        [0,0,0,0],
                        [5,5,5,5],
                        [0,0,0,0],
                        [0,0,0,0]
                    ],
                    [
                        [0,0,5,0],
                        [0,0,5,0],
                        [0,0,5,0],
                        [0,0,5,0]
                    ],
                    [
                        [0,0,0,0],
                        [0,0,0,0],
                        [5,5,5,5],
                        [0,0,0,0]
                    ],
                    [
                        [0,5,0,0],
                        [0,5,0,0],
                        [0,5,0,0],
                        [0,5,0,0]
                    ]
                ];
                break;
            case 'O':
                piece.rotations = [
                    [
                        [6,6],
                        [6,6]
                    ],
                    [
                        [6,6],
                        [6,6]
                    ],
                    [
                        [6,6],
                        [6,6]
                    ],
                    [
                        [6,6],
                        [6,6]
                    ]
                ];
                break;
            case 'Z':
                piece.rotations = [
                    [
                        [7,7,0],
                        [0,7,7],
                        [0,0,0]
                    ],
                    [
                        [0,0,7],
                        [0,7,7],
                        [0,7,0]
                    ],
                    [
                        [0,0,0],
                        [7,7,0],
                        [0,7,7]
                    ],
                    [
                        [0,7,0],
                        [7,7,0],
                        [7,0,0]
                    ]
                ];
                break;
            default:
                throw new Error('Неизвестный тип фигуры')
        }

        function countY(piece) {
            const blocks = piece.blocks;
            let counter = 0;
            main: for(let i = 0; i < blocks.length; i++) {
                for(let j = 0; j < blocks[i].length; j++) {
                    if(blocks[i][j]) {
                        break main;
                    }
                    counter += 1;
                }
            }
            return -Math.floor(counter / piece.blocks[0].length);
        }
        piece.y = countY(piece);
        piece.x = Math.floor((this.columns - piece.rotations[0].length) / 2);
        return piece;
    }
    createPlayfield() {
        let playfield = [];
        for(let i = 0; i < this.rows; i++) {
            playfield.push(new Array(this.columns).fill(0))
        }
        return playfield;
    }
    clearLines() {
        let lines = [];
        for(let y = this.rows - 1; y >= 0; y--) {
            let numberOfBlocks = 0;
            for(let x = 0; x < this.playfield[y].length; x++) {
                if(this.playfield[y][x]) {
                    numberOfBlocks += 1;
                }
            }
            if(numberOfBlocks === 0) {
                break;
            }else if(numberOfBlocks < this.playfield[y].length) {
                continue;
            } else if(numberOfBlocks === this.playfield[y].length) {
                lines.unshift(y)
            }
        }
        for(let key of lines) {
            this.playfield.splice(key, 1);
            this.playfield.unshift(new Array(this.columns).fill(0))
        }
        this.lines += lines.length;
        return lines.length;
    }
    updateScore(lines) {
        switch (lines) {
            case 1:
                this.score += 40 * (this.level + 1);
                break;
            case 2:
                this.score += 100 * (this.level + 1);
                break;
            case 3:
                this.score += 300 * (this.level + 1);
                break;

            case 4:
                this.score += 1200 * (this.level + 1);
                break;
        }
    }
    resetAll() {
        this.playfield = this.createPlayfield();
        this.activePiece = this.createPiece();
        this.nextPiece = this.createPiece();

        this.score = 0;
        this.lines = 0;
    }
}
