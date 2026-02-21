# Milestone-2 Full Stack MERN Project - Product Dashboard

## Project Overview
This project is a single integrated full-stack application developed as part of **Milestone-2**.  
The application demonstrates frontend development using React and backend development using Express.js.

The Product Dashboard allows users to:
- View a list of products
- View product details
- Add new products using a validated form
- Mark products as favorite
- Navigate between pages using routing

---

## Technologies Used

### Frontend
- React
- React Router DOM
- Formik
- Yup
- Context API
- Bootstrap

### Backend
- Node.js
- Express.js
- CORS

---

## Project Structure

REETHUM-MILESTONE2-FULLSTACKMERN/

|-- backend/  
|   |-- node_modules/  
|   |-- package.json  
|   |-- package-lock.json  
|   |-- server.js  

|-- frontend/  
|   |-- node_modules/  
|   |-- public/  
|   |-- src/  
|   |   |-- components/  
|   |   |   |-- AddProductForm.js  
|   |   |   |-- ProductCard.js  
|   |   |   |-- ProductDetail.js  
|   |   |   |-- ProductList.js  
|   |   |-- context/  
|   |   |   |-- ProductContext.js  
|   |   |-- App.js  
|   |   |-- index.js  
|   |   |-- index.css  
|   |-- package.json  
|   |-- package-lock.json  

|-- README.md  

---

## Backend API Endpoints

GET /products  
- Fetches all products  

GET /products/:id  
- Fetches a product by ID  

POST /products  
- Adds a new product  

---

## User Story 1 – Product Catalog
- Product list displayed using Bootstrap cards
- ProductList implemented as a class component
- ProductCard implemented as a functional component
- Props used to pass product data
- State used to manage favorite status
- Favorite toggle implemented using React state

---

## User Story 2 – Routing and Product Details
- React Router used for navigation
- Product detail page implemented using dynamic routing
- Data fetched from backend API
- Loading and error states handled using try-catch
- Back button added for navigation
- Lazy loading implemented using React.lazy and Suspense (Bonus)

---

## User Story 3 – Add Product Form
- Add product form built using Formik
- Validation handled using Yup
- Fields included: Name, Price, Category, Description
- Product added using POST API
- Global state updated using Context API
- Success feedback provided using alert
- Back button added for navigation

---

## Bonus Feature
- Lazy loading of Product Detail component using React.lazy and Suspense
- Improves performance by loading components only when required

---

## How to Run the Project

### Step 1: Run Backend
cd backend  
npm install  
node server.js  

Backend runs on http://localhost:5000

---

### Step 2: Run Frontend
cd frontend  
npm install  
npm start  

Frontend runs on http://localhost:3000

---

## Conclusion
The Product Dashboard application demonstrates component-based React development, REST API integration, routing, form validation, and state management using Context API.
