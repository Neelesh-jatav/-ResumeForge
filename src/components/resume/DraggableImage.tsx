import { useState, useRef, useCallback } from 'react';
import { ImagePosition } from '@/types/resume';
import { Move, Maximize2 } from 'lucide-react';

const defaultPosition: ImagePosition = { x: 10, y: 10, size: 70 };

interface DraggableImageProps {
  src: string;
  alt: string;
  position?: ImagePosition;
  onPositionChange: (position: ImagePosition) => void;
  containerRef: React.RefObject<HTMLDivElement>;
}

export const DraggableImage = ({ 
  src, 
  alt, 
  position = defaultPosition, 
  onPositionChange,
  containerRef 
}: DraggableImageProps) => {
  const pos = position ?? defaultPosition;
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);
  const startPos = useRef({ x: 0, y: 0, size: 0 });
  const handleMouseDown = useCallback((e: React.MouseEvent, action: 'drag' | 'resize') => {
    e.preventDefault();
    e.stopPropagation();
    
    if (action === 'drag') {
      setIsDragging(true);
      startPos.current = { 
        x: e.clientX - pos.x, 
        y: e.clientY - pos.y,
        size: pos.size 
      };
    } else {
      setIsResizing(true);
      startPos.current = { 
        x: e.clientX, 
        y: e.clientY,
        size: pos.size 
      };
    }
  }, [pos]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    
    if (isDragging) {
      const newX = e.clientX - startPos.current.x;
      const newY = e.clientY - startPos.current.y;
      
      // Constrain within container bounds
      const maxX = containerRect.width - pos.size - 32; // 32px padding
      const maxY = containerRect.height - pos.size - 32;
      
      onPositionChange({
        ...pos,
        x: Math.max(-32, Math.min(newX, maxX)),
        y: Math.max(-32, Math.min(newY, maxY)),
      });
    } else if (isResizing) {
      const deltaX = e.clientX - startPos.current.x;
      const deltaY = e.clientY - startPos.current.y;
      const delta = Math.max(deltaX, deltaY);
      const newSize = Math.max(40, Math.min(120, startPos.current.size + delta));
      
      onPositionChange({
        ...pos,
        size: newSize,
      });
    }
  }, [isDragging, isResizing, pos, onPositionChange, containerRef]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setIsResizing(false);
  }, []);

  // Add global mouse listeners when dragging/resizing
  useState(() => {
    if (isDragging || isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  });

  // Use effect for global listeners
  const addListeners = isDragging || isResizing;
  
  if (addListeners) {
    window.onmousemove = handleMouseMove;
    window.onmouseup = handleMouseUp;
  } else {
    window.onmousemove = null;
    window.onmouseup = null;
  }

  return (
    <div
      ref={imageRef}
      className="absolute cursor-move group"
      style={{
        top: pos.y,
        right: pos.x,
        width: pos.size,
        height: pos.size,
        zIndex: 10,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => !isDragging && !isResizing && setIsHovered(false)}
      onMouseDown={(e) => handleMouseDown(e, 'drag')}
    >
      {/* Image */}
      <div 
        className="w-full h-full rounded-full overflow-hidden border-2 border-black/20 shadow-sm"
        style={{ pointerEvents: 'none' }}
      >
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover"
          draggable={false}
        />
      </div>
      
      {/* Controls overlay */}
      {isHovered && (
        <>
          {/* Drag indicator */}
          <div className="absolute inset-0 rounded-full bg-black/30 flex items-center justify-center pointer-events-none">
            <Move className="w-5 h-5 text-white drop-shadow-md" />
          </div>
          
          {/* Resize handle */}
          <div
            className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center cursor-se-resize shadow-md hover:bg-primary/80 transition-colors"
            onMouseDown={(e) => handleMouseDown(e, 'resize')}
          >
            <Maximize2 className="w-3 h-3 text-primary-foreground" />
          </div>
        </>
      )}
      
      {/* Active state indicator */}
      {(isDragging || isResizing) && (
        <div className="absolute inset-0 rounded-full ring-2 ring-primary ring-offset-2 pointer-events-none" />
      )}
    </div>
  );
};
