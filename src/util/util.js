import R from "ramda";

export const calculateModifier = R.pipe(
    R.subtract(R.__, 10),
    R.divide(R.__, 2),
    Math.floor
);
