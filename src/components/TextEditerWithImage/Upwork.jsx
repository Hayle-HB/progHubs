import React, { useState, useEffect, useRef } from "react";
import * as fabric from "fabric";
import { IoArrowBack, IoTrash } from "react-icons/io5";
import { BsTextareaT, BsDownload, BsPlusCircle } from "react-icons/bs";
import { FiMove } from "react-icons/fi";
import { IoImageOutline } from "react-icons/io5";
import { MdOutlineQrCode2 } from "react-icons/md";
import { PiStickerDuotone } from "react-icons/pi";
import progHubs from "../../assets/progHubs.png";
const ImageTextEditor = () => {
  const canvasRef = useRef(null);
  const canvasWrapperRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [activeObject, setActiveObject] = useState(null);
  const [fontFamily, setFontFamily] = useState("Times New Roman");
  const [fontSize, setFontSize] = useState(24);
  const [fontColor, setFontColor] = useState("#000000");
  const [backgroundImages, setBackgroundImages] = useState([progHubs]);
  const [currentBgImage, setCurrentBgImage] = useState(progHubs);
  const [editMode, setEditMode] = useState("main"); // main, text, background, preview

  // Initialize canvas when component mounts
  useEffect(() => {
    if (canvasWrapperRef.current) {
      const canvasInstance = new fabric.Canvas(canvasRef.current, {
        width: canvasWrapperRef.current.offsetWidth,
        height: canvasWrapperRef.current.offsetWidth * 1.4, // 10:14 aspect ratio for invitation
        backgroundColor: "#ffffff",
      });

      setCanvas(canvasInstance);

      // Add background image
      fabric.Image.fromURL(currentBgImage, (img) => {
        img.scaleToWidth(canvasInstance.width);
        canvasInstance.setBackgroundImage(
          img,
          canvasInstance.renderAll.bind(canvasInstance)
        );
      });

      // Add default text elements
      addDefaultTextElements(canvasInstance);

      // Event listeners
      canvasInstance.on("selection:created", (e) => {
        setActiveObject(e.selected[0]);
      });

      canvasInstance.on("selection:updated", (e) => {
        setActiveObject(e.selected[0]);
      });

      canvasInstance.on("selection:cleared", () => {
        setActiveObject(null);
      });

      // Clean up
      return () => {
        canvasInstance.dispose();
      };
    }
  }, []);

  // Update canvas when background image changes
  useEffect(() => {
    if (canvas && currentBgImage) {
      fabric.Image.fromURL(currentBgImage, (img) => {
        img.scaleToWidth(canvas.width);
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
      });
    }
  }, [currentBgImage, canvas]);

  // Add default text elements for wedding invitation
  const addDefaultTextElements = (canvas) => {
    // Title text
    const titleText = new fabric.Textbox(
      "PLEASE JOIN US IN CELEBRATING THE\nWEDDING CEREMONY OF",
      {
        left: canvas.width / 2,
        top: canvas.height * 0.25,
        fontSize: 14,
        fontFamily: "Arial",
        fill: "#333333",
        textAlign: "center",
        originX: "center",
        width: canvas.width * 0.8,
      }
    );

    // Names text
    const namesText = new fabric.Textbox("HIMAKSH\n&\nSOUMYA", {
      left: canvas.width / 2,
      top: canvas.height * 0.4,
      fontSize: 28,
      fontFamily: "Arial",
      fontWeight: "bold",
      fill: "#000000",
      textAlign: "center",
      originX: "center",
      width: canvas.width * 0.8,
      lineHeight: 1.5,
    });

    // Date and time
    const dateText = new fabric.Textbox("DEC | 25 | 2024\nAT 12:30 PM", {
      left: canvas.width / 2,
      top: canvas.height * 0.6,
      fontSize: 16,
      fontFamily: "Arial",
      fill: "#333333",
      textAlign: "center",
      originX: "center",
      width: canvas.width * 0.8,
    });

    // Venue details
    const venueText = new fabric.Textbox(
      "PALACE FUNCTION HALL, 4TH CROSS\nROAD, CMR LAYOUT, OPP. LOTUS\nGARDEN 123456",
      {
        left: canvas.width / 2,
        top: canvas.height * 0.75,
        fontSize: 12,
        fontFamily: "Arial",
        fill: "#333333",
        textAlign: "center",
        originX: "center",
        width: canvas.width * 0.8,
      }
    );

    canvas.add(titleText, namesText, dateText, venueText);
    canvas.renderAll();
  };

  // Functions for editing text
  const updateTextProperty = (property, value) => {
    if (activeObject && activeObject.type.includes("text")) {
      activeObject.set(property, value);
      canvas.renderAll();
    }
  };

  const handleFontChange = (e) => {
    const newFont = e.target.value;
    setFontFamily(newFont);
    updateTextProperty("fontFamily", newFont);
  };

  const handleFontSizeChange = (e) => {
    const newSize = parseInt(e.target.value);
    setFontSize(newSize);
    updateTextProperty("fontSize", newSize);
  };

  const handleColorChange = (e) => {
    const newColor = e.target.value;
    setFontColor(newColor);
    updateTextProperty("fill", newColor);
  };

  const handleBackgroundChange = (imagePath) => {
    setCurrentBgImage(imagePath);
  };

  const handleDeleteObject = () => {
    if (activeObject) {
      canvas.remove(activeObject);
      setActiveObject(null);
    }
  };

  const handleAddText = () => {
    const newText = new fabric.Textbox("Add your text here", {
      left: canvas.width / 2,
      top: canvas.height / 2,
      fontSize: 20,
      fontFamily: fontFamily,
      fill: fontColor,
      textAlign: "center",
      originX: "center",
      width: 200,
    });

    canvas.add(newText);
    canvas.setActiveObject(newText);
    canvas.renderAll();
    setActiveObject(newText);
    setEditMode("text");
  };

  const handleDownload = (type = "free") => {
    // For demo purposes, free and paid versions do the same thing
    const dataURL = canvas.toDataURL({
      format: "jpeg",
      quality: 0.8,
    });

    const link = document.createElement("a");
    link.href = dataURL;
    link.download = `wedding-invitation-${new Date().getTime()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // For PDF generation, you would typically use jsPDF or a similar library
    if (type === "paid") {
      // Handle PDF generation or high-res image
      alert("Premium download - would generate high-res images and PDF");
    }
  };

  // Render different UI based on edit mode
  const renderEditControls = () => {
    switch (editMode) {
      case "text":
        return (
          <div className="flex flex-col gap-4 p-4 bg-white border-t border-gray-200">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Font:</label>
              <select
                value={fontFamily}
                onChange={handleFontChange}
                className="border rounded px-2 py-1 w-40"
              >
                <option value="Arial">Arial</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Courier New">Courier New</option>
                <option value="Georgia">Georgia</option>
                <option value="Verdana">Verdana</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Size:</label>
              <input
                type="range"
                min="8"
                max="72"
                value={fontSize}
                onChange={handleFontSizeChange}
                className="w-40"
              />
              <span className="text-sm">{fontSize}px</span>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Color:</label>
              <input
                type="color"
                value={fontColor}
                onChange={handleColorChange}
                className="w-10 h-10 border"
              />
            </div>
          </div>
        );

      case "background":
        return (
          <div className="grid grid-cols-3 gap-2 p-4 bg-white border-t border-gray-200">
            {backgroundImages.map((img, idx) => (
              <div
                key={idx}
                className={`border-2 ${
                  currentBgImage === img ? "border-blue-500" : "border-gray-200"
                }`}
                onClick={() => handleBackgroundChange(img)}
              >
                <img
                  src={img}
                  alt={`Template ${idx + 1}`}
                  className="w-full h-auto"
                />
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Top Navigation */}
      <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
        <button
          onClick={() => setEditMode("main")}
          className="flex items-center text-blue-500"
        >
          <IoArrowBack className="mr-1" /> Back
        </button>

        <div className="flex space-x-4">
          <button
            onClick={() => setEditMode("text")}
            className={`px-3 py-1 ${
              editMode === "text"
                ? "text-blue-500 border-b-2 border-blue-500"
                : ""
            }`}
          >
            Edit
          </button>

          <div className="relative">
            <button
              className={`px-3 py-1 flex items-center ${
                editMode === "font"
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : ""
              }`}
            >
              Font <span className="ml-1">▼</span>
            </button>
          </div>

          <button className="px-3 py-1">Size</button>

          <button className="px-3 py-1">Box Size</button>

          <button
            onClick={handleDeleteObject}
            className="px-3 py-1 text-red-500"
            disabled={!activeObject}
          >
            Delete
          </button>
        </div>
      </div>

      {/* Canvas Area */}
      <div
        className="flex-1 flex justify-center items-center p-4 overflow-auto bg-gray-200"
        ref={canvasWrapperRef}
      >
        <canvas ref={canvasRef} className="border shadow-lg" />
      </div>

      {/* Editing Controls */}
      {renderEditControls()}

      {/* Bottom Tool Bar */}
      <div className="flex justify-around items-center p-4 bg-white border-t border-gray-200">
        <button
          onClick={() => setEditMode("background")}
          className="flex flex-col items-center text-gray-700"
        >
          <IoImageOutline className="text-2xl" />
          <span className="text-xs mt-1">Photo</span>
        </button>

        <button className="flex flex-col items-center text-gray-700">
          <PiStickerDuotone className="text-2xl" />
          <span className="text-xs mt-1">Sticker</span>
        </button>

        <button
          onClick={handleAddText}
          className="flex flex-col items-center text-gray-700"
        >
          <BsPlusCircle className="text-3xl text-orange-500" />
          <span className="text-xs mt-1">Add Text</span>
        </button>

        <button className="flex flex-col items-center text-gray-700">
          <MdOutlineQrCode2 className="text-2xl" />
          <span className="text-xs mt-1">QR Map</span>
        </button>

        <button
          onClick={() => handleDownload("free")}
          className="flex flex-col items-center text-gray-700"
        >
          <BsDownload className="text-2xl" />
          <span className="text-xs mt-1">Download</span>
        </button>
      </div>
    </div>
  );
};

export default ImageTextEditor;
