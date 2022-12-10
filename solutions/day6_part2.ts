import { input } from "../inputs/day6";

// const input = `nppdvjthqldpwncqszvftbrmjlhg`;

const map = new Map();

function run() {
    for (let fast = 0, slow = 0; fast < input.length; fast++) {
        if (fast >= 14) {
            if (map.size === 14) {
                return fast;
            } else {
                const slow_ch = input[slow];
                const slow_count = map.get(slow_ch) as number;
                if (slow_count === 1) {
                    map.delete(slow_ch);
                } else {
                    map.set(slow_ch, slow_count - 1);
                }
                slow++;
            }
        }
        const fast_ch = input[fast];
        const count = map.get(fast_ch) || 0;
        map.set(fast_ch, count + 1);
    }

    return 0;
}

console.log(run());
