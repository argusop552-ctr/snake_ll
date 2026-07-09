let snake = [
    {
        x: 180,
        y: 200
    }
];

let trail = [];

let snakeLength = 1;

let direction = "";

function setDirection(newDirection) {

    const opposite = {
        LEFT: "RIGHT",
        RIGHT: "LEFT",
        UP: "DOWN",
        DOWN: "UP"
    };

    // cegah belok 180 derajat langsung ke arah berlawanan
    if (newDirection !== opposite[direction]) {
        direction = newDirection;
    }
}

document.addEventListener("keydown", e => {

    if (e.key === "ArrowLeft") {
        setDirection("LEFT");
    }

    if (e.key === "ArrowRight") {
        setDirection("RIGHT");
    }

    if (e.key === "ArrowUp") {
        setDirection("UP");
    }

    if (e.key === "ArrowDown") {
        setDirection("DOWN");
    }

});