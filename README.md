# Food Deployment System

## Project Description

The Food Deployment System is a comprehensive platform designed to streamline the management and distribution of food resources. It offers a user-friendly interface for administrators and users to manage food items, track distribution, and analyze resource utilization. The system is divided into a front-end application for user interaction and a back-end API for handling data processing and storage.

### Features
- **User Authentication:** Secure login and registration for admins and users.
- **Food Item Management:** Add, update, and delete food items.
- **Distribution Tracking:** Track distributed food quantities and recipients.
- **Reporting and Analytics:** Generate reports on resource utilization.
- **Responsive Design:** Optimized for both desktop and mobile devices.

---

## Setup Instructions

### Prerequisites
- Node.js (v14 or above)
- MongoDB (local or cloud-based, e.g., MongoDB Atlas)
- Vite (for React-based front-end)
- NPM or Yarn package manager

### Back-end Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/food-deployment-system.git
   ```
2. Navigate to the back-end directory:
   ```bash
   cd food-deployment-system/backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Configure environment variables:
   - Create a `.env` file in the `backend` directory.
   - Add the following variables:
     ```
     PORT=5000
     MONGO_URI=your_mongo_database_uri
     JWT_SECRET=your_jwt_secret_key
     ```
5. Start the server:
   ```bash
   npm start
   ```
6. The back-end API will be available at `http://localhost:5000`.

### Front-end Setup
1. Navigate to the front-end directory:
   ```bash
   cd food-deployment-system/frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   - Create a `.env` file in the `frontend` directory.
   - Add the following variables:
     ```
     VITE_BACKEND_URL=http://localhost:5000
     ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. The front-end application will be available at `http://localhost:5173`.

---

## Assumptions, Challenges, and Limitations

### Assumptions
- Users will have a stable internet connection for optimal performance.
- Admins are familiar with basic CRUD operations for managing data.
- MongoDB Atlas or a similar cloud-based database service will be used for deployment.

### Challenges
- **Authentication and Security:** Ensuring secure user authentication with JWT while maintaining usability.
- **Scalability:** Designing the back-end to handle a growing number of users and food items efficiently.
- **Cross-Origin Issues:** Managing CORS during development and deployment.

### Limitations
- The reporting feature is basic and may require enhancement for complex analytics.
- The system is not optimized for offline usage.
- Limited support for multiple languages; currently available in English only.

---

Feel free to contribute by submitting pull requests or reporting issues. For more information, contact us at [support@fooddeploymentsystem.com](mailto:support@fooddeploymentsystem.com).

