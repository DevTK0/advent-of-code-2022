import { input } from "../inputs/day9";

// const input = `
// R 5
// U 8
// L 8
// D 3
// R 17
// D 10
// L 25
// U 20
// `;

const visited: Map<number, Map<number, number>> = new Map();
const rope = new Array(10).fill({}).map((u) => ({ x: 0, y: 0 }));

input.split("\n").forEach((line) => {
    if (line.length === 0) return;

    const [direction, distance] = line.trim().split(" ");

    for (let i = 0; i < parseInt(distance); i++) {
        moveHead(rope, direction);
        for (let j = 1; j < rope.length; j++) {
            moveTail(j, rope);
        }
        console.log(rope);
        updateVisited(visited, rope);
    }
});

function moveTail(knot: number, rope) {
    const diff_x = rope[knot - 1].x - rope[knot].x;
    const diff_y = rope[knot - 1].y - rope[knot].y;
    if (Math.abs(diff_x) > 1 || Math.abs(diff_y) > 1) {
        rope[knot].x = rope[knot].x + Math.sign(diff_x);
        rope[knot].y = rope[knot].y + Math.sign(diff_y);
    }
}

function moveHead(rope, direction: string) {
    switch (direction) {
        case "R": // right
            rope[0].x++;
            break;
        case "U": // up
            rope[0].y++;
            break;
        case "L": // left
            rope[0].x--;
            break;
        case "D": // down
            rope[0].y--;
            break;
    }
}

function updateVisited(visited: Map<number, Map<number, number>>, rope) {
    const { x, y } = rope[rope.length - 1];
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
