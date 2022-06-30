
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

const followPathBtn = document.querySelector("#followPath")

const CIRCLE_RADIUS = 5;
const CANVAS_WIDTH = document.body.clientWidth;
const CANVAS_HEIGHT = document.body.clientHeight;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT
const G = 2;