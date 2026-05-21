import React, { useEffect, useRef } from "react";

const LabeledImage = ({ imageSrc, defects }) => {
  const canvasRef = useRef(null);
  console.log("labledImg");
  
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

      // SCALE IMAGE (object-contain behavior)
      const scale = Math.min(
        maxWidth / img.width,
        maxHeight / img.height
      );

      const drawWidth = img.width * scale;
      const drawHeight = img.height * scale;

      const offsetX = (maxWidth - drawWidth) / 2;
      const offsetY = (maxHeight - drawHeight) / 2;

      canvas.width = maxWidth;
      canvas.height = maxHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // DRAW IMAGE
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

      // 🔥 SMART LABEL HANDLING
      const placedLabels = [];

      const getColor = (severity) => {
        if (severity === "High") return "red";
        if (severity === "Medium") return "orange";
        return "green";
      };

      const getSafeLabelPosition = (x, y, textWidth) => {
        let textX = x;
        let textY = y - 8;

        // If too close to top → move below box
        if (textY < 15) textY = y + 18;

        // Avoid overlap with previous labels
        for (let i = 0; i < placedLabels.length; i++) {
          const prev = placedLabels[i];

          const overlapX =
            textX < prev.x + prev.width &&
            textX + textWidth > prev.x;

          const overlapY =
            textY < prev.y + 16 &&
            textY + 16 > prev.y;

          if (overlapX && overlapY) {
            textY = prev.y + 18; // push down
          }
        }

        placedLabels.push({ x: textX, y: textY, width: textWidth });

        return { textX, textY };
      };
      
      console.log("defects data: ", defects);
      defects?.forEach((defect) => {
        if (!defect.box) return;

        let { x, y, width, height } = defect.box;

      // 🔥 STEP 1: Convert % → actual image pixels
x = (x / 100) * img.width;
y = (y / 100) * img.height;
width = (width / 100) * img.width;
height = (height / 100) * img.height;

// 🔥 STEP 2: Apply canvas scaling + offset
x = x * scale + offsetX;
y = y * scale + offsetY;
width = width * scale;
height = height * scale;

        const color = getColor(defect.severity);

        // DRAW BOX
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.9;
        ctx.strokeRect(x, y, width, height);
        ctx.globalAlpha = 1;

        // TEXT
        ctx.font = "12px Arial";
        const label = `${defect.type} (${defect.severity})`;
        const textWidth = ctx.measureText(label).width;

        const { textX, textY } = getSafeLabelPosition(
          x,
          y,
          textWidth
        );

        // BACKGROUND
        ctx.fillStyle = color;
        ctx.fillRect(textX, textY - 14, textWidth + 8, 16);

        // TEXT
        ctx.fillStyle = "white";
        ctx.fillText(label, textX + 4, textY - 2);
      });
    };
  }, [imageSrc, defects]);
  useEffect(() => {
  console.log("useEffect triggered", imageSrc, defects);
}, [imageSrc, defects]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full rounded"
    />
  );
};

export default LabeledImage;