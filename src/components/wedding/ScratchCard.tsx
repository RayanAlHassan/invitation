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
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [scratching, setScratching] = useState(false);
  const [completed, setCompleted] = useState(revealed);

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

    const drawCover = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      const ctx = canvas.getContext("2d");

      if (!ctx) return;

      ctx.scale(dpr, dpr);

      const gradient = ctx.createLinearGradient(
        0,
        0,
        rect.width,
        rect.height
      );

      gradient.addColorStop(0, "#c9aa82");
      gradient.addColorStop(0.45, "#ead8bd");
      gradient.addColorStop(1, "#b99167");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, rect.width, rect.height);

      /* subtle scratch texture */
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

      ctx.fillStyle = "rgba(255,255,255,.92)";
      ctx.textAlign = "center";

      ctx.font =
        '500 12px "Playfair Display", Georgia, serif';

      ctx.fillText(
        label.toUpperCase(),
        rect.width / 2,
        rect.height / 2 - 4
      );

      ctx.font = "20px Georgia";

      const text = label.toUpperCase();
      const spacing = 2;
      
      const widths = text
        .split("")
        .map((char) => ctx.measureText(char).width);
      
      const totalWidth =
        widths.reduce((sum, width) => sum + width, 0) +
        spacing * (text.length - 1);
      
      let currentX =
        rect.width / 2 - totalWidth / 2;
      
      text.split("").forEach((char, index) => {
        ctx.fillText(
          char,
          currentX + widths[index] / 2,
          rect.height / 2 - 4
        );
      
        currentX += widths[index] + spacing;
      });
    };

    drawCover();

    window.addEventListener("resize", drawCover);

    return () => {
      window.removeEventListener("resize", drawCover);
    };
  }, [completed, label]);

  const scratch = (
    event: PointerEvent<HTMLCanvasElement>
  ) => {
    if (!scratching || completed) return;

    const canvas = canvasRef.current;

    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();

    const scaleX =
      canvas.width / rect.width;

    const scaleY =
      canvas.height / rect.height;

    const x =
      (event.clientX - rect.left) * scaleX;

    const y =
      (event.clientY - rect.top) * scaleY;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    ctx.save();

    ctx.globalCompositeOperation =
      "destination-out";

    ctx.beginPath();

    ctx.arc(
      x,
      y,
      27 * scaleX,
      0,
      Math.PI * 2
    );

    ctx.fill();

    ctx.restore();

    checkScratchPercentage();
  };

  const checkScratchPercentage = () => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const imageData = ctx.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    );

    let transparent = 0;

    const pixels =
      imageData.data.length / 4;

    /*
     * Check every 16th pixel instead of every
     * single pixel for better mobile performance.
     */
    for (
      let i = 3;
      i < imageData.data.length;
      i += 64
    ) {
      if (imageData.data[i] < 50) {
        transparent++;
      }
    }

    const sampledPixels =
      pixels / 16;

    const percentage =
      (transparent / sampledPixels) * 100;

    if (percentage >= 38) {
      finishReveal();
    }
  };

  const finishReveal = () => {
    if (completed) return;

    setCompleted(true);
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
          completed ? "scratch-completed" : ""
        }`}
      >
        <div className="scratch-reveal">
          <span>{value}</span>
        </div>

        {!completed && (
          <canvas
            ref={canvasRef}
            className="scratch-canvas"
            onPointerDown={(event) => {
              event.currentTarget.setPointerCapture(
                event.pointerId
              );

              setScratching(true);

              scratch(event);
            }}
            onPointerMove={scratch}
            onPointerUp={() =>
              setScratching(false)
            }
            onPointerCancel={() =>
              setScratching(false)
            }
            onPointerLeave={() =>
              setScratching(false)
            }
          />
        )}
      </div>
    </div>
  );
}
