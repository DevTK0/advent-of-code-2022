import { input } from "../inputs/day9";

// const input = `
// R 4
// U 4
// L 3
// D 1
// R 4
// D 1
// L 5
// R 2
// `;

const visited: Map<number, Map<number, number>> = new Map();
let head_x = 0;
let head_y = 0;
let tail_x = 0;
let tail_y = 0;

input.split("\n").forEach((line) => {
    if (line.length === 0) return;

    const [direction, distance] = line.trim().split(" ");

    for (let i = 0; i < parseInt(distance); i++) {
        [head_x, head_y, tail_x, tail_y] = moveByOne(
            head_x,
            head_y,
            tail_x,
            tail_y,
            direction
        );
        updateVisited(visited, tail_x, tail_y);
    }
});

function moveByOne(
    head_x: number,
    head_y: number,
    tail_x: number,
    tail_y: number,
    direction: string
) {
    switch (direction) {
        case "R": // right
            head_x++;
            break;
        case "U": // up
            head_y++;
            break;
        case "L": // left
            head_x--;
            break;
        case "D": // down
            head_y--;
            break;
    }

    const diff_x = head_x - tail_x;
    const diff_y = head_y - tail_y;
    if (Math.abs(diff_x) > 1 || Math.abs(diff_y) > 1) {
        tail_x = tail_x + Math.sign(diff_x);
        tail_y = tail_y + Math.sign(diff_y);
    }

    return [head_x, head_y, tail_x, tail_y];
}

function updateVisited(
    visited: Map<number, Map<number, number>>,
    x: number,
    y: number
) {
    const count = visited.get(x)?.get(y) || 0;
    const map = visited.get(x) || new Map();
    map.set(y, count + 1);
    visited.set(x, map);
}

let count = 0;

for (const [x, maps] of visited) {
    for (const [y, value] of maps) {
        if (value >= 1) {
            count++;
        }
    }
}

console.log(count);
