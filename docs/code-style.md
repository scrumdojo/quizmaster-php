# QuizMaster Code Style Guidelines

## Frontend
- TypeScript strict mode
- Biome with default rules, except:
    - Single quotes in TypeScrips, double quotes in JSX/TSX
    - No semicolons
- File names kebab-case

## Backend
TODO

## BDD Specifications
- All features are covered by user-centric Specifications by Example
    - Features are described in Gherkin and stored in `frontend/specs`
    - There is no funtionality not covered by a scenario
    - `*.feature` file names in PascalCase
- Cucumber.js and Playwright are used to run the specs
    - Page Object pattern is used to organize test code
        - One Page Object per logical page, stored in `frontend/specs/pages`
        - All locators and user actions are implemented in Page Objects
    - Steps files are stored in `frontend/specs/steps`
        - Steps share data using global `QuizmasterWorld` object in `frontend/specs/world/world.ts`
        - No Playwrigt API in steps files. All DOM manipulation is via Page Objects
    - Page Objects and Steps file names in kebab-case
