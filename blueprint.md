# SurAI Music Generator

## Overview

SurAI is a web-based application that allows users to generate music using AI. It features a modern and intuitive interface, allowing users to log in, enter a text prompt, and receive a short piece of AI-generated music. The application is designed to be visually engaging and user-friendly, with different tiers of access for users.

## Features

* **User Authentication:** Secure login for users to access their studio.
* **AI Music Generation:** Users can input a text prompt to generate music.
* **"Surprise Me" Button:** A feature that provides random, creative prompts to inspire users.
* **Dynamic UI:** The interface provides real-time feedback, including loading states and error messages.
* **Styled Audio Player:** A custom-styled audio player to present the generated music.
* **User Tiers:** The UI reflects the user's access level (e.g., "FREE TIER", "VIP PRO").
* **Modern Aesthetics:** A sleek design with a custom color palette, background texture, and interactive elements.

## Project Structure

The project is a React application built with Vite and styled with Tailwind CSS.

* **`src/`**: Contains the main application source code.
* **`src/components/`**: Houses all React components, including:
    * `App.jsx`: The main application component.
    * `Login.jsx`: The user login screen.
    * `Studio.jsx`: The main music generation interface.
    * `SurpriseMeButton.jsx`: A button that suggests random prompts.
* **`src/firebase.js`**: Firebase configuration and initialization.
* **`tailwind.config.js`**: Custom theme and configuration for Tailwind CSS.
* **`public/`**: Public assets and the main `index.html` file.

## Current Plan

* **Refine and Polish:** The current focus is on refining the existing features and polishing the user interface.
* **Add New Features:** Future plans include adding features such as:
    * Saving and sharing generated music.
    * A history of generated tracks.
    * More advanced music generation options.
* **Backend Development:** The backend will be further developed to support new features and improve music generation quality.
