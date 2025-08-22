# Resource Management Admin

The Site built with ReactJS, Tailwind CSS.

## Stack

### FE

- ReactJS
- axios

### CSS Framework

- Tailwind CSS

### Tools

- eslint
- prettier
- lint-staged

## Installation

```bash
# install node version
Please install at least v20.12.0 version node

# install npm version
Please install at least v10.5.0 version node
```

```bash
# install app's depndencie
$ npm i
$ npm prepare
```

## Scripts

```bash
# dev server with PORT 3000 at http://localhost:3000/
$ npm run dev

# run `lint` to tell you what is wrong code.
$ npm run lint

# run `lint:fix` to automatically fix linting issues.
$ npm run lint:fix

# run `format` to format all files with Prettier.
$ npm run format

# run `format:check` to check if files are formatted correctly.
$ npm run format:check

# run `type-check` to check TypeScript types.
$ npm run type-check
```

## Code Quality

This project uses several tools to maintain code quality:

### ESLint

- Configured with TypeScript support
- React-specific rules enabled
- Strict linting rules for better code quality

### Prettier

- Automatic code formatting
- Consistent code style across the project
- Integrated with ESLint

### Husky + lint-staged

- Pre-commit hooks to ensure code quality
- Automatically runs linting and formatting on staged files
- Prevents commits with linting errors

### TypeScript

- Strict type checking enabled
- No unused variables or parameters allowed
- Comprehensive type safety
