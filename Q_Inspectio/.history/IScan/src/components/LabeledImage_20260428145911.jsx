import React, { useEffect, useRef } from "react";

const LabeledImage = ({ imageSrc, defects }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!imageSrc) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.src = imageSrc;

    img.onload = () => {

      const parent = canvas.parentElement;

const maxWidth = parent.clientWidth;
const maxHeight = parent.clientHeight;

// scale to fit inside container (like object-contain)
const scale = Math.min(
  maxWidth / img.width,
  maxHeight / img.height
);

const drawWidth = img.width * scale;
const drawHeight = img.height * scale;

// center image
const offsetX = (maxWidth - drawWidth) / 2;
const offsetY = (maxHeight - drawHeight) / 2;

canvas.width = maxWidth;
canvas.height = maxHeight;

ctx.clearRect(0, 0, canvas.width, canvas.height);

// draw image centered
ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

      const labelPositions = [];

      const getColor = (severity) => {
        if (severity === "High") return "red";
        if (severity === "Medium") return "orange";
        return "green";
      };

      defects?.forEach((defect, index) => {
        if (!defect.box) return;

        let { x, y, width, height } = defect.box;

        // SCALE FIX
       x = x * scale + offsetX;
y = y * scale + offsetY;
width *= scale;
height *= scale;
        // SIZE CORRECTION (avoid tiny or huge boxes)
        width = Math.max(30, Math.min(width, canvas.width - x));
        height = Math.max(30, Math.min(height, canvas.height - y));

        // BOUNDARY FIX
        x = Math.max(0, Math.min(x, canvas.width - width));
        y = Math.max(0, Math.min(y, canvas.height - height));

        const color = getColor(defect.severity);

        // DRAW BOX
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, width, height);

        // TEXT SETTINGS
        ctx.font = "12px Arial";
        const label = `${defect.type} (${defect.severity})`;
        const textWidth = ctx.measureText(label).width;

        let textX = x;
        let textY = y - 5;

        // 🔥 PREVENT TEXT OVERLAP
        labelPositions.forEach((pos) => {
          if (
            Math.abs(pos.x - textX) < 50 &&
            Math.abs(pos.y - textY) < 20
          ) {
            textY += 20; // shift down
          }
        });

        // Prevent going outside top
        if (textY < 15) textY = y + 15;

        labelPositions.push({ x: textX, y: textY });

        // DRAW LABEL BG
        ctx.fillStyle = color;
        ctx.fillRect(textX, textY - 14, textWidth + 8, 16);

        // DRAW TEXT
        ctx.fillStyle = "white";
        ctx.fillText(label, textX + 4, textY - 2);
      });
    };
  }, [imageSrc, defects]);
  console.log("DEFECTS:", defects);

  return <canvas
  ref={canvasRef}
  className="w-full h-full rounded"
/>;
};

export default LabeledImage;