import { parseCompleteStyles } from "../src/theme";

describe("parseCompleteStyles", () => {
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

    const result = parseCompleteStyles(props, 'Message')
    console.log(result);
  });
});
