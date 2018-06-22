import { mergeStyles } from "../src/theme";

describe("mergeStyles", () => {
  it("works", () => {
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
    console.log(result);
  });
});
