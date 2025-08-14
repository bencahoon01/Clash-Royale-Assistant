Instructions from to start

1. Clone the repo
git clone https://github.com/YOUR_USERNAME/cr-assistant.git
cd cr-assistant

2. Create virtual environment & install dependencies
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt

Usage

Launch your emulator with Clash Royale open.

Run the assistant:

python src/main.py


Select the emulator window when prompted.

Keep the assistant window visible (it will stay on top).

Requirements

Python 3.10+

PyTorch (with GPU support recommended)

YOLOv8/YOLOv11 via Ultralytics

OpenCV, MSS, PyQt5

Install dependencies:

pip install -r requirements.txt

File Structure
cr-assistant/
  ├── data/              # Datasets for training YOLO
  ├── models/            # Trained YOLO weights
  ├── src/
  │   ├── capture.py     # Emulator screenshot handling
  │   ├── detection.py   # YOLO card detection
  │   ├── elixir.py      # Elixir tracking logic
  │   ├── ui.py          # PyQt5 UI
  │   └── main.py        # Main entry point
  ├── card_data.json     # Card names + elixir costs
  ├── requirements.txt   # Python dependencies
  └── README.md

Example (MVP UI)
+-----------------------------------+
| CR Assistant - Live Match Tracker |
+-----------------------------------+
| Opponent Elixir: ██████░░░░ (6/10)|
|-----------------------------------|
| Last Played Cards:                |
|  - Hog Rider (4)                  |
|  - Fireball (4)                   |
|-----------------------------------|
| In Hand Prediction:               |
|  Knight, Archers, Log, Fireball   |
+-----------------------------------+

Next Steps

 Collect & label sample card images.

 Train YOLO model.

 Implement screen capture & detection pipeline.

 Implement elixir tracking logic.

 Build PyQt5 display window.


---

## **File Scaffolding**


cr-assistant/
├── data/
├── models/
├── src/
│ ├── capture.py
│ ├── detection.py
│ ├── elixir.py
│ ├── ui.py
│ └── main.py
├── card_data.json
├── requirements.txt
└── README.md


---

### **`requirements.txt`**


ultralytics
opencv-python
mss
pygetwindow
numpy
PyQt5


---

### **`src/capture.py`**
```python
import mss
import pygetwindow as gw
import cv2
import numpy as np

def select_window():
    windows = gw.getAllTitles()
    print("Select a window:")
    for i, w in enumerate(windows):
        print(f"{i}: {w}")
    choice = int(input("Enter window number: "))
    return windows[choice]

def capture_window(window_title):
    window = gw.getWindowsWithTitle(window_title)[0]
    bbox = (window.left, window.top, window.width, window.height)
    with mss.mss() as sct:
        img = np.array(sct.grab(bbox))
        img = cv2.cvtColor(img, cv2.COLOR_BGRA2BGR)
        return img

src/detection.py
from ultralytics import YOLO

model = YOLO("models/yolov8n.pt")  # Placeholder model

def detect_cards(frame):
    results = model(frame)
    detections = []
    for r in results:
        for box in r.boxes:
            cls = int(box.cls)
            conf = float(box.conf)
            detections.append((model.names[cls], conf))
    return detections

src/elixir.py
import time
import json

with open("card_data.json") as f:
    CARD_DATA = json.load(f)

class ElixirTracker:
    def __init__(self):
        self.elixir = 5
        self.last_update = time.time()

    def update(self):
        now = time.time()
        elapsed = now - self.last_update
        gained = int(elapsed / 2.8)
        if gained > 0:
            self.elixir = min(10, self.elixir + gained)
            self.last_update = now

    def play_card(self, card_name):
        cost = CARD_DATA.get(card_name, 0)
        self.elixir = max(0, self.elixir - cost)

src/ui.py
from PyQt5 import QtWidgets, QtCore

class AssistantUI(QtWidgets.QWidget):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("CR Assistant")
        self.setWindowFlags(self.windowFlags() | QtCore.Qt.WindowStaysOnTopHint)
        self.resize(300, 200)

        self.label = QtWidgets.QLabel("Opponent Elixir: 5/10", self)
        self.layout = QtWidgets.QVBoxLayout()
        self.layout.addWidget(self.label)
        self.setLayout(self.layout)

    def update_elixir(self, elixir_value):
        self.label.setText(f"Opponent Elixir: {elixir_value}/10")

src/main.py
from capture import select_window, capture_window
from detection import detect_cards
from elixir import ElixirTracker
from ui import AssistantUI
from PyQt5 import QtWidgets
import sys
import cv2

def main():
    app = QtWidgets.QApplication(sys.argv)
    ui = AssistantUI()
    ui.show()

    tracker = ElixirTracker()
    window_title = select_window()

    while True:
        frame = capture_window(window_title)
        tracker.update()
        detections = detect_cards(frame)
        for card, conf in detections:
            tracker.play_card(card)
        ui.update_elixir(tracker.elixir)
        cv2.waitKey(1)

    sys.exit(app.exec_())

if __name__ == "__main__":
    main()