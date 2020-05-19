import * as R from "ramda";

export const calculateModifier = R.pipe(
  R.subtract(R.__, 10),
  R.divide(R.__, 2),
  Math.floor
);

export const addIfAbsent = R.uncurryN(2, el =>
  R.unless(R.includes(el), R.append(el))
);
