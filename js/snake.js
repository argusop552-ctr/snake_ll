let snake = [
    {
        x: 180,
        y: 200
    }
];

let trail = [];

let snakeLength = 1;

let direction = "";

document.addEventListener("keydown", e => {

    if (
        e.key === "ArrowLeft" &&
        direction !== "RIGHT"
    ) {
        direction = "LEFT";
    }

    if (
        e.key === "ArrowRight" &&
        direction !== "LEFT"
    ) {
        direction = "RIGHT";
    }

    if (
        e.key === "ArrowUp" &&
        direction !== "DOWN"
    ) {
        direction = "UP";
    }

    if (
        e.key === "ArrowDown" &&
        direction !== "UP"
    ) {
        direction = "DOWN";
    }

});