PQR Bank - Modern Digital Banking Platform
==========================================

PQR Bank is a feature-rich, secure, and user-friendly digital banking platform built with React and TypeScript. It provides a seamless experience for customers to manage their finances and a powerful dashboard for administrators to oversee platform operations.

✨ Key Features
--------------

### For Customers

-   **Secure Authentication**: Robust login and registration system, including a KYC document upload process for new users.

    -   **Comprehensive Dashboard**: At-a-glance view of account balances, recent transactions, and an interactive spending analysis chart.

    -   **Account Management**: View all accounts (Checking, Savings, Loan), see detailed balances, and add new accounts.

    -   **Transaction History**: A detailed, paginated list of all transactions with powerful search and filtering capabilities.

    -   **Seamless Transfers**:

    -   Transfer funds between your own accounts.

        -   Send money to external beneficiaries.

        -   Withdraw funds.

        -   All transactions are secured with a dummy OTP verification step.

    -   **AI Assistant**: An integrated chatbot powered by the **Google Gemini API** to help users navigate the app and understand its features.

    -   **Personalization**:

    -   Manage profile details, security settings, and notification preferences.

        -   Switch between **Light and Dark modes**.

        -   Choose from multiple color themes (Blue, Teal).

    -   **Fully Responsive**: A beautiful and functional UI that works flawlessly on desktop, tablet, and mobile devices.

### For Administrators

-   **Separate Admin Portal**: A dedicated and secure login for administrators.

    -   **Insightful Dashboard**: A high-level overview of the platform with key metrics like total customers, total deposits, daily transactions, and pending KYC requests. Includes charts for customer growth and account type distribution.

    -   **User Management**: View a complete list of all registered users, edit their details, and manage their status.

    -   **KYC Verification Queue**: A dedicated interface to review and approve or reject new customer registrations based on their submitted documents.

    -   **System Settings**: Manage admin profiles and system-wide preferences.

🚀 Tech Stack
-------------

-   **Frontend**: React, TypeScript

    -   **Styling**: Tailwind CSS

    -   **Routing**: React Router

    -   **State Management**: React Context API

    -   **AI / LLM**: Google Gemini API (@google/genai)

    -   **Charting**: Recharts

    -   **Backend Communication**: fetch API with a microservice-oriented client.

📁 Project Structure
--------------------

The project is organized to be scalable and maintainable.

codeCode

```
/
├── public/
├── src/
│   ├── api/             # API client for backend services
│   ├── components/      # Reusable UI components (Button, Card, Layouts)
│   ├── contexts/        # Global state management (AuthContext, ThemeContext)
│   ├── data/            # (If any) Dummy data for development
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Top-level route components
│   │   ├── admin/       # Pages for the admin portal
│   │   └── ...
│   ├── types/           # TypeScript type definitions
│   ├── App.tsx          # Main component with routing logic
│   ├── constants.tsx    # App-wide constants (e.g., navigation links)
│   └── index.tsx        # Application entry point
├── index.html
├── metadata.json
└── ...
```

⚙️ Getting Started
------------------

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   [Node.js](https://www.google.com/url?sa=E&q=https%3A%2F%2Fnodejs.org%2F) (v18 or later)

    -   [npm](https://www.google.com/url?sa=E&q=https%3A%2F%2Fwww.npmjs.com%2F) or [yarn](https://www.google.com/url?sa=E&q=https%3A%2F%2Fyarnpkg.com%2F)

### Installation

-   **Clone the repository:**

    codeSh

    ```
    git clone https://github.com/your-username/pqr-bank-frontend.git
    cd pqr-bank-frontend
    ```

    -   **Install dependencies:**

    codeSh

    ```
    npm install
    ```

    -   **Set up environment variables:**

    The AI Chatbot feature requires a Google Gemini API key.

    -   Create a .env file in the root of the project.

        -   Add your API key to the file:

        codeEnv

        ```
        API_KEY=YOUR_GEMINI_API_KEY
        ```

        -   You can get an API key from [Google AI Studio](https://www.google.com/url?sa=E&q=https%3A%2F%2Faistudio.google.com%2Fapp%2Fapikey).

    -   **Run the development server:**

    codeSh

    ```
    npm run dev
    ```

    The application will be available at http://localhost:5173 (or another port if 5173 is in use).

### 🔑 Test Credentials

-   **Customer Login**:

    -   Email: Deepanraj@example.com

        -   Password: password123

    -   **Admin Login**:

    -   Email: admin@pqr.com

        -   Password: adminpass

🔗 Backend Services
-------------------

This is a frontend-only application designed to communicate with a set of backend microservices. The base URLs for these services are configured in src/api/client.ts. For local development, you will need to run these services or mock their endpoints.

The application is configured to connect to the following services:

-   **USER Service**: Handles authentication and user registration.

    -   **ADMIN Service**: Handles admin-specific data and actions.

    -   **CUSTOMER Service**: Manages customer profile data.

    -   **ACCOUNT Service**: Manages bank accounts.

    -   **TRANSACTION Service**: Manages financial transactions.

🤝 Contributing
---------------

Contributions are welcome! If you have suggestions for improving the app, please feel free to fork the repository and submit a pull request.

-   Fork the Project

    -   Create your Feature Branch (git checkout -b feature/AmazingFeature)

    -   Commit your Changes (git commit -m 'Add some AmazingFeature')

    -   Push to the Branch (git push origin feature/AmazingFeature)

    -   Open a Pull Request
