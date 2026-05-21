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
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      // Draw boxes
      defects?.forEach((defect) => {
        const { box, type } = defect;

        if (!box) return;

        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        ctx.strokeRect(box.x, box.y, box.width, box.height);

        ctx.fillStyle = "red";
        ctx.font = "14px Arial";
        ctx.fillText(type, box.x, box.y - 5);
      });
    };
  }, [imageSrc, defects]);

  return <canvas ref={canvasRef} className="w-full" />;
};

export default LabeledImage;