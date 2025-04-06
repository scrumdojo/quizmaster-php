# Definition of Done

## Source Quality

- Changes are committed to the master branch of the mono-repo.
- The code and tests follow [code style](./code-style.md)
- The code, tests, and documentation are free of lint and formatting errors.
- All code, tests, and documentation changes are reviewed by at least one other developer.
  - Code from pair/mob programming is considered reviewed.
- English is used for all code, tests, and documentation.

## Modular Integrity

- Compiler and runtime warnings are treated as errors.
- All code is fully unit tested.
- Code quality is maintained through dealing with all the code smells, by:
  - Eliminating duplicate code.
  - Reducing code elements to the minimum required for intended functionality.
  - Using domain language to clearly convey intent.
  - Removing all unused code, regardless of test coverage.
  - Adding comments for clarity where needed.

## System Integration

- No known defects; all bugs fixed with the highest priority.
- Automated end-to-end tested with all internal services integrated.
- Exploratory testing is performed to ensure the system is usable and reliable.
- All external dependencies are current and verified against the latest stable versions.
- The CI system successfully processes all changes.
- CI system builds are completed in 10 minutes or less.
