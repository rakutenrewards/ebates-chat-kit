const sillyAdd = (x, y) => {
  const sum = x + y;
  const expression = `${x} + ${y} = ${sum}`;
  return expression;
};

export const sillyMult = ({ x = 0, y = 0 }) => ({
  left: x,
  right: y,
  product: x * y
});

export default sillyAdd;
