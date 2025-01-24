# Advanced Todo App

This is an advanced Todo application built with modern web technologies. The application allows users to manage their tasks efficiently with features like task prioritization, due dates, and weather conditions for outdoor tasks. The app also supports dark mode and user authentication.

## Features

- User Authentication
- Task Management (Add, Edit, Delete, Mark as Important)
- Task Prioritization (Low, Medium, High)
- Due Dates for Tasks
- Weather Information for Outdoor Tasks
- Dark Mode Support
- Responsive Design

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Redux Toolkit**: A toolset for efficient Redux development.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Vite**: A fast build tool and development server.
- **Lucide React**: A collection of icons for React.
- **Axios**: A promise-based HTTP client for the browser and Node.js.
- **ESLint**: A tool for identifying and fixing problems in JavaScript code.
- **PostCSS**: A tool for transforming CSS with JavaScript plugins.

## Project Structure
```sh
components/
    Auth/
        LoginForm.tsx
    Layout/
        Sidebar.tsx
    Tasks/
        TaskDetails.tsx
        TaskInput.tsx
        TaskList.tsx
index.css
main.tsx
store/
    index.ts
    slices/
        authSlice.ts
        tasksSlice.ts
        themeSlice.ts
types/
    index.ts
vite-env.d.ts
```


## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd QuadB_T
   ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Start the development server:
    ```sh
    npm run dev
    ```

4. Open your browser and navigate to http://localhost:3000

### Building for Production
To build the project for production, run:

    
    npm run build
    

### License
This project is licensed under the MIT License.