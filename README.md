# Joiji: A Movie Display App 🎬

**🎓 This project is developed as part of the CS251 course.**

Welcome to Joiji, a React application that fetches a list of movies from an API and displays them in a grid layout. Each movie is represented by a poster image. The application also includes a navigation bar and a menu bar.

![App Screenshot](/app-screenshot.png)

## 🚀 Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### 📋 Prerequisites

- Node.js and npm installed on your machine. You can download them from [here](https://nodejs.org/en/).
- Git installed on your machine. You can download it from [here](https://git-scm.com/).
- Docker installed on your machine. You can download it from [here](https://www.docker.com/get-started/).

### 🔧 Installation

1. **Clone the repository**

Get a copy of the project on your local machine with:
```sh
git clone https://github.com/rapeephong-6509681216/joiji.git
```

2. **Navigate to the project directory:**

Change your working directory to the project's root:
```sh
cd joiji
```

3. **Install Client Dependencies:**

Navigate to the client directory and install the required dependencies:
```sh
cd client
npm install
```

4. **Install Server Dependencies:**

Navigate to the server directory and install the required dependencies:
```sh
cd ../server
npm install
```
5. **Start MySQL Server with Docker:**

Start a MySQL server using Docker. Replace /path/to/your/data with the path where you want to store your MySQL data:
```sh
docker run --name mysql-server -p 3306:3306 -v /path/to/your/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=joijiDB -d mysql
```

6. **Start phpMyAdmin with Docker:**

Start phpMyAdmin using Docker. Replace mysql-server with the name of your MySQL Docker container:
```sh
docker run --name phpmyadmin -d --link mysql-server:db -p 8080:80 phpmyadmin/phpmyadmin
```

7. **Start the Server:**

Start the development server:
```sh
npm run dev
```

8. **Start the Client:**

In a new terminal window, navigate back to the client directory and start the client:
```sh
cd ../client
npm run dev
```

9. **Access the Application:**

- 🌐 The client can be accessed at [http://localhost:5173](http://localhost:5173)
- 🌐 The server is running at [http://localhost:3000](http://localhost:3000)
- 🌐 phpMyAdmin can be accessed at [http://localhost:8080](http://localhost:8080)

### 🗄️ Database Setup

Before running the application, you need to set up the database. This project includes two SQL files, `Database.SQL` and `Example.SQL`, which are used to create the database structure and populate it with example data.

1. **Create a New Database**

   - Open phpMyAdmin in your web browser.
   - Click on the "Databases" tab at the top of the page.
   - Enter a name for your new database (e.g., `joijiDB`) in the "Create database" field.
   - Click the "Create" button.

2. **Import the Database Structure**

   - Click on the name of your new database in the left sidebar to select it.
   - Click on the "Import" tab at the top of the page.
   - Click the "Choose File" button under "File to Import" and select the `Database.SQL` file from your local machine.
   - Click the "Go" button at the bottom of the page to import the database structure.

3. **Import the Example Data**

   - With your new database still selected, click on the "Import" tab again.
   - Click the "Choose File" button under "File to Import" and select the `Example.SQL` file from your local machine.
   - Click the "Go" button at the bottom of the page to import the example data.

After importing the `Database.SQL` and `Example.SQL` files, your database should be set up and ready to use with the application.

## 🌍 Environment Variables
This project uses the following environment variables:

VITE_API_URL: The base URL of the API.
VITE_PATH_POSTER: The base path for movie poster images.

## 🤝 Contributing
This project is a collaborative effort between me and my friend. We welcome contributions, issues, and feature requests! Feel free to check the issues page or take a look at the contributing guide.

## 📝 License
This project is licensed under the terms of the MIT license. See the LICENSE file for details.