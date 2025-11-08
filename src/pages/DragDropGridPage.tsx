import React, { useState } from 'react';
import { DragDropGrid, type GridCard } from '../components/DragDropGrid';
import { CodeBlock } from '../components/CodeBlock';

const initialCards: GridCard[] = [
  {
    id: '1',
    title: 'User Analytics',
    backgroundColor: '#f8f9ff',
    textColor: '#313C97',
    content: (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#313C97' }}>2,847</div>
          <span style={{ marginLeft: '8px', color: '#28a745', fontSize: '12px' }}>+12%</span>
        </div>
        <p style={{ margin: 0, color: '#6c757d', fontSize: '14px' }}>
          Total active users this month with steady growth across all segments.
        </p>
      </div>
    ),
  },
  {
    id: '2',
    title: 'Revenue Growth',
    backgroundColor: '#f0fff4',
    textColor: '#155724',
    content: (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#28a745' }}>$45,890</div>
          <span style={{ marginLeft: '8px', color: '#28a745', fontSize: '12px' }}>+8.2%</span>
        </div>
        <p style={{ margin: 0, color: '#6c757d', fontSize: '14px' }}>
          Monthly recurring revenue showing consistent upward trend.
        </p>
      </div>
    ),
  },
  {
    id: '3',
    title: 'System Performance',
    backgroundColor: '#fff3cd',
    textColor: '#856404',
    content: (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#ffc107' }}>98.7%</div>
          <span style={{ marginLeft: '8px', color: '#dc3545', fontSize: '12px' }}>-0.3%</span>
        </div>
        <p style={{ margin: 0, color: '#6c757d', fontSize: '14px' }}>
          Server uptime with minor performance degradation during peak hours.
        </p>
      </div>
    ),
  },
  {
    id: '4',
    title: 'Customer Satisfaction',
    backgroundColor: '#d4edda',
    textColor: '#155724',
    content: (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#28a745' }}>4.8/5</div>
          <span style={{ marginLeft: '8px', color: '#28a745', fontSize: '12px' }}>+0.2</span>
        </div>
        <p style={{ margin: 0, color: '#6c757d', fontSize: '14px' }}>
          Average customer rating based on 1,247 reviews this quarter.
        </p>
      </div>
    ),
  },
  {
    id: '5',
    title: 'Support Tickets',
    backgroundColor: '#f8d7da',
    textColor: '#721c24',
    content: (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#dc3545' }}>23</div>
          <span style={{ marginLeft: '8px', color: '#dc3545', fontSize: '12px' }}>+5</span>
        </div>
        <p style={{ margin: 0, color: '#6c757d', fontSize: '14px' }}>
          Open support tickets requiring immediate attention from the team.
        </p>
      </div>
    ),
  },
  {
    id: '6',
    title: 'Team Productivity',
    backgroundColor: '#d1ecf1',
    textColor: '#0c5460',
    content: (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#17a2b8' }}>847</div>
          <span style={{ marginLeft: '8px', color: '#28a745', fontSize: '12px' }}>+15%</span>
        </div>
        <p style={{ margin: 0, color: '#6c757d', fontSize: '14px' }}>
          Tasks completed this sprint with improved efficiency metrics.
        </p>
      </div>
    ),
  },
  {
    id: '7',
    title: 'API Requests',
    backgroundColor: '#f3e5f5',
    textColor: '#4a148c',
    content: (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#9c27b0' }}>1.2M</div>
          <span style={{ marginLeft: '8px', color: '#28a745', fontSize: '12px' }}>+22%</span>
        </div>
        <p style={{ margin: 0, color: '#6c757d', fontSize: '14px' }}>
          Total API calls processed with optimal response times maintained.
        </p>
      </div>
    ),
  },
  {
    id: '8',
    title: 'Storage Usage',
    backgroundColor: '#e8f5e8',
    textColor: '#2e7d32',
    content: (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#4caf50' }}>67%</div>
          <span style={{ marginLeft: '8px', color: '#ffc107', fontSize: '12px' }}>+5%</span>
        </div>
        <p style={{ margin: 0, color: '#6c757d', fontSize: '14px' }}>
          Current storage utilization across all database instances.
        </p>
      </div>
    ),
  },
];

export const DragDropGridPage: React.FC = () => {
  const [cards, setCards] = useState<GridCard[]>(initialCards);
  const [dragHistory, setDragHistory] = useState<string[]>([]);
  const [nextCardId, setNextCardId] = useState(9);

  const handleReorder = (newCards: GridCard[]) => {
    setCards(newCards);
    setDragHistory(prev => [...prev, `${new Date().toLocaleTimeString()}: Reordered cards`].slice(-5));
  };

  const resetOrder = () => {
    setCards(initialCards);
    setDragHistory(prev => [...prev, `${new Date().toLocaleTimeString()}: Reset to original order`].slice(-5));
  };

  const shuffleCards = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setDragHistory(prev => [...prev, `${new Date().toLocaleTimeString()}: Shuffled cards randomly`].slice(-5));
  };

  const handleAddCard = () => {
    const newCard: GridCard = {
      id: nextCardId.toString(),
      title: `New Card ${nextCardId}`,
      backgroundColor: '#e7f3ff',
      textColor: '#0056b3',
      content: (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#0056b3' }}>NEW</div>
            <span style={{ marginLeft: '8px', color: '#28a745', fontSize: '12px' }}>Fresh</span>
          </div>
          <p style={{ margin: 0, color: '#6c757d', fontSize: '14px' }}>
            This is a newly added card at the beginning of the grid.
          </p>
        </div>
      ),
    };

    // Add new card at the beginning (position 0)
    const newCards = [newCard, ...cards];
    setCards(newCards);
    setNextCardId(prev => prev + 1);
    setDragHistory(prev => [...prev, `${new Date().toLocaleTimeString()}: Added new card at the beginning`].slice(-5));
  };

  return (
    <div style={{ maxWidth: '100%', width: '100%' }}>
      {/* Page Header */}
      <div style={{ marginBottom: '30px', padding: '0 20px' }}>
        <h1 style={{ 
          color: '#313C97', 
          marginBottom: '10px', 
          fontSize: '32px', 
          fontWeight: 'bold' 
        }}>
          Drag & Drop Grid Layout
        </h1>
        <p style={{ 
          color: '#6c757d', 
          fontSize: '16px', 
          marginBottom: '20px' 
        }}>
          Interactive responsive grid with drag-and-drop reordering capabilities. 
          Drag any card to reorder them and see real-time updates.
        </p>

        {/* Control Buttons */}
        <div style={{ 
          display: 'flex', 
          gap: '12px', 
          marginBottom: '20px',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={resetOrder}
            style={{
              backgroundColor: '#313C97',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '8px',
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2a3284'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#313C97'}
          >
            Reset Order
          </button>
          <button
            onClick={shuffleCards}
            style={{
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '8px',
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#218838'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#28a745'}
          >
            Shuffle Cards
          </button>
          <button
            onClick={handleAddCard}
            style={{
              backgroundColor: '#17a2b8',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '8px',
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#138496'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#17a2b8'}
          >
            Add New Card
          </button>
        </div>

        {/* Current Order Display */}
        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '16px',
          borderRadius: '8px',
          border: '1px solid #e9ecef',
          marginBottom: '20px'
        }}>
          <h3 style={{ 
            margin: '0 0 12px 0', 
            fontSize: '16px', 
            color: '#313C97' 
          }}>
            Current Card Order:
          </h3>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px'
          }}>
            {cards.map((card, index) => (
              <span
                key={card.id}
                style={{
                  backgroundColor: '#e9ecef',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  color: '#495057'
                }}
              >
                {index + 1}. {card.title}
              </span>
            ))}
          </div>
        </div>

        {/* Activity History */}
        {dragHistory.length > 0 && (
          <div style={{
            backgroundColor: '#fff3cd',
            padding: '16px',
            borderRadius: '8px',
            border: '1px solid #ffeaa7',
            marginBottom: '20px'
          }}>
            <h3 style={{ 
              margin: '0 0 12px 0', 
              fontSize: '16px', 
              color: '#856404' 
            }}>
              Recent Activity:
            </h3>
            <div style={{ fontSize: '14px', color: '#856404' }}>
              {dragHistory.map((entry, index) => (
                <div key={index} style={{ marginBottom: '4px' }}>
                  • {entry}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Grid Layout */}
      <DragDropGrid
        cards={cards}
        onReorder={handleReorder}
        columns={{
          mobile: 1,
          tablet: 2,
          laptop: 3,
          desktop: 4,
          xlDesktop: 4,
        }}
        gap={16}
        cardHeight={180}
      />

      {/* Instructions */}
      <div style={{ 
        padding: '20px',
        marginTop: '40px',
        backgroundColor: '#e7f3ff',
        borderRadius: '12px',
        border: '1px solid #b3d9ff'
      }}>
        <h3 style={{ 
          color: '#0056b3', 
          marginBottom: '16px',
          fontSize: '18px'
        }}>
          How to Use:
        </h3>
        <ul style={{ 
          color: '#0056b3', 
          fontSize: '14px',
          lineHeight: '1.6',
          paddingLeft: '20px'
        }}>
          <li><strong>Drag and Drop:</strong> Click and hold any card, then drag it to a new position</li>
          <li><strong>Add New Card:</strong> Click "Add New Card" button to add a card at the beginning of the grid</li>
          <li><strong>Visual Feedback:</strong> Cards show visual indicators when being dragged or when you hover over drop zones</li>
          <li><strong>Responsive Design:</strong> Grid automatically adjusts columns based on screen size</li>
          <li><strong>Real-time Updates:</strong> The order display updates immediately when you rearrange cards</li>
          <li><strong>Reset/Shuffle:</strong> Use the buttons above to reset to original order or randomly shuffle cards</li>
        </ul>
      </div>

      {/* Code Examples */}
      <div style={{ padding: '20px' }}>
        <h2 style={{ 
          color: '#313C97', 
          marginBottom: '20px', 
          borderBottom: '2px solid #313C97', 
          paddingBottom: '10px' 
        }}>
          Implementation Examples
        </h2>

        <CodeBlock
          title="Basic Usage"
          code={`import React, { useState } from 'react';
import { DragDropGrid, type GridCard } from '../components/DragDropGrid';

const MyComponent = () => {
  const [cards, setCards] = useState<GridCard[]>([
    {
      id: '1',
      title: 'Card Title',
      backgroundColor: '#f8f9ff',
      textColor: '#313C97',
      content: <div>Your card content here</div>
    }
  ]);

  const handleReorder = (newCards: GridCard[]) => {
    setCards(newCards);
    console.log('Cards reordered:', newCards);
  };

  return (
    <DragDropGrid
      cards={cards}
      onReorder={handleReorder}
      columns={{
        mobile: 1,
        tablet: 2,
        laptop: 3,
        desktop: 4,
        xlDesktop: 5,
      }}
      gap={16}
      cardHeight={200}
    />
  );
};`}
        />

        <CodeBlock
          title="GridCard Interface"
          code={`interface GridCard {
  id: string;                    // Unique identifier
  title: string;                 // Card title
  content: React.ReactNode;      // Card content (JSX)
  backgroundColor?: string;      // Optional background color
  textColor?: string;           // Optional text color
}

interface DragDropGridProps {
  cards: GridCard[];            // Array of cards to display
  onReorder: (newCards: GridCard[]) => void; // Callback when order changes
  columns?: {                   // Responsive column configuration
    mobile: number;
    tablet: number;
    laptop: number;
    desktop: number;
    xlDesktop: number;
  };
  gap?: number;                 // Gap between cards in pixels
  cardHeight?: number;          // Fixed height for all cards
}`}
        />

        <CodeBlock
          title="Adding Cards to Grid"
          code={`// Simple function to add cards at the beginning
const handleAddCard = () => {
  const newCard: GridCard = {
    id: 'new-card-id',
    title: 'New Card',
    backgroundColor: '#e7f3ff',
    textColor: '#0056b3',
    content: <div>New card content</div>
  };

  // Add new card at the beginning
  const newCards = [newCard, ...cards];
  setCards(newCards);
};

// In your component - simple button to add cards
<button onClick={handleAddCard}>
  Add New Card
</button>

<DragDropGrid
  cards={cards}
  onReorder={handleReorder}
  // ... other props
/>`}
        />

        <CodeBlock
          title="Advanced Card Content"
          code={`const advancedCard: GridCard = {
  id: 'metrics-1',
  title: 'User Analytics',
  backgroundColor: '#f8f9ff',
  textColor: '#313C97',
  content: (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
        <div style={{ fontSize: '32px', fontWeight: 'bold' }}>2,847</div>
        <span style={{ marginLeft: '8px', color: '#28a745', fontSize: '12px' }}>
          +12%
        </span>
      </div>
      <p style={{ margin: 0, color: '#6c757d', fontSize: '14px' }}>
        Total active users this month with steady growth.
      </p>
      <div style={{ marginTop: '16px' }}>
        <button style={{
          backgroundColor: '#313C97',
          color: 'white',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '4px',
          fontSize: '12px',
          cursor: 'pointer'
        }}>
          View Details
        </button>
      </div>
    </div>
  )
};`}
        />
      </div>
    </div>
  );
};
