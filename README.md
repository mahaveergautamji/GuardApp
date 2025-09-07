# TransitGuard

This is a Next.js application built with Firebase Studio, designed to enhance safety and security for public transit users.

## Features

- **Dashboard**: Get a real-time overview of transit safety.
- **Incident Reporting**: Report safety incidents to help the community.
- **AI Risk Assessment**: Analyze transit data to identify high-risk areas.
- **Safe Route Planner**: Plan your journey using the safest routes.

## Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v20 or later)
- [npm](https://www.npmjs.com/) (or your preferred package manager)

### Installation

1.  **Clone the repository** (if you haven't already):
    ```bash
    git clone <your-repository-url>
    cd <repository-folder>
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

### Environment Variables

The AI features in this application are powered by the Gemini API. To use them, you'll need an API key.

1.  Create a `.env` file in the root of the project:
    ```bash
    touch .env
    ```

2.  Add your Gemini API key to the `.env` file:
    ```
    GEMINI_API_KEY=YOUR_API_KEY_HERE
    ```
    You can obtain a free API key from [Google AI Studio](https://aistudio.google.com/app/apikey).

### Running the Application

You need to run two processes in separate terminals for the full application to work.

1.  **Start the Next.js frontend**:
    This will run the main web application.
    ```bash
    npm run dev
    ```
    The app will be available at [http://localhost:9002](http://localhost:9002).

2.  **Start the Genkit AI service**:
    This runs the backend AI flows that power features like risk assessment.
    ```bash
    npm run genkit:dev
    ```

Now, you can open your browser and start using the application.

## Building for Production

To create a production-ready build, run the following command:

```bash
npm run build
```

And to start the production server:

```bash
npm run start
```
