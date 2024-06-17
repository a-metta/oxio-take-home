# Alessandro Metta's Oxio Take Home Assessment

## Summary

This project is a React implementation of Oxio's Take Home Assessment as a Single Page Application with client-side routing. It loads sample data from <https://jsonplaceholder.typicode.com/users> and allows users to view this data in two different ways:

- as a table
- as a map with geographical coordinates and markers

It also allows users to add more data through a form element inside a Modal dialog.

The following tools and libraries have been used:

- Vite for build tool
  - custom Typescript setup with paths and types
  - added extra eslint plugins for accessibility checking (eslint/a11y) and prettier
- Vitest as test runner
- React Testing Library for testing components
- Google Maps React for maps integration
- React Router for client side routing
- TailwindCSS for easy html based CSS styling (setup with both PostCSS and Autoprefixer)
- react-axe for accessibility testing
- react-icons for icons components

### Setup

Install dependencies by running `npm install` at the root of the folder.

To start the project, run the command `npm run dev`.

To run the test suite, user `npm test`.

**Note**: the project uses `eslint` and `prettier` to format and lint the code. If you don't have code editor integration with either, you'd need to manually run `npm run lint`.
In a production environment, a git hook should be set up to perform these operations on local commit to ensure that we mantain consistent linting throughout our codebase.

### Considerations

State management is currently managed by the App component and propagated through React Router's Outlet Context. As the app grows in complexity, we should discuss if it would make sense to move state management to a library such as Redux or MobX. Depending on our needs, we may also get some mileage by just using the built in React Context api with reducers.

The UI is simple and it doesn't use any externaly UI framework. The only exception is the Map view which leverages the Google Maps API.
The API token is provided as a sample here in a .env environment. In a production application, we could have the backend act as a wrapper for the Map functionality, and save the API key on the server, or we can use domain access restriction on the API key in google cloud.

I paid special attention to ensure that all components and pages are accessible, by both using the a11y eslint plugin in strict mode, and running react-axe in development mode to catch any potential severe usability issues. Additionally, color blind friendly pallettes have been used. **Note**: the map is currently rendering with the default google maps view. Custom maps could be used to improve accessibility, but I considered this to be out of scope for the purpose of this assessment.

The table is responsive and allows users to click on each column header to sort the column data in ascending and descending. By default, no sorting is applied to any columns. Icons are used to provide feedback on the state of sorting for each of the columns in the table. Custom CSS has been written to ensure that the table is responsive on smaller screens, including sorting. Text in the table cells uses the CSS rule `break-word` to fit long text.

Due to limited amount of data and time, I have decided to leave table pagination for future improvements.

The sorting functionality has been extracted as a react hook to ensure reusability and decoupling from components.

Additional unit tests could be written for the views, but due to time constraints I decided to focus on the components and hooks containing core functionality.
