export const random = (mn: number, mx: number, floor = true) => {
    return floor ? Math.floor(Math.random() * (mx - mn) + mn) : Math.random() * (mx - mn) + mn;
};

export const sum = (a, b) => {
    return a + b;
};

export const getTriangleArea = (sideLength: number) => {
    return Math.sqrt(3) / 4 *sideLength;
};
export const getCircleArea = (radius: number) => {
    return Math.PI * Math.pow(radius, 2);
};
export const getPentagramArea = (sideLength: number) => {
    return Math.sqrt(250 + 10 * Math.sqrt(5)) / 4 * Math.pow(sideLength, 2);
};
export const getHexagonArea = (sideLength: number) => {
    return 3 * (Math.sqrt(3) * Math.pow(sideLength, 2)) / 2;
};