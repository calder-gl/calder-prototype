# calder-gl
:art: Written by &mdash; Paul Bardea, Abhishek Madan, Andrew McBurney, Dave Pagurek Van Mossel

[![CircleCI](https://circleci.com/gh/calder-gl/calder/tree/master.svg?style=svg)](https://circleci.com/gh/calder-gl/calder/tree/master)
___

### Development Setup
You should have `gulp-cli` installed on your system already: `yarn global add gulp-cli`.

```bash
# Install dependencies
yarn install

# Build code
yarn build
```

### Testing
Note: test files should have the suffix: `.spec.ts`
```bash
# Run full test suite
yarn test
```

Running the in-browser example:
```bash
yarn browser
open sample.html
```
