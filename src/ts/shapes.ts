import * as PIXI from 'pixi.js';
import Graphics = PIXI.Graphics;
import { IShapeOptions, EShapeTypes} from "./models";

export class Shape extends Graphics {
    public speed: number;
    public direction: number;
    public area: number;
    constructor (){
        super();
    }
}

export class DrawShape extends Shape {
    public options: IShapeOptions;
    public height = 102;
    public width = 102;
    constructor(options: IShapeOptions) {
        super();
        this.options = options;
        this.speed = options.speed;
        this._drawShape();
    }

    private _drawShape() {
        this.lineStyle(this.options.lineStyle.width, this.options.lineStyle.color, this.options.lineStyle.alpha);
        this.beginFill(this.options.fillOptions.color, this.options.fillOptions.alpha);
        switch (this.options.type) {
            case EShapeTypes.CIRCLE:
                this.drawCircle(this.options.shapePosition.x, this.options.shapePosition.y, 50);
                this.area = Math.PI * Math.pow(50, 2);
                break;
            case EShapeTypes.TRIANGLE:
                this.drawPolygon(this.options.polygonPath);
                this.area = (Math.sqrt(3) / 4) * this.width;
                break;
            case EShapeTypes.RECT:
                this.drawPolygon(this.options.polygonPath);
                this.area = this.height * this.width;
                break;
            case EShapeTypes.PENTAGON:
                const pentSideLength = 80;
                this.area = (Math.sqrt(250 + 10 * Math.sqrt(5)) / 4 * Math.pow(pentSideLength, 2));
                this.drawPolygon(this.options.polygonPath);
                break;
            case EShapeTypes.HEXAGON:
                const hexSideLength = 75;
                this.area = 3 * (Math.sqrt(3) * Math.pow(hexSideLength, 2)) / 2;
                this.drawPolygon(this.options.polygonPath);
                break;
        }
        this.endFill();
        this.direction = 2;
    }
}
