from ultralytics import YOLO
import cv2
import math
import cvzone
import os

# Global model cache to avoid reloading
_model = None

def get_model():
    global _model
    if _model is None:
        print("Loading YOLOv8n model...")
        _model = YOLO('./models/yolov8n.pt')
        _model.to('cpu')  # Ensure CPU (change to 'cuda' if GPU available)
    return _model

def detect_object_on_video(video_path, frame_skip=2, scale_factor=0.5):
    """
    Detect objects in video with optimization:
    - frame_skip: Process every Nth frame (2 = process 50% of frames)
    - scale_factor: Resize frames before detection (0.5 = half resolution = 4x faster)
    """
    video_capture = video_path
    cap = cv2.VideoCapture(video_capture)
    frame_width = int(cap.get(3))
    frame_height = int(cap.get(4))
    
    # Resize dimensions for faster processing
    new_width = int(frame_width * scale_factor)
    new_height = int(frame_height * scale_factor)

    model = get_model()
    classNames = ["person", "bicycle", "car", "motorbike", "aeroplane", "bus", "train", "truck", "boat",
                  "traffic light", "fire hydrant", "stop sign", "parking meter", "bench", "bird", "cat",
                  "dog", "horse", "sheep", "cow", "elephant", "bear", "zebra", "giraffe", "backpack", "umbrella",
                  "handbag", "tie", "suitcase", "frisbee", "skis", "snowboard", "sports ball", "kite", "baseball bat",
                  "baseball glove", "skateboard", "surfboard", "tennis racket", "bottle", "wine glass", "cup",
                  "fork", "knife", "spoon", "bowl", "banana", "apple", "sandwich", "orange", "broccoli",
                  "carrot", "hot dog", "pizza", "donut", "cake", "chair", "sofa", "pottedplant", "bed",
                  "diningtable", "toilet", "tvmonitor", "laptop", "mouse", "remote", "keyboard", "cell phone",
                  "microwave", "oven", "toaster", "sink", "refrigerator", "book", "clock", "vase", "scissors",
                  "teddy bear", "hair drier", "toothbrush"
                  ]
    
    frame_count = 0
    last_results = None
    
    while True:
        success, img = cap.read()
        if not success:
            break
        
        frame_count += 1
        
        # Skip frames for faster processing
        if frame_count % frame_skip != 0:
            # Use last detection results for skipped frames
            if last_results is not None:
                # Draw the last detections on the frame
                for r in last_results:
                    boxes = r.boxes
                    for box in boxes:
                        x1, y1, x2, y2 = box.xyxy[0]
                        x1, y1, x2, y2 = int(x1 * scale_factor), int(y1 * scale_factor), int(x2 * scale_factor), int(y2 * scale_factor)
                        w, h = x2 - x1, y2 - y1
                        conf = math.ceil((box.conf[0] * 100)) / 100
                        cls = int(box.cls[0])
                        label = classNames[cls].upper()
                        cvzone.cornerRect(img, (x1, y1, w, h))
                        cvzone.putTextRect(img, f'{label} {conf}', (max(0, x1), max(35, y1)), colorR=(0,165,255))
            yield img
            continue
        
        # Resize frame for faster inference
        img_resized = cv2.resize(img, (new_width, new_height))
        
        # Run detection on resized frame
        results = model(img_resized, conf=0.5, verbose=False)
        last_results = results
        
        # Draw results on original frame (scale box coordinates back)
        for r in results:
            boxes = r.boxes
            for box in boxes:
                x1, y1, x2, y2 = box.xyxy[0]
                # Scale back to original dimensions
                x1, y1, x2, y2 = int(x1 / scale_factor), int(y1 / scale_factor), int(x2 / scale_factor), int(y2 / scale_factor)
                w, h = x2 - x1, y2 - y1

                conf = math.ceil((box.conf[0] * 100)) / 100
                cls = int(box.cls[0])
                label = classNames[cls].upper()
                cvzone.cornerRect(img, (x1, y1, w, h))
                cvzone.putTextRect(img, f'{label} {conf}', (max(0, x1), max(35, y1)), colorR=(0,165,255))
        
        yield img

cv2.destroyAllWindows()