import { input } from "../inputs/day10";

// const input = `
// addx 15
// addx -11
// addx 6
// addx -3
// addx 5
// addx -1
// addx -8
// addx 13
// addx 4
// noop
// addx -1
// addx 5
// addx -1
// addx 5
// addx -1
// addx 5
// addx -1
// addx 5
// addx -1
// addx -35
// addx 1
// addx 24
// addx -19
// addx 1
// addx 16
// addx -11
// noop
// noop
// addx 21
// addx -15
// noop
// noop
// addx -3
// addx 9
// addx 1
// addx -3
// addx 8
// addx 1
// addx 5
// noop
// noop
// noop
// noop
// noop
// addx -36
// noop
// addx 1
// addx 7
// noop
// noop
// noop
// addx 2
// addx 6
// noop
// noop
// noop
// noop
// noop
// addx 1
// noop
// noop
// addx 7
// addx 1
// noop
// addx -13
// addx 13
// addx 7
// noop
// addx 1
// addx -33
// noop
// noop
// noop
// addx 2
// noop
// noop
// noop
// addx 8
// noop
// addx -1
// addx 2
// addx 1
// noop
// addx 17
// addx -9
// addx 1
// addx 1
// addx -3
// addx 11
// noop
// noop
// addx 1
// noop
// addx 1
// noop
// noop
// addx -13
// addx -19
// addx 1
// addx 3
// addx 26
// addx -30
// addx 12
// addx -1
// addx 3
// addx 1
// noop
// noop
// noop
// addx -9
// addx 18
// addx 1
// addx 2
// noop
// noop
// addx 9
// noop
// noop
// noop
// addx -1
// addx 2
// addx -37
// addx 1
// addx 3
// noop
// addx 15
// addx -21
// addx 22
// addx -6
// addx 1
// noop
// addx 2
// addx 1
// noop
// addx -10
// noop
// noop
// addx 20
// addx 1
// addx 2
// addx 2
// addx -6
// addx -11
// noop
// noop
// noop
// `;

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
    cycle = 1;
    register = 1;

    let signal_strength = 0;
    while (queue.length != 0) {
        [cycle, register] = execute(queue, cycle, register);
        signal(cycle);
    }
    total.push([...canvas]);

    return signal_strength;
}

const canvas: string[] = [];
const total: string[][] = [];
let result = "";
console.log(processer(queue));

for (let i = 0; i < total.length; i++) {
    console.log(total[i].length);
    result += total[i].join(",") + "\n";
}
console.log(result);

function signal(cycle) {
    if ((cycle - 1) % 40 === 0) {
        total.push([...canvas]);
        console.log(canvas);
        canvas.splice(0, canvas.length);
    }
}

function execute(queue, cycle, register_val) {
    if (queue.length === 0) return [cycle, register_val];

    const { cycle: finish_time, value } = queue[0];
    const position = (cycle - 1) % 40;

    if (position >= 0) {
        if (position > register_val + 1 || position < register_val - 1) {
            canvas[position] = ".";
        } else {
            canvas[position] = "#";
        }
    }
    console.log(canvas[position], register_val, cycle, position);

    if (finish_time === cycle) {
        queue.shift();
        register_val = register_val + value;
    }

    return [++cycle, register_val];
}
