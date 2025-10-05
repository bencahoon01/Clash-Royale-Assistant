<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a id="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![project_license][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/github_username/repo_name">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Clash Royale AI Assisstant</h3>

  <p align="center">
    A real time strategic app assisstant for Clash Royale, powered by computer vision to track oppponent elixir and card cycles
    <br />
    <a href="https://github.com/github_username/repo_name"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/github_username/repo_name">View Demo</a>
    &middot;
    <a href="https://github.com/github_username/repo_name/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    &middot;
    <a href="https://github.com/github_username/repo_name/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>


<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

In competitive games like Clash Royale, success hinges on tracking key information—most importantly, the opponent's 8-card cycle and their current elixir. This project automates that mental load. It acts as a passive observer, using a custom-trained computer vision model to read the game state directly from the screen. It then presents this crucial data in a clean, non-intrusive overlay, allowing players to make smarter, data-driven decisions.

This project is a portfolio piece designed to showcase a modern, end-to-end application featuring:

- A real-time AI component for data extraction.

- A containerized backend for reliable data management.

- A high-performance desktop GUI for user interaction.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

This project's tech stack is separated into three core domains, demonstrating a full-stack skill set.

| Frontend (Desktop UI) | AI / Vision Engine | Backend & DevOps |
| :---: | :---: | :---: |
| [![Electron][Electron.js]][Electron-url] | [![Python][Python.org]][Python-url] | [![FastAPI][FastAPI.tiangolo.com]][FastAPI-url] |
| [![React][React.js]][React-url] | [![PyTorch][PyTorch.org]][PyTorch-url] | [![PostgreSQL][PostgreSQL.org]][PostgreSQL-url] |
| [![TypeScript][TypeScript]][TypeScript-url] | [![OpenCV][OpenCV]][OpenCV-url] | [![Docker][Docker.com]][Docker-url] |

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### System Architecture

The application operates with a decoupled architecture to ensure performance and scalability. The backend services (API and Database) are managed by Docker, while the Python Vision Engine runs as a separate process that communicates with the Electron GUI in real-time.

```plaintext
+--------------------------+        (WebSocket Events)         +----------------------+
|                          | <--------------------------------> |                      |
|    Electron/React GUI       |                                 |  Python Vision Engine|
|    (Desktop Overlay)     |                                    |  (AI & Game Logic)   |
|                          |                                    |                      |
+--------------------------+------------------------------------+----------------------+
           |
           | (HTTP GET Request on startup)
           v
+--------------------------+
|                          |
|  FastAPI & PostgreSQL    |
|  (Running in Docker)     |
+--------------------------+
```

<!-- GETTING STARTED -->
## Getting Started

**Prerequisites**

Ensure you have the following software installed on your system:

- Git

- Docker & Docker Compose

- Node.js (v18.x or later) & npm

- Python (v3.10 or later)

### Installation

**1. Clone the Repository**
   ```sh
   git clone https://github.com/bencahoon01/clash-royale-assistant.git
   cd cr-asssisstant
   ```
**2. Configure Backend Services**
   - Navigate to the ```backend``` directory
   - Create a ```.env``` file by copying the example: ```cp example.env .env```
   - Open the new ```.env``` file and set a secure password for ```POSTGRES_PASSWORD```
**4. Launch Backend with Docker**
   - From the project's **root directory**, run Docker Compose. This command builds the images for your API and database and starts them in the background
   ```sh
   docker-compose up --build -d
   ```
**5. Install Frontend & AI Dependencies**
   - Install GUI dependencies:
     ```sh
     cd gui && npm install
     ```
   - Install Vision Engine dependencies (it is highly recommended to use a Python virtual environment):
     ```sh
     cd ../vision-engine
     python -m venv venv
     source venv/bin/activate  # On Windows use `venv\Scripts\activate`
     pip install -r requirements.txt
     ```
   
**7. Change git remote url to avoid accidental pushes to base project**
   ```sh
   git remote set-url origin github_username/repo_name
   git remote -v # confirm the changes
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

The primary goal of the MVP is to provide live, real-time statistics during gameplay.

1. Ensure the backend services are running via Docker (`docker ps` should show the `clash-db` and `clash-api` containers running).

2. Start the Vision Engine from the `vision-engine` directory (ensure your virtual environment is active):

```sh

python main.py
```
3. Start the GUI from the gui directory:

```sh

npm run dev
```
Select the window that is running the game. The app will automatically detect when a match begins and start providing live data.



<!-- ROADMAP -->
## Roadmap

This project is planned in multiple phases, starting with a core MVP and expanding to more advanced features.

- [x] **Phase 1: MVP - The Live Elixir Coach**
    - [ ] Real-time card recognition for a core set of units.
    - [ ] Live opponent elixir tracking.
    - [ ] Opponent card cycle display.
    - [ ] Local containerized backend with Docker.
- [ ] **Phase 2: The Replay Analysis Tool**
    - [ ] Adapt the vision engine to analyze video files.
    - [ ] Generate a post-game timeline of key events.
    - [ ] Create a UI to visualize elixir advantages and missed opportunities.
- [ ] **Phase 3: The AI Strategist (Future Goal)**
    - [ ] Generate structured game logs from replays.
    - [ ] Create a dataset of game logs paired with expert analysis.
    - [ ] Fine-tune an open-source LLM to provide automated strategic insights.

See the [open issues][issues-url] for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- LICENSE -->
## License

Distributed under the project_license. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- Disclaimer -->
## ⚠️ Disclaimer
This project is created for educational and portfolio purposes only. It is a proof-of-concept demonstrating skills in computer vision, AI, and full-stack development.

 - This tool is NOT intended for use in the live game against other players. Using unauthorized third-party software is against Supercell's Terms of Service and can result in a permanent ban.

- The author is not responsible for any consequences that may arise from the use or misuse of this software.

- This project is not affiliated with, endorsed, or sponsored by Supercell Oy in any way.



<!-- CONTACT -->
## Contact

Ben Cahoon - bencahoon.contact@gmail.com

Project Link: [https://github.com/bencahoon01/Clash-Royale-Assistant](https://github.com/bencahoon01/Clash-Royale-Assistant)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* []()
* []()
* []()

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo_name.svg?style=for-the-badge
[contributors-url]: https://github.com/github_username/repo_name/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge
[forks-url]: https://github.com/github_username/repo_name/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo_name.svg?style=for-the-badge
[stars-url]: https://github.com/github_username/repo_name/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge
[issues-url]: https://github.com/github_username/repo_name/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
<!-- Shields.io badges. You can a comprehensive list with many more badges at: https://github.com/inttter/md-badges -->
[Electron.js]: https://img.shields.io/badge/Electron-191970?style=for-the-badge&logo=Electron&logoColor=white
[Electron-url]: https://www.electronjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[TypeScript]: https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[Python.org]: https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white
[Python-url]: https://www.python.org/
[PyTorch.org]: https://img.shields.io/badge/PyTorch-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white
[PyTorch-url]: https://pytorch.org/
[OpenCV]: https://img.shields.io/badge/OpenCV-5C3EE8?style=for-the-badge&logo=opencv&logoColor=white
[OpenCV-url]: https://opencv.org/
[FastAPI.tiangolo.com]: https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white
[FastAPI-url]: https://fastapi.tiangolo.com/
[PostgreSQL.org]: https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white
[PostgreSQL-url]: https://www.postgresql.org/
[Docker.com]: https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white
[Docker-url]: https://www.docker.com/
