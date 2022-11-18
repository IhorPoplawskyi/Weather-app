const capitalize = (str: string) => {
    let string: string[] = str.split('')
    string[0] = string[0].toUpperCase();
    return string.join('')
}

export default capitalize;