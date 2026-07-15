import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  color: string;
  isLeftColor: boolean;
}

interface BurstNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  color: string;
  alpha: number;
}

export default function NetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let burstNodes: BurstNode[] = [];
    let mouse = { x: -9999, y: -9999 };
    let raf = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = width * devicePixelRatio;
      canvas.height = height * devicePixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(devicePixelRatio, devicePixelRatio);

      const count = Math.min(80, Math.floor((width * height) / 12000));
      const colors = ["#4285F4", "#EA4335", "#FBBC05", "#34A853"];
      nodes = Array.from({ length: count }, () => {
        const color = colors[Math.floor(Math.random() * colors.length)];
        const isLeftColor = color === "#4285F4" || color === "#EA4335";
        const xVal = isLeftColor 
          ? Math.random() * (width * 0.4) 
          : width * 0.6 + Math.random() * (width * 0.4);

        return {
          x: xVal,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          r: Math.random() * 2 + 1.2,
          color,
          isLeftColor,
        };
      });
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      
      const colors = ["#4285F4", "#EA4335", "#FBBC05", "#34A853"];
      for (let k = 0; k < 12; k++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2 + 1;
        burstNodes.push({
          x: clickX,
          y: clickY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          r: Math.random() * 2.5 + 1.5,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1.0,
        });
      }
    };

    const hexToRgb = (hex: string) => {
      const clean = hex.replace("#", "");
      const bigint = parseInt(clean.length === 3
        ? clean.split("").map((c) => c + c).join("")
        : clean, 16);
      return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 };
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const isLight = document.documentElement.classList.contains("light");
      
      // Connection line colors
      const lineStyle = isLight ? "rgba(229, 231, 235, 0.5)" : "rgba(31, 41, 55, 0.4)";
      const cursorLineColor = "#4285F4";
      const cursorLineRgb = hexToRgb(cursorLineColor);
      const maxDist = 130;

      // Update base nodes position
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        if (!prefersReduced) {
          n.x += n.vx;
          n.y += n.vy;

          // Stay within respective side boundaries (leaves center clean)
          if (n.isLeftColor) {
            if (n.x < 0 || n.x > width * 0.45) {
              n.vx *= -1;
              n.x = Math.max(0, Math.min(n.x, width * 0.45));
            }
          } else {
            if (n.x < width * 0.55 || n.x > width) {
              n.vx *= -1;
              n.x = Math.max(width * 0.55, Math.min(n.x, width));
            }
          }

          if (n.y < 0 || n.y > height) {
            n.vy *= -1;
            n.y = Math.max(0, Math.min(n.y, height));
          }
        }
      }

      // Draw connection lines
      ctx.strokeStyle = lineStyle;
      ctx.lineWidth = 0.5;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          // Only connect if they belong to the same side cluster
          if (a.isLeftColor !== b.isLeftColor) continue;
          
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }

        // Mouse hover interaction
        const dxm = nodes[i].x - mouse.x;
        const dym = nodes[i].y - mouse.y;
        const dm = Math.sqrt(dxm * dxm + dym * dym);
        if (dm < 150) {
          const opacity = (1 - dm / 150) * 0.4;
          ctx.strokeStyle = `rgba(${cursorLineRgb.r}, ${cursorLineRgb.g}, ${cursorLineRgb.b}, ${opacity})`;
          ctx.lineWidth = 0.7;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      // Draw base nodes
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.globalAlpha = isLight ? 0.6 : 0.55;
        ctx.fill();
      }
      ctx.globalAlpha = 1.0;

      // Draw burst nodes
      for (let k = burstNodes.length - 1; k >= 0; k--) {
        const b = burstNodes[k];
        b.x += b.vx;
        b.y += b.vy;
        b.alpha -= 0.015;
        b.r *= 0.98;
        if (b.alpha <= 0) {
          burstNodes.splice(k, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = b.color;
        ctx.globalAlpha = b.alpha;
        ctx.fill();
      }
      ctx.globalAlpha = 1.0;

      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);
    canvas.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      canvas.removeEventListener("click", onClick);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
}