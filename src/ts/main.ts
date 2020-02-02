import * as PIXI from 'pixi.js';
import './../css/style.css'
import {SHAPE_TYPES, POLYGON_PATH, COLORS, EShapeTypes, EEventTypes} from "./models"
import {DrawShape, Shape} from "./shapes";
import Graphics = PIXI.Graphics;

import { random, sum } from './utils'

// APP INIT
const app = new PIXI.Application({
    width: 900,
    height: 600,
    backgroundColor: 0x3C3744,
    antialias: true,
});
const gravityValueWrapper = document.querySelector('.gravity-value');
const gravityValueElem = document.getElementById('gravityValue');
const shapesPerSecWrapper = document.querySelector('.shapes-per-sec');
const shapesPerSecElem = document.getElementById('shapesPerSec');
const numberOfCurrentShapes = document.getElementById('numberOfCurrentShapes');
const occupiedAreaByShapes = document.getElementById('occupiedArea');
let gravityValue = 1;
let shapesPerSecond = 1;

document.getElementById('canvasView').appendChild(app.view);
app.renderer.view.style.boxShadow = '15px 15px 0 #6423c6';

// Create and add shape to view
setInterval(() => handleShapeCreation(), 1000);

function handleShapeCreation () {
    for (let i = 0; i < shapesPerSecond; i++) {
        createShape();
    }
}

function createShape(posX = random(50, 800), posY = -100) {
    const options = {
        type: SHAPE_TYPES[random(0, 5)],
        fillOptions: {
            color: COLORS[random(0, 40)],
            alpha: random(0.7, 1, false),
        },
        lineStyle: {
            width: 2,
            color: COLORS[random(0, 40)],
            alpha: random(0.5, 1, false),
        },
        shapePosition: {
            x: posX,
            y: posY
        },
        polygonPath: [],
        speed: gravityValue,
    };
    options.polygonPath = POLYGON_PATH[options.type];
    const shape = new DrawShape(options);
    shape.interactive = true;
    if (options.type !== EShapeTypes.CIRCLE) {
        shape.y = posY;
        shape.x = posX;
    }
    app.stage.addChild(shape);
}

// Update every shape
const shapeBoundsPadding = 150;
const shapeBounds = new PIXI.Rectangle(-shapeBoundsPadding,
    -shapeBoundsPadding,
    app.screen.width + shapeBoundsPadding * 2,
    app.screen.height + shapeBoundsPadding * 2);

app.ticker.add(() => {
    app.stage.children.forEach((shape: Shape) => {
        if (shape.speed !== gravityValue) {
            shape.speed = gravityValue;
        }
        shape.y += -Math.cos(shape.direction) * shape.speed;

        if (shape.y < shapeBounds.y) {
            shape.y += shapeBounds.height;
        } else if (shape.y > shapeBounds.y + shapeBounds.height) {
            app.stage.removeChild(shape);
        }
    });
    const occupiedArea = Math.floor(app.stage.children.reduce((prev, next: Shape) => sum(prev, next.area), 0));
    occupiedAreaByShapes.innerText = `${occupiedArea}`;
    numberOfCurrentShapes.innerText = `${app.stage.children.length}`;
});

// handle events

shapesPerSecWrapper.addEventListener('click', (event: MouseEvent) => {
    const el = event.target as HTMLElement;
    if (el.dataset.event === EEventTypes.INCREASE_SHAPE) {
        shapesPerSecond++
    }
    if (el.dataset.event === EEventTypes.DECREASE_SHAPE && shapesPerSecond > 0) {
        shapesPerSecond--
    }
    shapesPerSecElem.innerText = `${shapesPerSecond}`;
});

gravityValueWrapper.addEventListener('click', (event: MouseEvent) => {
    const el = event.target as HTMLElement;
    if (el.dataset.event === EEventTypes.INCREASE_GRAVITY) {
        gravityValue++
    }
    if (el.dataset.event === EEventTypes.DECREASE_GRAVITY) {
        gravityValue--
    }
    gravityValueElem.innerText = `${gravityValue}`;
});

const interactionManager = new PIXI.interaction.InteractionManager(app.renderer);
interactionManager.on('pointerdown', (event) => {
    if (event.target instanceof Graphics) {
        app.stage.removeChild(event.target);
        return;
    }
    createShape(event.data.global.x, event.data.global.y);
});
