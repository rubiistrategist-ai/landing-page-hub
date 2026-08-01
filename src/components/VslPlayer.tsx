"use client";

import { useEffect, useRef, useState } from "react";
import { PlayCircle, Maximize, Minimize } from "lucide-react";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export default function VslPlayer({ videoId, onVideoEnd }: { videoId: string, onVideoEnd: () => void }) {
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const onVideoEndRef = useRef(onVideoEnd);
  
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    onVideoEndRef.current = onVideoEnd;
  }, [onVideoEnd]);

  // Carrega a API do YouTube e inicializa o player
  useEffect(() => {
    let isMounted = true;

    const createPlayer = () => {
      if (!isMounted || !playerContainerRef.current || playerRef.current) return;

      playerRef.current = new window.YT.Player(playerContainerRef.current, {
        videoId: videoId,
        playerVars: {
          controls: 0,
          modestbranding: 1,
          rel: 0,
          disablekb: 1,
          playsinline: 1,
          iv_load_policy: 3,
          fs: 0,
        },
        events: {
          onReady: (e: any) => {
            if (!isMounted) return;
            e.target.setPlaybackQuality("hd1080");
            setDuration(e.target.getDuration());
            setIsReady(true);
          },
          onStateChange: (e: any) => {
            if (!isMounted) return;
            if (e.data === window.YT.PlayerState.PLAYING) {
              setIsPlaying(true);
            } else if (e.data === 0) {
              onVideoEndRef.current();
            } else {
              setIsPlaying(false);
            }
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      if (!document.getElementById("youtube-iframe-api")) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        tag.id = "youtube-iframe-api";
        document.body.appendChild(tag);
      }
      window.onYouTubeIframeAPIReady = () => {
        createPlayer();
      };
    }

    return () => {
      isMounted = false;
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch (e) {
          console.error("Erro ao destruir player", e);
        }
        playerRef.current = null;
      }
    };
  }, [videoId]);

  // Lógica da barra de progresso (Rápida até 75% do vídeo, lenta no final)
  useEffect(() => {
    let interval: any;
    if (isPlaying && duration > 0) {
      interval = setInterval(() => {
        if (playerRef.current && playerRef.current.getCurrentTime) {
          const currentTime = playerRef.current.getCurrentTime();
          const realProgress = Math.min(currentTime / duration, 1);
          
          let fakeProgress;
          if (realProgress < 0.75) {
            const localProgress = realProgress / 0.75;
            fakeProgress = (1 - Math.pow(1 - localProgress, 2)) * 0.85;
          } else {
            const localProgress = (realProgress - 0.75) / 0.25;
            fakeProgress = 0.85 + (localProgress * 0.15);
          }
          
          setProgress(fakeProgress * 100);
        }
      }, 200);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  // Monitora tela cheia
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === containerRef.current);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const handlePlay = () => {
    if (playerRef.current && isReady) {
      playerRef.current.playVideo();
    }
  };

  const handleFullscreen = () => {
    if (containerRef.current) {
      if (!isFullscreen) {
        containerRef.current.requestFullscreen().catch((err) => {
          console.log("Erro ao tentar tela cheia:", err);
        });
      } else {
        document.exitFullscreen();
      }
    }
  };

  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-brand-green/20 to-brand-dark/20 blur-3xl rounded-full"></div>
      <div 
        ref={containerRef}
        className="relative bg-brand-dark rounded-2xl shadow-2xl overflow-hidden aspect-video border border-white/10 cursor-pointer"
        onClick={!isPlaying ? handlePlay : undefined}
      >
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none scale-[1.01]">
          <div ref={playerContainerRef} className="w-full h-full"></div>
        </div>

        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm transition-opacity duration-300 z-10">
            <button className="group/play relative z-10">
              <div className="absolute inset-0 bg-brand-green/30 blur-2xl rounded-full group-hover/play:bg-brand-green/50 transition-all"></div>
              <PlayCircle size={80} className="relative text-white drop-shadow-lg group-hover/play:scale-110 transition-transform" fill="rgba(55, 201, 107, 0.2)" />
            </button>
          </div>
        )}

        <button 
          onClick={handleFullscreen}
          className={`absolute bottom-4 right-4 z-30 text-white bg-black/60 hover:bg-black/90 p-2 rounded-lg transition-all pointer-events-auto ${
            isFullscreen ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
          title="Tela cheia"
        >
          {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
        </button>

        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/10 pointer-events-none z-20">
          <div 
            className="h-full bg-brand-green transition-all duration-200 ease-linear"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}