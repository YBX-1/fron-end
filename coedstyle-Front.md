

- **File and Code Organization**:
    - Each component should be contained within a separate `.vue` file, including `<script>`, `template`, and `<style>` sections.
    - Use the `scoped` attribute to limit the scope of CSS styles.

- **Naming Conventions**:
    - Component names: Use PascalCase, e.g., `ContactList.vue`.
    - Data properties and methods: Use camelCase, e.g., `dialogFormVisible`.
    - Constants: Use all uppercase letters with underscores, e.g., `FORM_LABEL_WIDTH`.

- **Code Formatting**:
    - Use 4 spaces for indentation.
    - Limit each line of code to no more than 120 characters.
    - Always put a space before opening braces, e.g., `if (condition) {`.
    - Add spaces between keys and values in object literals, e.g., `{ key: value }`.

- **Comments and Documentation**:
    - Add descriptive comments at the top of each component, explaining its purpose and functionality.
    - For complex logic or non-obvious code segments, add comments to explain their purpose.


- **Variables and Functions**:
    - Use `const` to declare all local variables unless reassignment is needed.
    - Use `reactive` and `ref` to declare reactive data.
    - Avoid using global variables.

- **Asynchronous Operations**:
    - Use `async/await` for handling asynchronous operations.
    - Catch and handle all possible exceptions.

- **Template Strings**:
    - Use template strings when building URLs or dynamic strings.



- **Templates**:
    - Use `v-model` for creating two-way data bindings.
    - Use `v-if`, `v-else-if`, `v-else` for conditional rendering.
    - Use `v-for` for list rendering.

- **Component Communication**:
    - Use `props` and `emit` for parent-child component communication.
    - Use `provide` and `inject` for cross-component communication.

- **Reactive Data**:
    - Use `reactive` to create reactive objects.
    - Use `ref` to create reactive primitive data.



- **Selectors**:
    - Use class selectors to apply styles, avoiding ID selectors and tag selectors.
    - Use the BEM (Block Element Modifier) naming method for class names.

- **Style Organization**:
    - Place component styles within the `<style>` section of the component file.
    - Use the `scoped` attribute to limit the scope of styles.

## 5. Error Handling

- **API Calls**:
    - Include error handling logic in API requests.
    - Check the response status for each API request and handle errors accordingly.

## 6. Performance Optimization

- **Avoid Unnecessary Rendering**:
    - Update reactive data only when necessary to avoid unnecessary component re-rendering.

- **Code Splitting**:
    - For large components, consider using asynchronous components and code splitting to improve loading performance.

## 7. Security

- **Input Validation**:
    - Validate all user input to prevent XSS attacks.
    - Be extra cautious when using Vue's `v-html` directive.

Please adhere to the above guidelines to maintain consistency and maintainability of the code. These rules are based on best practices and common coding standards but can be adjusted according to the specific needs of the project.