import React from 'react';
import { Button } from './Button';
import type { ButtonProps } from './Button';

export interface IconButtonProps extends Omit<ButtonProps, 'children'> {
  icon: React.ReactNode;
  'aria-label': string;
}

export const IconButton: React.FC<IconButtonProps> = ({ icon, 'aria-label': ariaLabel, ...props }) => (
  <Button {...props} style={{ padding: 0, width: 44, minWidth: 44, height: 44, borderRadius: '50%', ...props.style }} aria-label={ariaLabel}>
    {icon}
  </Button>
);
