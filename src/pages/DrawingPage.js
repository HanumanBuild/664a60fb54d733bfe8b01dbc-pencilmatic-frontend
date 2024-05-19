import React, { useState, useEffect } from 'react';
import { fabric } from 'fabric';
import axios from 'axios';

const DrawingPage = () => {
  const [canvas, setCanvas] = useState(null);

  useEffect(() => {
    const initCanvas = () => (
      new fabric.Canvas('canvas', {
        height: 800,
        width: 800,
        backgroundColor: 'white'
      })
    );
    setCanvas(initCanvas());
  }, []);

  const saveDrawing = async () => {
    const drawingData = JSON.stringify(canvas.toJSON());
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${process.env.REACT_APP_PENCILMATIC_BACKEND_URL}/api/drawings/save`, { drawingData }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('Drawing saved successfully!');
    } catch (error) {
      console.error('Error saving drawing', error);
    }
  };

  const loadDrawings = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${process.env.REACT_APP_PENCILMATIC_BACKEND_URL}/api/drawings/retrieve`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.data.length > 0) {
        const lastDrawing = response.data[response.data.length - 1];
        canvas.loadFromJSON(lastDrawing.drawingData, () => {
          canvas.renderAll();
        });
      }
    } catch (error) {
      console.error('Error loading drawings', error);
    }
  };

  useEffect(() => {
    if (canvas) {
      loadDrawings();
    }
  }, [canvas]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Pencilmatic Drawing App</h1>
      <canvas id="canvas" className="border border-gray-300"></canvas>
      <button onClick={saveDrawing} className="mt-4 bg-blue-500 text-white p-2 rounded">Save Drawing</button>
    </div>
  );
};

export default DrawingPage;