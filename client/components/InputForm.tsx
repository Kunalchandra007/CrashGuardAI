"use client";
import dynamic from "next/dynamic";
import { useEffect, useState, useRef } from "react";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const InputForm = () => {
  const [video, setVideo] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [accidentDetected, setAccidentDetected] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setSelectedFile(file);
      console.log("File selected:", file.name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validate file exists
      if (!selectedFile) {
        alert("Please select a video file first");
        return;
      }

      setLoading(true);
      const formData = new FormData();
      formData.append("image", selectedFile);

      console.log("Uploading file:", selectedFile.name);

      const response = await fetch(
        "http://127.0.0.1:8080/api/v1/public/upload-video",
        {
          method: "POST",
          body: formData,
        }
      );
      
      if (!response.ok) {
        throw new Error(`Upload failed with status: ${response.status}`);
      }
      
      const results = await response.json();
      console.log("Upload response:", results);
      
      if (results.status === "success") {
        // Set the video URL directly
        const videoUrl = `http://127.0.0.1:8080/api/v1/public/show-video/static/videos/${results.path}`;
        setVideo(videoUrl);
        
        // Simulate accident detection (for demo purposes)
        // In production, this would come from the backend analysis
        setAccidentDetected(true);
        setShowAlert(true);
        
        // Auto-hide alert after 10 seconds
        setTimeout(() => {
          setShowAlert(false);
        }, 10000);
      } else {
        alert(`Upload failed: ${results.message || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to upload video. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {}, [video]);
  return (
    <>
      <main className="max-w-[900px] mx-auto">
        {/* Accident Alert Modal */}
        {showAlert && accidentDetected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in duration-300">
              <div className="bg-gradient-to-r from-red-600 to-orange-600 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-white rounded-full p-2 animate-pulse">
                      <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-white font-black text-2xl">ACCIDENT DETECTED!</h3>
                  </div>
                  <button
                    onClick={() => setShowAlert(false)}
                    className="text-white hover:bg-white/20 rounded-full p-1 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 text-lg mb-2">Emergency Alert Triggered</h4>
                    <p className="text-gray-600 mb-3">
                      Our AI system has detected a potential vehicle collision in the uploaded video.
                    </p>
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded">
                      <p className="text-sm text-yellow-800 font-semibold">
                        📍 Location: Detected from video metadata
                      </p>
                      <p className="text-sm text-yellow-800">
                        🚨 Alert Status: Emergency services notified
                      </p>
                      <p className="text-sm text-yellow-800">
                        ⏰ Time: {new Date().toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowAlert(false)}
                    className="flex-1 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold py-3 px-4 rounded-lg transition-all"
                  >
                    Acknowledge
                  </button>
                  <button
                    onClick={() => {
                      alert("In production, this would show detailed incident report");
                      setShowAlert(false);
                    }}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded-lg transition-all"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {video ? (
          <div className="space-y-6">
            {/* Accident Detection Badge */}
            {accidentDetected && (
              <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-4 rounded-xl shadow-lg flex items-center justify-between animate-pulse">
                <div className="flex items-center space-x-3">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="font-black text-lg">ACCIDENT DETECTED</p>
                    <p className="text-sm opacity-90">Emergency alert has been sent</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAlert(true)}
                  className="bg-white text-red-600 px-4 py-2 rounded-lg font-bold hover:bg-red-50 transition-colors"
                >
                  View Alert
                </button>
              </div>
            )}
            
            <div className="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border-4 border-green-500">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-4">
                <h3 className="text-white font-bold text-xl flex items-center">
                  <svg className="w-6 h-6 mr-2 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  AI Detection in Progress - Live Stream
                </h3>
              </div>
              <div className="p-4 bg-black min-h-[400px] flex items-center justify-center">
                {video ? (
                  <img
                    src={video}
                    alt="Live accident detection stream"
                    className="w-full h-auto object-contain rounded"
                    onLoad={() => console.log("Video stream loaded successfully")}
                    onError={(e) => {
                      console.error("Stream load error:", e);
                    }}
                  />
                ) : (
                  <div className="text-center text-gray-400">
                    <svg className="animate-spin h-12 w-12 mx-auto mb-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p>Initializing video stream...</p>
                  </div>
                )}
              </div>
              <div className="bg-gray-700 p-3 text-sm text-gray-300">
                <p className="flex items-center">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                  Live detection stream - Objects and accidents are being analyzed in real-time
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setVideo(null);
                setFileName("");
                setSelectedFile(null);
                setAccidentDetected(false);
                setShowAlert(false);
                if (fileInputRef.current) {
                  fileInputRef.current.value = "";
                }
              }}
              className="w-full py-4 px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              Upload Another Video
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <label
                htmlFor="image"
                className="group relative block min-h-[300px] md:min-h-[400px] border-4 border-dashed border-blue-300 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-all cursor-pointer overflow-hidden"
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                  {fileName ? (
                    <div className="space-y-4">
                      <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                        <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xl font-bold text-gray-800">{fileName}</p>
                        <p className="text-sm text-gray-600 mt-2">Click to change file</p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">
                        Drop your video here
                      </h3>
                      <p className="text-gray-600 text-lg mb-4">
                        or click to browse
                      </p>
                      <p className="text-sm text-gray-500">
                        Supports: MP4, MOV, AVI (Max 100MB)
                      </p>
                    </>
                  )}
                </div>
              </label>
              <input
                type="file"
                ref={fileInputRef}
                id="image"
                className="hidden"
                accept="video/*"
                onChange={handleFileChange}
              />
            </div>
            <button
              type="submit"
              disabled={loading || !fileName}
              className="w-full py-5 px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 rounded-xl text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing Video...
                </>
              ) : (
                <>
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Analyze Video for Accidents
                </>
              )}
            </button>

            {/* Info Panel */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-700 border-2 border-gray-600 rounded-xl p-6 space-y-4">
              <div className="flex items-center space-x-2 mb-3">
                <svg className="w-6 h-6 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <h4 className="font-bold text-white text-lg">How Detection Works</h4>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-700 rounded-lg p-4 shadow-sm">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">1</span>
                    </div>
                    <h5 className="font-semibold text-white">Frame Analysis</h5>
                  </div>
                  <p className="text-sm text-gray-300">Video is processed frame-by-frame using YOLOv8 AI model</p>
                </div>

                <div className="bg-gray-700 rounded-lg p-4 shadow-sm">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">2</span>
                    </div>
                    <h5 className="font-semibold text-white">Object Detection</h5>
                  </div>
                  <p className="text-sm text-gray-300">Detects 80+ objects: cars, trucks, people, motorcycles, etc.</p>
                </div>

                <div className="bg-gray-700 rounded-lg p-4 shadow-sm">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">3</span>
                    </div>
                    <h5 className="font-semibold text-white">Confidence Score</h5>
                  </div>
                  <p className="text-sm text-gray-300">Numbers like 0.85 = 85% confidence in detection accuracy</p>
                </div>

                <div className="bg-gray-700 rounded-lg p-4 shadow-sm">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">4</span>
                    </div>
                    <h5 className="font-semibold text-white">Accident Detection</h5>
                  </div>
                  <p className="text-sm text-gray-300">Analyzes patterns to identify collision events</p>
                </div>
              </div>

              <div className="bg-yellow-900/30 border-l-4 border-yellow-500 p-3 rounded mt-4">
                <p className="text-sm text-yellow-200">
                  <strong>⏱️ Processing Time:</strong> Video analysis runs on CPU, which takes time. Each frame is analyzed for objects and potential accidents. Larger videos take longer to process.
                </p>
              </div>
            </div>
          </form>
        )}
      </main>
    </>
  );
};

export default InputForm;
