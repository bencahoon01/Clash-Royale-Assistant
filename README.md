# CR-Assistant
Clash Royale Assistant - Provides match insight like opponent elixir, card cycle, level interactions, etc.
MVP Specification Document

Overview
This document outlines the core features, architecture, and technical setup for the Clash Royale Assistant MVP.
The MVP focuses on real-time opponent elixir tracking and card detection using computer vision, with a simple overlay UI for display.

1. User Roles

Player (User) – Runs the assistant locally while playing on an emulator. Receives real-time tracking of opponent’s cards and elixir.

Developer/Admin – Maintains the model, updates card data, fixes bugs.

2. Key Features (MVP Scope)
2.1 Core Features

Opponent Elixir Tracking

Start at 5 elixir.

Deduct elixir based on detected card’s cost.

Regenerate 1 elixir every ~2.8s (cap at 10).

Card Tracking

Detect opponent’s played cards using computer vision.

Display detected card name and elixir cost.

Maintain a simple card cycle list (4 in hand, 4 upcoming).

App UI displays realtime information 

Show:

Current opponent elixir (number + purple bar).

Recently played cards.

Card cycle prediction (text placeholders for MVP).

- **Manual emulator window selection** – Works with Bluestacks, LDPlayer, Nox, MEmu, etc.

User selects emulator window for capture.

Works with Bluestacks, LDPlayer, Nox, etc.

3. Non-MVP (Future Features)

Predicted deck archetype & winrate.

Player’s own elixir tracking.

Unit HP/DPS for spell breakpoints.

Meta insights from API.

Realtime Overlay UI

4. UI Wireframe (Functional Description)
Main Overlay
[ Opponent Elixir: ██████░░░░  6/10 ]
[ Recently Played Cards ]
    - Hog Rider (4)
    - Fireball (4)
[ Card Cycle Prediction ]
    In Hand: Knight, Archers, Log, Fireball
    Next Up: Hog Rider, Skeletons, Cannon, Valkyrie


Minimal text-based overlay for MVP.

Later iterations will adopt esports-style polished UI.

5. Architecture Overview
+----------------------+
| Emulator Window      |
| (Bluestacks/LDPlayer)|
+----------+-----------+
           |
           v
+----------------------+
| Screen Capture (mss) |
+----------+-----------+
           |
           v
+----------------------+
| YOLOv8/YOLOv11 Model |
| (card detection)     |
+----------+-----------+
           |
           v
+----------------------+
| Game Logic           |
| - Elixir tracking    |
| - Cycle prediction   |
+----------+-----------+
           |
           v
+----------------------+
| Overlay UI (PyQt5)   |
+----------------------+

6. Tools & Libraries

Language: Python 3.10+
ML/DL Framework: PyTorch
Model: YOLOv8 (ultralytics) or YOLOv11 when stable
Dependencies:

ultralytics – YOLO training/inference

opencv-python – image handling

mss – screen capture

pygetwindow – window selection

numpy – array processing

PyQt5 (or Tkinter for basic UI)

roboflow (optional) – dataset hosting & annotation

7. Dataset & Model Training
Data Collection

Record emulator gameplay.

Extract frames using ffmpeg or Python.

Label played card animations in Roboflow (YOLO format).

Use fixed resolution (e.g., 1280×720) for consistency.

Training
pip install ultralytics
yolo detect train data=dataset.yaml model=yolov8n.pt epochs=50 imgsz=640


Use nano model for real-time inference.

Save trained weights in /models.

8. Supabase / Backend (Not Needed for MVP)

MVP runs offline.

No backend integration required at this stage.

9. File Structure
cr-assistant/
  ├── data/              # Raw and processed images
  ├── models/            # YOLO trained weights
  ├── src/
  │   ├── capture.py     # Emulator capture
  │   ├── detection.py   # YOLO inference
  │   ├── elixir.py      # Elixir logic
  │   ├── cycle.py       # Card cycle logic
  │   ├── overlay.py     # UI display
  │   └── main.py        # Main entry
  ├── card_data.json     # Card names + elixir costs
  ├── requirements.txt
  └── README.md

10. MVP Flow

User starts the program.

Selects emulator window.

Program captures frames at ~10–15 FPS.

YOLO model detects played cards.

Elixir logic updates count.

Overlay updates display in real-time.

11. Installation & Setup

Install Dependencies

python -m venv venv
source venv/bin/activate   # or venv\Scripts\activate
pip install -r requirements.txt


Run App

python src/main.py

12. Requirements File (Example)
ultralytics
opencv-python
mss
pygetwindow
numpy
PyQt5

13. Next Steps

 Collect & label initial dataset (10–15 cards to start).

 Train YOLOv8n model.

 Implement screen capture & detection pipeline.

 Implement elixir tracker logic.

 Build minimal overlay UI.

 Test on live emulator gameplay.