# Surai Music Collaboration App

## Overview

Surai is a real-time music collaboration application that allows users to create and share music together. It provides a simple and intuitive interface for composing music with others, with a focus on ease of use and a modern design.

## Project Outline

### Styling and Design

*   **CSS Framework:** Tailwind CSS
*   **Component Library:** None (custom components)
*   **Icons:** lucide-react
*   **Color Palette:** Dark theme with shades of gray and blue accents.
*   **Typography:** Sans-serif font family.

### Features

*   **Authentication:** Google Sign-in via Firebase Authentication.
*   **Firestore Integration:** Tracks are saved and loaded from Firestore, associated with the user's account.
*   **Real-time Collaboration:** (Future implementation)
*   **Studio View:** A central workspace for creating and managing music tracks.
*   **Instrument Tracks:** Users can add tracks for different instruments (Drums, Bass, Vocals, Guitar).
*   **New Track Modal:** A modal for selecting and adding new instrument tracks.

### Implemented Changes (Current Session)

*   **Project Setup:** Initialized a new React project with Vite.
*   **Dependency Installation:** Added `firebase` and `lucide-react`.
*   **Firebase Configuration:** Created `src/firebase.js` with placeholder credentials and Firestore initialization.
*   **Component Creation:**
    *   `src/components/LoginScreen.jsx`: A login screen with a "Sign in with Google" button.
    *   `src/components/Header.jsx`: A header component with the application title and a sign-out button.
    *   `src/components/Toolbar.jsx`: A toolbar with a button to add new tracks.
    *   `src/components/Studio.jsx`: The main studio view to display instrument tracks.
    *   `src/components/NewTrackModal.jsx`: A modal for adding new instrument tracks.
*   **Utility Function:**
    *   `src/lib/utils.js`: A utility function to get instrument icons.
*   **Application Entry Point:**
    *   `src/App.jsx`: The main application component that handles routing, state management, and renders all other components. It now integrates with Firestore to save and load tracks.
