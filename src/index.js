import sillyAdd, { sillyMult } from "./foo";

const wowMath = (x, y) => {
  const sumExpression = sillyAdd(x, y);
  const { left, right, product } = sillyMult({ x, y });

  const multExpression = `${left} * ${right} = ${product}`;

  const allTheMath = `${sumExpression} ... and ${multExpression}`;

  console.log(allTheMath);
};

wowMath(7, 5);

export default wowMath;
