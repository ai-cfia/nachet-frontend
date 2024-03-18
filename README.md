# Getting Started with Create React App

This project was bootstrapped with
[Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open 127.0.0.1:3000 or localhost:3000 to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running
tests](https://facebook.github.io/create-react-app/docs/running-tests) for more
information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the
best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about
[deployment](https://facebook.github.io/create-react-app/docs/deployment) for
more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can
`eject` at any time. This command will remove the single build dependency from
your project.

Instead, it will copy all the configuration files and the transitive
dependencies (webpack, Babel, ESLint, etc) right into your project so you have
full control over them. All of the commands except `eject` will still work, but
they will point to the copied scripts so you can tweak them. At this point
you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for
small and middle deployments, and you shouldn’t feel obligated to use this
feature. However we understand that this tool wouldn’t be useful if you
couldn’t customize it when you are ready for it.

## Deployment Environment Configuration Management

For managing and configuring different deployment environments (development,
staging, production), we follow a structured approach to ensure consistency and
reliability across all stages of deployment. Detailed guidelines and practices
can be found in our [Deployment Environment Configuration Management

documentation](https://github.com/ai-cfia/dev-rel-docs/blob/103-documentation-request-environment-configuration-guidelines/TypeScript-AppVersion/DEPLOYMENT_ENV_CONFIG_MANAGEMENT.md).

This documentation covers:

- Overview and purpose of different environment files (`environment.ts`,
`environment.staging.ts`, `environment.prod.ts`).
- The process for selecting and applying the correct environment configuration
during the build and deployment.
- Best practices for maintaining clear, consistent, and secure configuration
management across all frontend components.

Refer to this documentation to understand how to effectively manage and utilize
environment configurations in your project.

## Learn More

You can learn more in the [Create React App

documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Environment Variable Setup

To run the application correctly, certain environment variables need to be set.
These variables control various aspects of how the application behaves in
different environments (development, staging, production).

### Required Variables

1. `VITE_BACKEND_URL`: URL of the backend server. This is used to make API
calls from the frontend.
2. `VITE_APP_MODE`: Determines the mode in which the application runs. Set to
`"test"` for using test data, any other value will use real data from the
backend.

### Setting Up Environment Variables

You can set these variables in a `.env` file in the root of your project.
Here's an example of what your `.env` file might look like:

```env
VITE_BACKEND_URL=
VITE_APP_MODE=
```
Remember to replace the values with the appropriate URLs and modes for your
specific environment. Also, ensure that you do not commit sensitive information
like production URLs or credentials in the `.env` file to your version control
system.

### Accessing Environment Variables in the Application

In your React application, you can access these variables using `import.meta.env`.
For example:

- `import.meta.env.VITE_BACKEND_URL` to get the backend URL.
- `import.meta.env.REACT_APP_MODE` to check the current mode of the application.

Note: After changing the values in your `.env` file, you will need to restart
your development server for the changes to take effect.
