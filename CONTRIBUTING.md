# Contributing to Dripnex

Thank you for helping make **Dripnex** better! This document describes the workflow for submitting changes and the conventions used in the project. All commits should follow the Conventional Commits style and every pull request should adhere to the guidelines below.

## Pull Request Workflow

1. **Fork** the repository and create a new branch off of `main`.
2. Make your changes and ensure that `npm test` and `npm run lint` run without errors.
3. Commit your work following the commit style described below.
4. Push the branch to your fork and open a Pull Request against `main`. Use a
   descriptive title and include a short summary of the changes.
5. One of the maintainers will review your PR. Please respond to any feedback and update your branch as needed.
6. Include a concise description of the change and link to any related issues in the PR body.

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

## Pull Request Guidelines

- Use a descriptive title and summary for your PR.
- Reference any related issues by number.
- Keep changes focused; open separate PRs for unrelated work.
- Ensure `npm test` and `npm run lint` pass before requesting review.

## Coding Conventions

- Follow the project's ESLint configuration. Run `npm run lint` before committing.
- Keep code formatting consistent. Using an editor with automatic formatting (e.g. Prettier) is recommended.
- Write unit tests for new functionality when possible.

By following these guidelines you help keep the project tidy and easy to maintain. Happy hacking!
