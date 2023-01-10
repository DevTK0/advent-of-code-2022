// import { input } from "../inputs/day10";

const input = `
addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop
`;

let cycle = 0;
let register = 1;

const queue: { cycle: number; value: number }[] = [];

input.split("\n").forEach((line) => {
    if (line === "") return;
    const [command, value] = line.split(" ");

    if (command === "addx") {
        cycle += 2;
        queue.push({ cycle: cycle, value: parseInt(value, 10) });
    } else if (command === "noop") {
        cycle++;
    }
});

console.log(queue);

function processer(queue) {
    cycle = 0;
    register = 1;

    let signal_strength = 0;
    while (queue.length != 0) {
        [cycle, register] = execute(queue, cycle, register);
        signal(cycle);
    }

    return signal_strength;
}

const canvas: string[] = [];
const total: string[][] = [];
console.log(processer(queue));
console.log(total);

function signal(cycle) {
    if ((cycle - 20) % 40 === 0) {
        total.push([...canvas]);
        console.log(canvas);
        canvas.splice(0, canvas.length);
    }
}

function execute(queue, current, register_val) {
    if (queue.length === 0) return [current, register_val];

    const { cycle, value } = queue[0];
    const index = current % 40;

    if (index > 0) {
        if (index > register_val + 1 || index < register_val - 1) {
            canvas[index] = ".";
        } else {
            canvas[index] = "#";
        }
    }
    console.log(index, canvas[index], register_val, current);

    if (cycle === current) {
        queue.shift();
        register_val = register_val + value;
    }

    return [++current, register_val];
}

const result = [
    [
        undefined,
        "#",
        "#",
        ".",
        ".",
        "#",
        "#",
        ".",
        ".",
        "#",
        ".",
        ".",
        "#",
        "#",
        ".",
        ".",
        ".",
        "#",
        "#",
        ".",
    ],
    [
        undefined,
        "#",
        "#",
        "#",
        ".",
        ".",
        "#",
        "#",
        "#",
        "#",
        ".",
        ".",
        "#",
        "#",
        "#",
        ".",
        ".",
        ".",
        "#",
        "#",
        "#",
        "#",
        ".",
        ".",
        "#",
        "#",
        ".",
        ".",
        "#",
        "#",
        ".",
        ".",
        "#",
        "#",
        ".",
        ".",
        "#",
        "#",
        ".",
        ".",
    ],
    [
        undefined,
        "#",
        "#",
        ".",
        ".",
        ".",
        ".",
        ".",
        "#",
        "#",
        "#",
        "#",
        "#",
        ".",
        ".",
        ".",
        "#",
        "#",
        "#",
        ".",
        "#",
        ".",
        ".",
        ".",
        "#",
        "#",
        "#",
        "#",
        ".",
        ".",
        "#",
        "#",
        "#",
        "#",
        ".",
        ".",
        "#",
        "#",
        "#",
        ".",
    ],
    [
        undefined,
        "#",
        "#",
        "#",
        "#",
        ".",
        ".",
        ".",
        ".",
        ".",
        "#",
        "#",
        ".",
        "#",
        ".",
        ".",
        ".",
        ".",
        ".",
        ".",
        ".",
        ".",
        ".",
        ".",
        "#",
        "#",
        "#",
        "#",
        ".",
        ".",
        ".",
        ".",
        ".",
        "#",
        "#",
        ".",
        ".",
        ".",
        ".",
        ".",
    ],
    [
        undefined,
        "#",
        "#",
        "#",
        ".",
        "#",
        "#",
        ".",
        ".",
        ".",
        ".",
        ".",
        "#",
        "#",
        ".",
        "#",
        "#",
        "#",
        ".",
        ".",
        "#",
        "#",
        "#",
        "#",
        "#",
        ".",
        ".",
        ".",
        ".",
        ".",
        "#",
        "#",
        "#",
        "#",
        ".",
        ".",
        ".",
        ".",
        ".",
        ".",
    ],
    [
        undefined,
        "#",
        "#",
        "#",
        ".",
        "#",
        "#",
        ".",
        ".",
        ".",
        ".",
        ".",
        ".",
        ".",
        "#",
        "#",
        "#",
        "#",
        ".",
        "#",
        ".",
        ".",
        ".",
        ".",
        "#",
        "#",
        "#",
        "#",
        "#",
        "#",
        ".",
        ".",
        ".",
        ".",
        ".",
        ".",
        "#",
        "#",
        ".",
        "#",
    ],
];
