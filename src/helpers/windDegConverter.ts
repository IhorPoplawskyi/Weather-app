export function degToCompass<T> (num: number): string {
    let val = Math.floor((num / 22.5) + 0.5);
    var arr = ["north", "north-northeast", "northeast", "east-northeast", "east", "east-southeast", "southeast", 
    "south-southeast", "south", "south-southwest", "southwest", "west-southwest", "west", "west-northwest", 
    "northwest", "north-northwest", "north"];
    return arr[(val % 16)];
}