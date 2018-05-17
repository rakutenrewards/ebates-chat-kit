import sillyAdd, { sillyMult } from "../src/foo";

it("should add something", () => {
  expect(sillyAdd(2, 2)).toBe("2 + 2 = 4");
});

it("should should multiply something", () => {
  expect(sillyMult({ x: 2, y: 2 })).toMatchObject({
    left: 2,
    right: 2,
    product: 4
  });
});
