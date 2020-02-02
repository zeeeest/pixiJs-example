export const random = (mn: number, mx: number, floor = true) => {
    return floor ? Math.floor(Math.random() * (mx - mn) + mn) : Math.random() * (mx - mn) + mn;
};

export const sum = (a, b) => {
    return a + b;
};