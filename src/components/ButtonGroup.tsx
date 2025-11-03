import React from 'react';

export interface ButtonGroupProps {
  children: React.ReactNode[];
  orientation?: 'horizontal' | 'vertical';
  style?: React.CSSProperties;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({ children, orientation = 'horizontal', style }) => {
  const count = React.Children.count(children);
  return (
    <div
      style={{
        display: orientation === 'vertical' ? 'inline-flex' : 'flex',
        flexDirection: orientation === 'vertical' ? 'column' : 'row',
        ...style,
      }}
    >
      {React.Children.map(children, (child, idx) => {
        if (!React.isValidElement(child)) return child;
        let borderRadius: string | undefined = undefined;
        if (orientation === 'vertical') {
          if (idx === 0) borderRadius = '5px 5px 0 0'; // Only top corners
          else if (idx === count - 1) borderRadius = '0 0 5px 5px'; // Only bottom corners
          else borderRadius = '0'; // No border radius for middle buttons
        } else {
          if (idx === 0) borderRadius = '5px 0 0 5px'; // Only left corners
          else if (idx === count - 1) borderRadius = '0 5px 5px 0'; // Only right corners
          else borderRadius = '0'; // No border radius for middle buttons
        }
        return React.cloneElement(child as React.ReactElement<any>, {
          style: {
            ...(child.props as any).style,
            borderRadius,
            marginRight: 0,
            marginBottom: 0,
          },
        });
      })}
    </div>
  );
};
