export const SHAPE_TYPES = [
    'triangle',
    'circle',
    'rect',
    'pentagon',
    'hexagon'
];

export const POLYGON_PATH = {
    pentagon: [50, 0, 100, 40, 80, 100, 20, 100, 0, 40],
    hexagon: [50, 0, 100, 25, 100, 75, 50, 100, 0, 75, 0, 25],
    triangle: [0, 0, 0, 100, 100, 100],
    rect: [0, 0, 100, 0, 100, 100, 0, 100]
};

export const COLORS = [
    0x9b59b6,
    0xfad7a0,
    0xabebc6,
    0x73c6b6,
    0xbb8fce,
    0x9b59b6,
    0xfad7a0,
    0xd98880,
    0x2980b9,
    0xc39bd3,
    0x1e8449,
    0xc39bd3,
    0xf2d7d5,
    0x283747,
    0x9c640c,
    0xD3C0D2,
    0x6DA34D,
    0xC5E99B,
    0x8FBC94,
    0xEC058E,
    0x62BBC1,
    0x38E4AE,
    0x7BD389,
    0x197BBD,
    0x6622CC,
    0xA755C2,
    0xF7DD72,
    0xCE8147,
    0xCDE7BE,
    0x861657,
    0xD56AA0,
    0xA64253,
    0x685369,
    0x406E8E
];

export enum EShapeTypes {
    TRIANGLE = 'triangle',
    CIRCLE = 'circle',
    RECT = 'rect',
    PENTAGON = 'pentagon',
    HEXAGON = 'hexagon',

}

export interface IShapeOptions {
    type: string;
    fillOptions: IFillOptions;
    lineStyle: ILineStyle;
    shapePosition: IShapePosition;
    polygonPath?: number[];
    speed: number;
}
export interface IShapePosition {
    x: number;
    y?: number;
}
export interface IFillOptions {
    color: number;
    alpha?: number;
}
export interface ILineStyle {
    width: number;
    color: number;
    alpha?: number;
}