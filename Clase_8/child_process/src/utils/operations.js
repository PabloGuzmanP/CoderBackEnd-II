export const calculateComplexOperation = () => {
    let result = 0;

    for (let i = 0; i < 2e9; i++) {
        const x = i * Math.sqrt(i);
        result += x + i;
    }

    return result;
}