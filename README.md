# Inventory Management System

## Split into 2 guides, Backend and Frontend

---

# Inventory Management System API - Backend

This Inventory Management System API provides endpoints for managing inventory items and suppliers. It allows users to perform CRUD (Create, Read, Update, Delete) operations on inventory items and suppliers.

## Prerequisites

Before running the application, ensure you have the following installed:

- Node.js
- Mongo Atlas
- Any HTTP client or tool like Postman for testing API endpoints

## Setup

1. Clone this repository to your local machine.
2. Install dependencies by running `npm install`.
3. Create a `.env` file in the root directory of the project and add the following environment variables:

PORT=3001
MONGO_DB_URL=<your_mongodb_connection_url>

Replace `<your_mongodb_connection_url>` with your Mongo Atlas connection URL.

## Running the Application

To start the server, run:
npm start

The server will start running on `http://localhost:3001` by default, or on the port specified in the `.env` file.

## API Endpoints

### Get all inventory items

- **URL:** `/api/inventory`
- **Method:** `GET`
- **Query Parameters:**
  - `sortBy`: Sort field (default: `itemName`)
  - `sortOrder`: Sort order (default: `asc`)
  - `itemName`: Filter by item name (optional)
- **Response:** Returns an array of inventory items and the total count.

### Add new inventory item

- **URL:** `/api/inventory`
- **Method:** `POST`
- **Body:** JSON object containing `itemName`, `quantity`, and `supplierId`.
- **Response:** Returns the newly added inventory item.

### Delete an inventory item

- **URL:** `/api/inventory/:id`
- **Method:** `DELETE`
- **Parameters:** `id` (Inventory item ID)
- **Response:** Returns a success message upon successful deletion.

### Update an inventory item or supplier

- **URL:** `/api/update-inventory/:id`
- **Method:** `PUT`
- **Parameters:** `id` (Inventory item ID)
- **Body:** JSON object containing updated `itemName`, `quantity`, and `supplierId`.
- **Response:** Returns the updated inventory item.

### Populate the database

- **URL:** `/api/populate-database`
- **Method:** `POST`
- **Response:** Populates the database with sample data. (Note: Implementation of this endpoint is pending.)

## Sample Requests

### Add new inventory item

```http
POST /api/inventory
Content-Type: application/json

{
  "itemName": "Sample Item",
  "quantity": 10,
  "supplierId": "supplier_id"
}
```

### Update an inventory item

PUT /api/update-inventory/:id
Content-Type: application/json

```json
{
  "itemName": "Updated Item",
  "quantity": 20,
  "supplierId": "supplier_id"
}
```

## Sample Response

```json
{
  "message": "Database populated successfully"
}
```

### Additional Notes

Ensure that the MongoDB server is running before starting the application.
Make sure to replace placeholders like :id and supplier_id with actual values when making requests.

---

# Inventory Management System Frontend - React with Vite

## Description

This project is an Inventory Management System implemented using React.js for the front end and a backend API for handling data storage and retrieval. It allows users to add new items to the inventory, search for items by name, delete items, and paginate through the inventory list.

## Features

1. **Add New Item**: Users can add new items to the inventory by providing the item name and quantity.

2. **Find Item**: Users can search for items by entering a search term. The system filters the inventory based on the search term.

3. **Delete Item**: Users can delete items from the inventory.

4. **Pagination**: Inventory items are paginated to enhance user experience when dealing with large datasets.

## Technologies Used

- **React.js**: A JavaScript library for building user interfaces.
- **Axios**: A promise-based HTTP client for making requests to the backend API.
- **Tailwind CSS**: A utility-first CSS framework used for styling the UI components.
- **Node.js**: A JavaScript runtime used for building the backend API.
- **Express.js**: A web application framework for Node.js used for building the backend API.
- **MongoDB**: A NoSQL database used for storing the inventory data.
- **Pagination Component**: Custom pagination component built using React.js.

## Project Structure

- **src/components**: Contains React components for different sections of the application.
- **src/App.js**: Main React component containing the application logic.
- **src/index.js**: Entry point of the React application.
- **public**: Contains static assets such as HTML files and favicon.
- **backend**: Contains backend API code.

## Setup Instructions

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:

```bash
cd <project-folder>
npm install
```

3. Set up environment variables:

- Create a .env file in the root of the project.
- Define the backend URL in the .env file:
- Read documentation for Vite as the way it interact is different with Create React App

```bash
VITE_BACKEND_URL=http://localhost:8000
```

4. Start the React development server:

```bash
npm start
```

5. Edit as you wanted.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

---
