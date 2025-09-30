# Clash Royale AI Coach

\<div align="center"\>
\<img src="[https://img.shields.io/badge/status-in%20development-blue.svg](https://www.google.com/search?q=https://img.shields.io/badge/status-in%2520development-blue.svg)" alt="Status" /\>
\<img src="[https://img.shields.io/badge/license-MIT-green.svg](https://www.google.com/search?q=https://img.shields.io/badge/license-MIT-green.svg)" alt="License" /\>
\</div\>

An AI-powered real-time coach for Clash Royale that uses computer vision to provide a strategic advantage by tracking opponent elixir and card cycles.

## About The Project

This project is a desktop assistant designed for competitive Clash Royale players. It passively reads the game screen without modifying game files, providing a lightweight overlay with crucial real-time data that is normally left to memory and guesswork. The goal is to demonstrate a powerful end-to-end application of computer vision, real-time data processing, and modern desktop app development.

-----

## Key Features (MVP)

  * **⚡ Real-time Card Recognition:** A Python-based vision engine using a custom-trained YOLO model to identify opponent card plays live.
  * **💧 Live Elixir Tracking:** The app accurately calculates the opponent's current elixir by tracking their plays and passive generation.
  * **🔄 Card Cycle Display:** A clean UI overlay shows the last four cards the opponent has played, revealing their current hand and upcoming cycle.
  * **🖥️ Lightweight Desktop Overlay:** Built with Tauri and React to ensure minimal impact on game performance.

-----

## Tech Stack

This project is composed of three main services:

  * **Frontend (Desktop App):**

      * [Tauri](https://tauri.app/): For building a lightweight, performant desktop application.
      * [React](https://reactjs.org/): For building the user interface.
      * [TypeScript](https://www.typescriptlang.org/): For type-safe code.

  * **AI / Vision Engine:**

      * [Python](https://www.python.org/): Core language for the vision script.
      * [PyTorch](https://pytorch.org/): For running the object detection model.
      * [OpenCV](https://opencv.org/): For screen capture and image processing.
      * [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API): For real-time communication with the frontend.

  * **Backend (Data & API):**

      * [FastAPI](https://fastapi.tiangolo.com/): For serving card data.
      * [PostgreSQL](https://www.postgresql.org/): For storing card stats.
      * [Render](https://render.com/)/[Supabase](https://supabase.com/): For hosting the API and database.

-----

## System Architecture

The application operates with a simple, decoupled architecture to ensure performance and scalability.

```
+--------------------------+        (WebSocket Events)         +----------------------+
|                          | <--------------------------------> |                      |
|  Tauri/React GUI         |                                    |  Python Vision Engine|
|  (Desktop Overlay)       |                                    |  (AI & Game Logic)   |
|                          |                                    |                      |
+--------------------------+------------------------------------+----------------------+
           |
           | (HTTP GET Request on startup)
           v
+--------------------------+
|                          |
|  FastAPI Backend &       |
|  PostgreSQL Database     |
|  (Hosted on Render)      |
+--------------------------+
```

-----

## Getting Started

To get a local copy up and running, follow these simple steps.

1.  **Clone the repo**
    ```sh
    git clone https://github.com/your_username/clash-royale-ai-coach.git
    ```
2.  **Set up the Vision Engine**
    ```sh
    cd vision-engine
    pip install -r requirements.txt
    ```
3.  **Set up the GUI**
    ```sh
    cd gui
    npm install
    ```
4.  **Configure Environment Variables**
      * Create a `.env` file and add your database URL.
5.  **Run the application**
      * Start the Python Vision Engine script.
      * Start the Tauri desktop application in dev mode.

-----

## Roadmap: Future Features

This MVP serves as a strong foundation for many powerful features to come:

  * **🔮 Live Deck Prediction:** Analyze the opponent's first few cards to predict their entire deck archetype based on meta data.
  * **🧠 Positive Elixir Trade Suggestions:** Highlight when the user has a significant elixir advantage, signaling an optimal time to attack.
  * **❤️ Unit Health & Position Tracking:** A more advanced vision model to track unit positions and remaining health for deeper strategic analysis.
  * **📈 Post-Match Analysis:** A summary screen after each match detailing key moments, elixir advantages, and areas for improvement.
  * **⚙️ Customization:** Allow users to customize the overlay's position, size, and what information it displays.

-----

## License

Distributed under the MIT License. See `LICENSE` for more information.

-----

## Contact

Your Name - [@your\_twitter](https://www.google.com/search?q=https://twitter.com/your_twitter) - email@example.com

Project Link: [https://github.com/your\_username/clash-royale-ai-coach](https://www.google.com/search?q=https://github.com/your_username/clash-royale-ai-coach)
