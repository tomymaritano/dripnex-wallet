# Contributing to Dripnex

Thank you for helping make **Dripnex** better! This document describes the workflow for submitting changes and the conventions used in the project.

## Pull Request Workflow

1. **Fork** the repository and create a new branch off of `main`.
2. Make your changes and ensure that `npm test` and `npm run lint` run without errors.
3. Commit your work following the commit style described below.
4. Push the branch to your fork and open a Pull Request against `main`.
5. One of the maintainers will review your PR. Please respond to any feedback and update your branch as needed.

## Commit Style

Use [Conventional Commits](https://www.conventionalcommits.org/) for all commit messages. Some common prefixes are:

- `feat`: new feature or improvement
- `fix`: bug fix
- `docs`: documentation only changes
- `chore`: tooling or maintenance changes

A typical commit message looks like:

```
feat: add support for additional networks
```

## Coding Conventions

- Follow the project's ESLint configuration. Run `npm run lint` before committing.
- Keep code formatting consistent. Using an editor with automatic formatting (e.g. Prettier) is recommended.
- Write unit tests for new functionality when possible.

By following these guidelines you help keep the project tidy and easy to maintain. Happy hacking!
