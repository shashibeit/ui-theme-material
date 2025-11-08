import React, { useState, useRef } from 'react';
import { useResponsive } from '../hooks/useResponsive';

export interface GridCard {
  id: string;
  title: string;
  content: React.ReactNode;
  backgroundColor?: string;
  textColor?: string;
}

interface DragDropGridProps {
  cards: GridCard[];
  onReorder: (newCards: GridCard[]) => void;
  columns?: {
    mobile: number;
    tablet: number;
    laptop: number;
    desktop: number;
    xlDesktop: number;
  };
  gap?: number;
  cardHeight?: number;
}

export const DragDropGrid: React.FC<DragDropGridProps> = ({
  cards,
  onReorder,
  columns = {
    mobile: 1,
    tablet: 2,
    laptop: 3,
    desktop: 4,
    xlDesktop: 5,
  },
  gap = 16,
  cardHeight = 200,
}) => {
  const { breakpoint } = useResponsive();
  const [draggedCard, setDraggedCard] = useState<string | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const dragCounter = useRef(0);

  const getColumns = () => {
    return columns[breakpoint];
  };

  const handleDragStart = (e: React.DragEvent, cardId: string) => {
    setDraggedCard(cardId);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', cardId);
    
    // Create a custom drag image
    const dragElement = e.target as HTMLElement;
    dragElement.style.opacity = '0.5';
  };

  const handleDragEnd = (e: React.DragEvent) => {
    const dragElement = e.target as HTMLElement;
    dragElement.style.opacity = '1';
    setDraggedCard(null);
    setDragOverIndex(null);
    dragCounter.current = 0;
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnter = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    dragCounter.current++;
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setDragOverIndex(null);
    }
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    dragCounter.current = 0;
    
    if (!draggedCard) return;

    const dragIndex = cards.findIndex(card => card.id === draggedCard);
    if (dragIndex === dropIndex) {
      setDragOverIndex(null);
      return;
    }

    const newCards = [...cards];
    const draggedItem = newCards[dragIndex];
    
    // Remove dragged item
    newCards.splice(dragIndex, 1);
    
    // Insert at new position
    const adjustedDropIndex = dragIndex < dropIndex ? dropIndex - 1 : dropIndex;
    newCards.splice(adjustedDropIndex, 0, draggedItem);
    
    onReorder(newCards);
    setDragOverIndex(null);
  };

  const gridStyles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${getColumns()}, 1fr)`,
    gap: `${gap}px`,
    padding: '20px',
    width: '100%',
  };

  const getCardStyles = (card: GridCard, index: number): React.CSSProperties => {
    const isBeingDragged = draggedCard === card.id;
    const isDropTarget = dragOverIndex === index;

    return {
      height: `${cardHeight}px`,
      backgroundColor: card.backgroundColor || '#ffffff',
      color: card.textColor || '#333333',
      border: isDropTarget ? '2px dashed #313C97' : '1px solid #e0e0e0',
      borderRadius: '12px',
      padding: '16px',
      cursor: 'grab',
      userSelect: 'none',
      transition: 'all 0.2s ease',
      transform: isBeingDragged ? 'rotate(2deg) scale(1.02)' : 'none',
      opacity: isBeingDragged ? 0.8 : 1,
      boxShadow: isBeingDragged 
        ? '0 8px 25px rgba(0, 0, 0, 0.15)' 
        : isDropTarget
        ? '0 4px 15px rgba(49, 60, 151, 0.2)'
        : '0 2px 8px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    };
  };

  return (
    <div style={gridStyles}>
      {cards.map((card, index) => (
        <div
          key={card.id}
          draggable
          onDragStart={(e) => handleDragStart(e, card.id)}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
          onDragEnter={(e) => handleDragEnter(e, index)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, index)}
          style={getCardStyles(card, index)}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '12px',
            borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
            paddingBottom: '8px',
          }}>
            <h3 style={{
              margin: 0,
              fontSize: '18px',
              fontWeight: 'bold',
              color: card.textColor || '#333333',
            }}>
              {card.title}
            </h3>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              color: '#666',
              fontSize: '12px',
            }}>
              <span style={{ marginRight: '4px' }}>⋮⋮</span>
              <span>Drag to reorder</span>
            </div>
          </div>
          <div style={{
            flex: 1,
            overflow: 'auto',
          }}>
            {card.content}
          </div>
        </div>
      ))}
    </div>
  );
};
