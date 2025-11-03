import React from 'react';
import { useResponsive } from '../hooks/useResponsive';
import { containerWidths, spacing } from '../utils/responsive';

interface ContainerProps {
  children: React.ReactNode;
  fluid?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  fluid = false,
  className = '',
  style = {}
}) => {
  const { breakpoint } = useResponsive();

  const containerStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: fluid ? '100%' : containerWidths[breakpoint],
    margin: '0 auto',
    padding: `0 ${spacing.md[breakpoint]}`,
    ...style
  };

  return (
    <div className={className} style={containerStyle}>
      {children}
    </div>
  );
};
