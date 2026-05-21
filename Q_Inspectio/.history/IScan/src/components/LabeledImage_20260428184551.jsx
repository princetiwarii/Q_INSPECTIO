import React, { useEffect, useRef } from "react";

const LabeledImage = ({ imageSrc, defects }) => {
  const canvasRef = useRef(null);

  console.log("✅ LabeledImage rendered");

  useEffect(() => {
    console.log("🔥 useEffect triggered", { imageSrc, defects });

    if (!imageSrc) {
      console.warn("⚠️ No imageSrc provided");
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) {
      console.error("❌ Canvas not found");
      return;
    }

    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = imageSrc;

    img.onload = () => {
      console.log("🖼️ Image loaded", img.width, img.height);

      const parent = canvas.parentElement;

      const maxWidth = parent.clientWidth;
      const maxHeight = parent.clientHeight;

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

      if (!defects || defects.length === 0) {
        console.warn("⚠️ No defects to draw");
        return;
      }

      console.log("📦 Defects received:", defects);

      const placedLabels = [];

      const getColor = (severity) => {
        if (severity === "High") return "red";
        if (severity === "Medium") return "orange";
        return "green";
      };

      const getSafeLabelPosition = (x, y, textWidth) => {
        let textX = x;
        let textY = y - 8;

        if (textY < 15) textY = y + 18;

        for (let i = 0; i < placedLabels.length; i++) {
          const prev = placedLabels[i];

          const overlapX =
            textX < prev.x + prev.width &&
            textX + textWidth > prev.x;

          const overlapY =
            textY < prev.y + 16 &&
            textY + 16 > prev.y;

          if (overlapX && overlapY) {
            textY = prev.y + 18;
          }
        }

        placedLabels.push({ x: textX, y: textY, width: textWidth });

        return { textX, textY };
      };

      defects.forEach((defect, index) => {
        if (!defect.box) {
          console.warn("⚠️ Missing box in defect:", defect);
          return;
        }

        let { x, y, width, height } = defect.box;

        console.log(`🔍 Raw box ${index}:`, defect.box);

        // 🔥 FIX: Convert percentage → pixels IF needed
        if (x <= 100 && y <= 100 && width <= 100 && height <= 100) {
          x = (x / 100) * img.width;
          y = (y / 100) * img.height;
          width = (width / 100) * img.width;
          height = (height / 100) * img.height;

          console.log(`✅ Converted % → px ${index}`, { x, y, width, height });
        }

        // SCALE TO CANVAS
        x = x * scale + offsetX;
        y = y * scale + offsetY;
        width = width * scale;
        height = height * scale;

        const color = getColor(defect.severity);

        // DRAW BOX
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, width, height);

        // DEBUG DOT
        ctx.fillStyle = "blue";
        ctx.fillRect(x, y, 4, 4);

        // LABEL
        ctx.font = "12px Arial";
        const label = `${defect.type} (${defect.severity})`;
        const textWidth = ctx.measureText(label).width;

        const { textX, textY } = getSafeLabelPosition(
          x,
          y,
          textWidth
        );

        ctx.fillStyle = color;
        ctx.fillRect(textX, textY - 14, textWidth + 8, 16);

        ctx.fillStyle = "white";
        ctx.fillText(label, textX + 4, textY - 2);
      });
    };

    img.onerror = () => {
      console.error("❌ Image failed to load");
    };

  }, [imageSrc, defects]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full rounded border"
    />
  );
};

export default LabeledImage;