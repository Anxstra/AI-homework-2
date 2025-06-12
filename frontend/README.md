# Frontend User Directory Application

This is a React and TypeScript application that provides a user directory interface. It communicates with a backend API to fetch and manage user data.

## Features

- User authentication (Login)
- A responsive table displaying a list of users
- A modal view for detailed user information, including a map link
- Ability to delete users from the list

## Prerequisites

- Node.js and npm (or yarn) installed
- A running instance of the backend API (available at `http://localhost:8080`)

## Installation

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```
    or
    ```bash
    yarn install
    ```

## Running the Application

1.  **Start the development server:**
    ```bash
    npm start
    ```
    or
    ```bash
    yarn start
    ```

2.  Open your browser and navigate to `http://localhost:3000`.

3.  You will be prompted to log in. Use the credentials of a user you have created through the backend API.

## Project Structure

-   `src/components`: Contains the React components (`UserTable`, `UserModal`, `Login`).
-   `src/services`: Contains the `api.ts` file for all backend communication.
-   `src/types`: Contains the `types.ts` file for TypeScript type definitions.
