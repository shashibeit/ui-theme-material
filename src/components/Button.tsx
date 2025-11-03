import React from 'react';
import { palette, typography } from './theme';
import { FaBeer, FaCoffee, FaCheck, FaExclamationTriangle, FaTimes, FaInfoCircle } from 'react-icons/fa';

export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'alert';
export type ButtonSize = 'small' | 'medium' | 'large';

const iconMap: Record<string, React.ReactNode> = {
  FaBeer: <FaBeer style={{ marginRight: 8 }} />,
  FaCoffee: <FaCoffee style={{ marginRight: 8 }} />,
  FaCheck: <FaCheck style={{ marginRight: 8 }} />,
  FaExclamationTriangle: <FaExclamationTriangle style={{ marginRight: 8 }} />,
  FaTimes: <FaTimes style={{ marginRight: 8 }} />,
  FaInfoCircle: <FaInfoCircle style={{ marginRight: 8 }} />,
};

const sizeStyles = {
  small: { width: '133px', height: '44px', minWidth: '130px' },
  medium: { width: '160px', height: '44px', minWidth: '160px' },
  large: { width: '260px', height: '44px', minWidth: '260px' },
};

const getVariantStyles = (variant: ButtonVariant = 'primary') => {
  switch (variant) {
    case 'primary':
      return {
        background: palette.primary.main,
        color: '#fff',
        borderColor: palette.primary.main,
        boxShadow: `0 2px 8px 0 ${palette.shadow}`,
        ':hover': {
          background: palette.primary.dark,
        },
      };
    case 'secondary':
      return {
        background: palette.secondary.main,
        color: '#313C97',
        borderColor: palette.secondary.light,
        boxShadow: `0 2px 8px 0 ${palette.shadow}`,
        ':hover': {
          background: palette.secondary.light,
        },
      };
    case 'success':
      return {
        background: palette.success.main,
        color: '#fff',
        borderColor: palette.success.main,
        boxShadow: `0 2px 8px 0 ${palette.shadow}`,
        ':hover': {
          background: palette.success.dark,
          color: '#fff',
          borderColor: palette.success.dark,
        },
      };
    case 'danger':
      return {
        background: palette.danger.main,
        color: '#fff',
        borderColor: palette.danger.main,
        boxShadow: `0 2px 8px 0 ${palette.shadow}`,
        ':hover': {
          background: palette.danger.dark,
        },
      };
    case 'alert':
      return {
        background: palette.alert.main,
        color: '#26262C',
        borderColor: palette.alert.light,
        boxShadow: `0 2px 8px 0 ${palette.shadow}`,
        ':hover': {
          background: palette.alert.light,
        },
      };
    default:
      return {};
  }
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  icon?: React.ReactNode | keyof typeof iconMap;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled,
  style,
  children,
  icon,
  ...props
}) => {
  const [hover, setHover] = React.useState(false);
  const variantStyles = getVariantStyles(variant);
  const sizeStyle = sizeStyles[size] || sizeStyles.medium;
  const hoverStyle = hover && variantStyles[':hover'] ? variantStyles[':hover'] : {};
  const { [':hover']: _hover, ...baseStyles } = variantStyles;
  let iconElement: React.ReactNode = null;
  if (icon) {
    if (typeof icon === 'string' && iconMap[icon]) {
      iconElement = iconMap[icon];
    } else if (React.isValidElement(icon)) {
      iconElement = React.cloneElement(icon as React.ReactElement<any>, {
        style: { marginRight: 8, ...(icon.props && (icon.props as any).style ? (icon.props as any).style : {}) },
      });
    }
  }
  return (
    <button
      disabled={disabled}
      style={{
        borderRadius: 5,
        padding: '0 12px',
        border: '1px solid',
        fontWeight: typography.fontWeight,
        fontSize: typography.fontSize,
        lineHeight: typography.lineHeight,
        letterSpacing: typography.letterSpacing,
        fontFamily: typography.fontFamily,
        textAlign: 'center',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: fullWidth ? '100%' : sizeStyle.width,
        height: sizeStyle.height,
        minWidth: sizeStyle.minWidth,
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all 259ms cubic-bezier(0,0,0.2,1)',
        outline: 'none',
        ...baseStyles,
        ...hoverStyle,
        ...style,
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      {...props}
    >
      {iconElement}
      {children}
    </button>
  );
};
