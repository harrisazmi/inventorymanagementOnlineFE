# Inventory Management System Frontend (Full Guide)

---

- RENDER HOSTED so please assume delay around 1 to 2 minute for server to wakeup from sleep

---

## Overview

The Inventory Management System is a modern web application developed using React and Vite. It provides a user-friendly interface for performing various inventory management tasks, such as adding new items, deleting existing items, searching for items, and viewing detailed product information.

## Features

- **Add Items**: Easily add new items to the inventory with a few simple clicks.
- **Delete Items**: Remove unwanted items from the inventory effortlessly.
- **Search Functionality**: Quickly find items by searching their names.
- **Product Details**: View detailed information about selected products.
- **Pagination Support**: Navigate through large inventories with ease using pagination.

## Installation

To get started with the Inventory Management System, please start go for https://github.com/harrisazmi/inventorymanagementOnlineBE
for starting the backend api and then can continue to follow these steps:

1. **Clone the Repository**:

   ```bash
   git clone <repository-url>
   ```

2. **Navigate to the Project Directory**:

   ```bash
   cd inventory-management-system
   ```

3. **Edit the Environment Variables**:

   - Create a `.env` file in the root directory if it doesn't exist.
   - Add the following line to the `.env` file, replacing `<yourbackendhost>` with the URL of your backend API:
     ```
     VITE_BACKEND_URL = <yourbackendhost>
     ```

4. **Install Dependencies**:

   ```bash
   npm install
   ```

5. **Start the Development Server**:

- I have set up so if you are using LAN, anyone connected to the same network can use what you serve

  ```bash
  npm run dev
  ```

  The development server will start, allowing you to access the Inventory Management System locally at [http://localhost:5173](http://localhost:5173).

  If you're on a local area network (LAN), other devices connected to the same network can also access the application by using your host machine's IP address and port 3000. For example:

  ```
  http://<your-ip-address>:5173
  ```

  Replace `<your-ip-address>` with the IP address of your host machine where the development server is running. Ensure that your firewall settings allow inbound connections to port 3000 if you're hosting the application over LAN.

6. **Access the Application**:
   Open your web browser and navigate to [http://localhost:5173](http://localhost:5173) to access the Inventory Management System.

## Docker Integration

You can also run the Inventory Management System using Docker. Follow these steps to build and run the application in a Docker container:

1. **Create Dockerfile**:

   Create a `Dockerfile` in the root directory of your project with the following content:

   ```Dockerfile
   FROM node:18
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   EXPOSE 5173

   CMD [ "npm", "run", "dev" ]
   ```

2. **Build Docker Image**:

   Run the following command to build the Docker image:

   ```bash
   docker build -t inventory-management-system .
   ```

3. **Run Docker Container**:

   Once the image is built, start a Docker container with the following command:

   ```bash
   docker run -p 5173:5173 -d inventory-management-system
   ```

   This command will start the Docker container in detached mode, mapping port 5173 inside the container to port 3000 on your host machine. You can now access the Inventory Management System by navigating to [http://localhost:5173](http://localhost:5173) in your web browser.

4. **Accessing the Application**:

   If you're on a local area network (LAN) and want other devices to access the application, replace `localhost` with the IP address of your host machine in the URL. Ensure that your firewall settings allow inbound connections to port 3000.

## API Integration

The Inventory Management System assumes the presence of a backend API for managing inventory. Ensure to specify the base URL of the API using the `VITE_BACKEND_URL` environment variable.

## Contributing

Contributions to the Inventory Management System are welcome! If you have any suggestions, improvements, or bug fixes, please feel free to open an issue or submit a pull request.
