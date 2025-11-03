import React from 'react';
import { Button } from './Button';
import type { ButtonProps } from './Button';

export interface LinkButtonProps extends Omit<ButtonProps, 'href'> {
  href: string;
  target?: string;
  rel?: string;
}

export const LinkButton: React.FC<LinkButtonProps> = ({ href, target, rel, children, ...props }) => (
  <a
    href={href}
    target={target}
    rel={rel}
    style={{ textDecoration: 'none', display: 'inline-block' }}
  >
    <Button {...props} style={{ width: '100%', ...props.style }}>
      {children}
    </Button>
  </a>
);
