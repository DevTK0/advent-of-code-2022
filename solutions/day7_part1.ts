import { input } from "../inputs/day7";

// const input = `
// $ cd /
// $ ls
// dir a
// 14848514 b.txt
// 8504156 c.dat
// dir d
// $ cd a
// $ ls
// dir e
// 29116 f
// 2557 g
// 62596 h.lst
// $ cd e
// $ ls
// 584 i
// $ cd ..
// $ cd ..
// $ cd d
// $ ls
// 4060174 j
// 8033020 d.log
// 5626152 d.ext
// 7214296 k
// `;
const currentDir: string[] = ["/"];

const directories = new Map();
directories.set("/", 0);

input.split("\n").forEach((line) => {
    if (line.startsWith("$")) {
        // commands
        if (line.includes("cd")) {
            const [_, __, dir] = line.split(" ");

            switch (dir) {
                case "..":
                    currentDir.pop();
                    break;
                case "/":
                    currentDir.splice(0, currentDir.length - 1);
                    break;
                default:
                    currentDir.push(dir);
                    directories.set(currentDir.toString(), 0);
                    break;
            }
        }
    } else {
        // output
        const [first, _] = line.split(" ");

        if (first.match(/^\d+$/)) {
            // file
            for (let i = 0; i < currentDir.length; i++) {
                const dir = currentDir.slice(0, i + 1).toString();
                directories.set(dir, directories.get(dir) + parseInt(first));
            }
        }
    }
});

let sum = 0;
directories.forEach((size, dir) => {
    if (size <= 100000) {
        console.log(dir);
        sum += size;
    }
});

console.log(directories);

console.log(sum);
