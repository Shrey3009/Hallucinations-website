# Creative Innovation Study - Research Platform

This repository contains the frontend code for a web-based research platform designed to study the impact of AI tools on human creativity. The application guides participants through a series of tasks, including creative ideation with and without AI assistance, and collects data through pre- and post-task surveys.

## Table of Contents

- [Project Purpose](#project-purpose)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Running the Application](#running-the-application)
- [Key Dependencies](#key-dependencies)

## Project Purpose

The primary goal of this research platform is to investigate how interacting with AI assistants influences human creativity. The study measures creative output in various conditions, with different levels of AI "hallucination" or creativity. The platform is structured to guide users through a consent form, a pre-survey, a series of creative tasks, and a final post-survey.

## Project Structure

The project is a standard React application built with Vite. The source code is organized as follows:

```
/
├── public/              # Static assets
├── src/
│   ├── assets/          # Images and other static assets
│   ├── Components/      # React components for different parts of the study
│   │   ├── AUT/
│   │   ├── AttentionTest/
│   │   ├── ConsentForm/
│   │   ├── Instructions/
│   │   ├── LoadingPage/
│   │   ├── PostSurvey/
│   │   ├── PreSurvey/
│   │   ├── Task2Page/
│   │   ├── ... (and other task-related components)
│   ├── styles/          # Global styles
│   ├── App.jsx          # Main application component with routing
│   ├── dataContext.jsx  # React context for shared data
│   ├── main.jsx         # Entry point of the application
│   └── surveyIDContext.jsx # React context for the survey ID
├── .gitignore
├── eslint.config.js     # ESLint configuration
├── index.html           # Main HTML file
├── package.json         # Project metadata and dependencies
├── README.md            # This file
└── vite.config.js       # Vite configuration
```

## Getting Started

Follow these instructions to get a local copy of the project up and running.

### Prerequisites

You need to have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) (which comes with Node.js) installed on your machine.

### Installation

1.  **Clone the repository:**
    ```sh
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add the following environment variable. This is required to connect to the backend API.
    ```
    VITE_NODE_API=http://localhost:3001
    ```
    Replace the URL with the actual URL of your backend server if it's different.

## Running the Application

To run the application in development mode, use the following command:

```sh
npm run dev
```

This will start the Vite development server, and you can view the application by navigating to `http://localhost:5173` (the port may vary).

### Other Scripts

-   **Build for production:**
    ```sh
    npm run build
    ```
    This command bundles the application into the `dist/` directory for deployment.

-   **Lint the code:**
    ```sh
    npm run lint
    ```
    This command runs ESLint to check for code quality and style issues.

-   **Preview the production build:**
    ```sh
    npm run preview
    ```
    This command starts a local server to preview the production build from the `dist/` directory.

## Key Dependencies

-   [React](https://reactjs.org/): A JavaScript library for building user interfaces.
-   [React Router](https://reactrouter.com/): For handling routing within the application.
-   [Vite](https://vitejs.dev/): A fast frontend build tool.
-   [@chatscope/chat-ui-kit-react](https://chatscope.io/): For the chat interface components.
-   [ESLint](https://eslint.org/): For code linting and maintaining code quality.
