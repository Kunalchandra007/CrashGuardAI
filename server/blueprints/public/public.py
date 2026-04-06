import json
from flask import Blueprint, Response, jsonify,request, current_app
from flask_cors import cross_origin
from modules.detect_object_on_video import detect_object_on_video
from PIL import Image
import os
import sys
from pathlib import Path
from ultralytics import YOLO
from werkzeug.utils import secure_filename
import cv2
from datetime import datetime

# PUBLIC BLUEPRINT...
public_bp = Blueprint('public',__name__, url_prefix='/api/v1/public')

# DETECT OBJECT ON IMAGE
def detect_object_on_image(image_file):
    # model = YOLO('./models/yolov8n.pt')
    model = YOLO('./models/i1-yolov8s.pt')
    results = model.predict(image_file)
    result = results[0]
    output = []
    for box in result.boxes:
        x1,y1,x2,y2 = [
            round(x) for x in box.xyxy[0].tolist()
        ]
        class_id = box.cls[0].item()
        prob = round(box.conf[0].item(),2)
        output.append([
            x1,y1,x2,y2,result.names[class_id],prob
        ])
    return output

# Store current frame globally for streaming
_current_frame = None
_frame_lock = None

# GENERATE FRAMES
def generate_frames(path_x = '', quality=80):
    """
    Generate MJPEG frames with optimized compression
    quality: JPEG compression level 1-100 (lower = faster but worse quality)
    """
    global _current_frame
    yolo_output = detect_object_on_video(path_x, frame_skip=2, scale_factor=0.75)
    for detection_ in yolo_output:
        # Encode with lower quality for faster streaming
        ref, buffer = cv2.imencode('.jpg', detection_, [cv2.IMWRITE_JPEG_QUALITY, quality])
        _current_frame = buffer.tobytes()
        frame = _current_frame
        yield (b'--frame\r\n'
                    b'Content-Type: image/jpeg\r\n'
                    b'Content-length: ' + str(len(frame)).encode() + b'\r\n\r\n' + frame + b'\r\n')
        
# ROUTES FOR HOME...
@public_bp.route('/',methods=['GET'])
def return_home():
    return jsonify({
        "message": "Welcome to home api page."
    })

# ROUTES FOR APPLY MODEL...
@public_bp.route('/apply-model', methods=['POST'])
def detect_object():
    try:
        image_file = request.files['image']
        boxes = detect_object_on_image(Image.open(image_file.stream))
        return Response(
            json.dumps(boxes),
            mimetype='application/json'
        )
    except Exception as e:
        return jsonify({
            "status": 'error',
            'message': str(e)
        })

# ROUTES FOR UPLOAD VIDEO...
@public_bp.route('/upload-video', methods=['POST'])
def api_video():
    print('🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥')
    print(f"Request method: {request.method}")
    print(f"Request files: {request.files}")
    print(f"Request form: {request.form}")
    
    try:
        # Check if file is in request
        if 'image' not in request.files:
            return jsonify({
                "status": "error",
                "message": "No file uploaded. Please select a video file."
            }), 400
        
        video_file = request.files['image']
        
        # Check if file is empty
        if video_file.filename == '':
            return jsonify({
                "status": "error",
                "message": "No file selected"
            }), 400
        
        original_filename = secure_filename(video_file.filename)
        
        # Add timestamp to make filename unique and avoid file locking issues
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        name, ext = os.path.splitext(original_filename)
        filename = f"{name}_{timestamp}{ext}"
        
        # Get server directory and construct absolute path
        server_dir = Path(__file__).parent.parent.parent
        upload_dir = server_dir / 'static' / 'videos'
        upload_dir.mkdir(parents=True, exist_ok=True)
        
        filepath = upload_dir / filename
        
        # Save the file with unique name
        video_file.save(str(filepath))
        print(f"✅ File saved successfully: {filepath}")
        
        return jsonify({
            "status": "success",
            "path": filename
        })
            
    except Exception as e:
        print(f"❌ Upload error: {e}")
        import traceback
        traceback.print_exc()
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500
    
# ROUTES FOR SHOW VIDEO...
@public_bp.route('/show-video/static/videos/<path>', methods=['GET'])
@cross_origin(origins=["http://localhost:3000"], supports_credentials=True)
def show_video(path):
    print('🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥')
    
    # Get server directory and construct absolute path
    server_dir = Path(__file__).parent.parent.parent
    final_path = server_dir / 'static' / 'videos' / path
    
    if not final_path.exists():
        return jsonify({"status": "error", "message": "Video file not found"}), 404
    
    return Response(generate_frames(path_x=str(final_path)), mimetype='multipart/x-mixed-replace; boundary=frame')
    
# ROUTES FOR WEBCAM...
@public_bp.route('/webcam', methods=['GET'])
def api_webcam():
    return Response(generate_frames(path_x=0), mimetype='multipart/x-mixed-replace; boundary=frame')

# Store for frame generation state
_frame_generators = {}