import * as PIXI from "pixi.js";
import Graphics = PIXI.Graphics;
import {IShapeOptions, EShapeTypes} from "./models";
import {getCircleArea, getHexagonArea, getPentagramArea, getTriangleArea} from "./utils";

export class Shape extends Graphics {
    public speed: number;
    public area: number;
    public direction = 2;

    constructor() {
        super();
    }
}

export class DrawShape extends Shape {
    public options: IShapeOptions;
    public height = 102;
    public width = 102;
    public circleRadius = 50;
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
                this.drawCircle(this.options.shapePosition.x, this.options.shapePosition.y, this.circleRadius);
                this.area = getCircleArea(this.circleRadius);
                break;
            case EShapeTypes.TRIANGLE:
                this.drawPolygon(this.options.polygonPath);
                this.area = getTriangleArea(this.width);
                break;
            case EShapeTypes.RECT:
                this.drawPolygon(this.options.polygonPath);
                this.area = this.height * this.width;
                break;
            case EShapeTypes.PENTAGON:
                const pentagramSideLength = 80;
                this.area = getPentagramArea(pentagramSideLength);
                this.drawPolygon(this.options.polygonPath);
                break;
            case EShapeTypes.HEXAGON:
                const hexagonSideLength = 75;
                this.area = getHexagonArea(hexagonSideLength);
                this.drawPolygon(this.options.polygonPath);
                break;
        }
        this.endFill();
    }
}
