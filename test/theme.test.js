import { mergeStyles } from "../src/theme";

describe("mergeStyles", () => {
  it("merges a custom theme with the base/default theme", () => {
    const props = {
      theme: {
        Message: {
          color: 'red',

          Bar: {
            color: 'blue'
          }
        }
      }
    };

    const result = mergeStyles(props, 'Message');

    expect(result).toMatchObject({
      theme: {
        Message: {
          color: 'red',
          Bar: {
            color: 'blue'
          }
        }
      }
    });
  });
});
