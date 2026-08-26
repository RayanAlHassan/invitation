import {
  PointerEvent,
  useEffect,
  useRef,
  useState,
} from "react";

interface Props {
  label: string;
  value: string;
  onReveal: () => void;
  revealed: boolean;
}

export default function ScratchCard({
  label,
  value,
  onReveal,
  revealed,
}: Props) {
  const canvasRef =
    useRef<HTMLCanvasElement | null>(null);

  const containerRef =
    useRef<HTMLDivElement | null>(null);

  const lastPointRef =
    useRef<{ x: number; y: number } | null>(null);

  const [scratching, setScratching] =
    useState(false);

  const [completed, setCompleted] =
    useState(revealed);

  useEffect(() => {
    if (revealed) {
      setCompleted(true);
    }
  }, [revealed]);

  useEffect(() => {
    if (completed) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!canvas || !container) return;

    const drawSpacedText = (
      ctx: CanvasRenderingContext2D,
      text: string,
      centerX: number,
      y: number,
      spacing: number
    ) => {
      const chars = text.split("");

      const widths = chars.map((char) =>
        ctx.measureText(char).width
      );

      const totalWidth =
        widths.reduce(
          (sum, width) => sum + width,
          0
        ) +
        spacing * Math.max(chars.length - 1, 0);

      let x =
        centerX - totalWidth / 2;

      chars.forEach((char, index) => {
        ctx.fillText(
          char,
          x + widths[index] / 2,
          y
        );

        x += widths[index] + spacing;
      });
    };

    const drawCover = () => {
      const rect =
        container.getBoundingClientRect();

      const dpr =
        window.devicePixelRatio || 1;

      canvas.width =
        Math.round(rect.width * dpr);

      canvas.height =
        Math.round(rect.height * dpr);

      canvas.style.width =
        `${rect.width}px`;

      canvas.style.height =
        `${rect.height}px`;

      const ctx =
        canvas.getContext("2d");

      if (!ctx) return;

      /*
       * Work in CSS pixels.
       * This keeps drawing consistent on
       * normal and Retina displays.
       */
      ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
      );

      /* Metallic scratch layer */
      const gradient =
        ctx.createLinearGradient(
          0,
          0,
          rect.width,
          rect.height
        );

      gradient.addColorStop(
        0,
        "#c9aa82"
      );

      gradient.addColorStop(
        0.45,
        "#ead8bd"
      );

      gradient.addColorStop(
        1,
        "#b99167"
      );

      ctx.fillStyle = gradient;

      ctx.fillRect(
        0,
        0,
        rect.width,
        rect.height
      );

      /* subtle texture */
      for (let i = 0; i < 70; i++) {
        ctx.fillStyle =
          i % 2 === 0
            ? "rgba(255,255,255,.10)"
            : "rgba(101,72,55,.06)";

        ctx.beginPath();

        ctx.arc(
          Math.random() * rect.width,
          Math.random() * rect.height,
          Math.random() * 2 + 0.5,
          0,
          Math.PI * 2
        );

        ctx.fill();
      }

      /* Label */
      ctx.fillStyle =
        "rgba(255,255,255,.92)";

      ctx.textAlign = "center";

      ctx.font =
        '500 12px "Playfair Display", Georgia, serif';

      drawSpacedText(
        ctx,
        label.toUpperCase(),
        rect.width / 2,
        rect.height / 2 - 4,
        2
      );

      /* Ornament */
      ctx.font =
        "20px Georgia";

      ctx.fillText(
        "✦",
        rect.width / 2,
        rect.height / 2 + 27
      );
    };

    drawCover();

    window.addEventListener(
      "resize",
      drawCover
    );

    return () => {
      window.removeEventListener(
        "resize",
        drawCover
      );
    };
  }, [completed, label]);

  const getPoint = (
    event: PointerEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current;

    if (!canvas) return null;

    const rect =
      canvas.getBoundingClientRect();

    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  const eraseBetweenPoints = (
    from: { x: number; y: number },
    to: { x: number; y: number }
  ) => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx =
      canvas.getContext("2d");

    if (!ctx) return;

    ctx.save();

    ctx.globalCompositeOperation =
      "destination-out";

    /*
     * Continuous scratch stroke.
     * This allows horizontal, vertical,
     * diagonal and curved scratching.
     */
    ctx.lineWidth = 32;

    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.beginPath();

    ctx.moveTo(
      from.x,
      from.y
    );

    ctx.lineTo(
      to.x,
      to.y
    );

    ctx.stroke();

    /*
     * Also erase a round point at the end
     * so taps and very short movements work.
     */
    ctx.beginPath();

    ctx.arc(
      to.x,
      to.y,
      16,
      0,
      Math.PI * 2
    );

    ctx.fill();

    ctx.restore();
  };

  const scratch = (
    event: PointerEvent<HTMLCanvasElement>
  ) => {
    if (!scratching || completed) return;

    const point =
      getPoint(event);

    if (!point) return;

    const previous =
      lastPointRef.current || point;

    eraseBetweenPoints(
      previous,
      point
    );

    lastPointRef.current =
      point;

    checkScratchPercentage();
  };

  const startScratch = (
    event: PointerEvent<HTMLCanvasElement>
  ) => {
    if (completed) return;

    event.preventDefault();

    event.currentTarget.setPointerCapture(
      event.pointerId
    );

    const point =
      getPoint(event);

    if (!point) return;

    setScratching(true);

    lastPointRef.current =
      point;

    /*
     * Make the initial touch scratch too,
     * instead of requiring movement first.
     */
    eraseBetweenPoints(
      point,
      point
    );
  };

  const stopScratch = () => {
    setScratching(false);

    lastPointRef.current =
      null;

    checkScratchPercentage();
  };

  const checkScratchPercentage = () => {
    const canvas =
      canvasRef.current;

    if (!canvas) return;

    const ctx =
      canvas.getContext("2d");

    if (!ctx) return;

    const imageData =
      ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      );

    let transparent = 0;
    let sampled = 0;

    /*
     * Sample pixels instead of checking
     * every pixel for better performance.
     */
    for (
      let i = 3;
      i < imageData.data.length;
      i += 64
    ) {
      sampled++;

      if (imageData.data[i] < 50) {
        transparent++;
      }
    }

    if (sampled === 0) return;

    const percentage =
      (transparent / sampled) * 100;

    if (percentage >= 38) {
      finishReveal();
    }
  };

  const finishReveal = () => {
    if (completed) return;

    setCompleted(true);
    setScratching(false);

    lastPointRef.current = null;

    onReveal();
  };

  return (
    <div className="scratch-card-wrapper">
      <span className="scratch-label">
        {label}
      </span>

      <div
        ref={containerRef}
        className={`scratch-card ${
          completed
            ? "scratch-completed"
            : ""
        }`}
      >
        <div className="scratch-reveal">
          <span>{value}</span>
        </div>

        {!completed && (
          <canvas
            ref={canvasRef}
            className="scratch-canvas"
            onPointerDown={startScratch}
            onPointerMove={scratch}
            onPointerUp={stopScratch}
            onPointerCancel={stopScratch}
          />
        )}
      </div>
    </div>
  );
}
