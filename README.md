# 🐶 Dog Matcher App

A React + Material-UI (MUI) web application designed to help users find their perfect canine companion. Browse, filter, favorite, and get matched with adoptable dogs powered by the Fetch.com API.

---

## 🚀 Features

* **✅ User Authentication:**
    * Simple login using name and email.
    * Logout functionality for secure sessions.
    * _Optional:_ Route protection implemented using cookies for enhanced security.

* **🐕 Browse Dogs:**
    * **Comprehensive Filtering:** Easily narrow down your search results by:
        * Breed
        * Location (City and State)
        * Age (Minimum and Maximum)
    * **Flexible Sorting:** Arrange dog listings by:
        * Breed (Ascending/Descending)
        * Name (Ascending/Descending)
        * Age (Ascending/Descending)
    * **Paginated Results:** Efficiently navigate through large sets of search results.
    * **Instant Filter Reset:** Clear all applied filters with a single click.

* **⭐ Favorite Dogs:**
    * Intuitive interface to add or remove dogs from your personal favorites list.
    * Send your curated list of favorite dogs to the backend to generate a match.

* **🎯 Match Generation:**
    * Receive a single, best-matched dog from your favorited selections, based on the backend's matching algorithm.

* **🧹 Responsive UI:**
    * **Consistent Dog Card Layout:** Utilizes Material-UI Cards for a clean and uniform display of dog information.
    * **Mobile-Friendly Filter Panel:** The filter and sorting controls are designed to be clean and easy to use on various screen sizes.

---

## 📦 Tech Stack

The application is built using modern web technologies to ensure a robust, scalable, and user-friendly experience:

* **React:** A declarative, component-based JavaScript library for building user interfaces.
    * Utilizes **React Router** for declarative routing and navigation.
* **Material-UI (MUI):** A comprehensive React UI framework that implements Google's Material Design. Provides pre-built, accessible, and customizable components.
* **Axios:** A promise-based HTTP client for making API requests. Configured with `withCredentials` for handling cookies and session management.
* **Query String / URL Search Params:** For managing and parsing URL query parameters, enabling filter state synchronization.
* **Fetch.com API:** Integrates with a provided backend API to fetch dog data and manage user interactions.

---

## 🧪 API Reference Used

The following endpoints from the Fetch.com API (provided backend) are utilized:

* `POST /auth/login`
* `POST /auth/logout`
* `GET /dogs/breeds`
* `GET /dogs/search`
* `POST /dogs`
* `POST /dogs/match`
* `POST /locations`
* `POST /locations/search`

---

## 🛠️ Getting Started

1.  **Clone the Repository**

    ```bash
    git clone [https://github.com/your-username/dog-matcher.git](https://github.com/your-username/dog-matcher.git)
    cd dog-matcher
    ```

    _Replace the URL above with your actual repo link._

2.  **Install Dependencies**

    ```bash
    npm install
    ```

3.  **Run the App**

    ```bash
    npm start
    ```

    _This will launch the app on `http://localhost:3000`_

---

## 🔐 Notes on Authentication

* You must log in with your name and email on the login screen.
* An authentication cookie (`fetch-access-token`) is automatically handled by the browser for subsequent requests, ensuring a seamless user experience.

---
