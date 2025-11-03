import React from 'react';
import {
  Select,
  MenuItem,
  Chip,
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  styled
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import { FaTimes } from 'react-icons/fa';
import { palette } from './theme';

export interface MultiSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface MultiSelectProps {
  options: MultiSelectOption[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  maxHeight?: number;
  className?: string;
  chipVariant?: 'primary' | 'secondary' | 'success' | 'danger' | 'alert';
  label?: string;
}

// Styled Material-UI Select with MIUI theme - dynamic based on open state
const getStyledFormControl = (isOpen: boolean) => styled(FormControl)(() => ({
  '& .MuiOutlinedInput-root': {
    '& .MuiOutlinedInput-notchedOutline': {
      borderWidth: '2px',
      borderColor: isOpen ? palette.primary.main : '#e0e0e0',
      borderRadius: isOpen ? '12px 12px 0 0' : '12px',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: palette.primary.main,
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: palette.primary.main,
      borderWidth: '2px',
      borderRadius: isOpen ? '12px 12px 0 0' : '12px',
    },
  },
  '& .MuiInputLabel-root': {
    color: '#6c757d',
    '&.Mui-focused': {
      color: palette.primary.main,
    },
  },
}));

const StyledSelect = styled(Select<string[]>)(() => ({
  '& .MuiSelect-select': {
    padding: '12px 14px !important',
    minHeight: '20px !important',
  },
  '& .MuiSelect-icon': {
    color: '#666',
  },
}));

// Custom styled chips based on variant
const getStyledChip = (chipVariant: string) => styled(Chip)(() => {
  const getChipColors = () => {
    switch (chipVariant) {
      case 'primary':
        return {
          backgroundColor: palette.primary.main,
          color: '#ffffff',
          '&:hover': { backgroundColor: palette.primary.dark },
          '& .MuiChip-deleteIcon': { color: '#ffffff', '&:hover': { color: '#f0f0f0' } }
        };
      case 'secondary':
        return {
          backgroundColor: palette.secondary.main,
          color: palette.primary.main,
          border: `1px solid ${palette.primary.main}`,
          '&:hover': { backgroundColor: '#f0f0f0' },
          '& .MuiChip-deleteIcon': { color: palette.primary.main }
        };
      case 'success':
        return {
          backgroundColor: palette.success.main,
          color: '#ffffff',
          '&:hover': { backgroundColor: palette.success.dark },
          '& .MuiChip-deleteIcon': { color: '#ffffff', '&:hover': { color: '#f0f0f0' } }
        };
      case 'danger':
        return {
          backgroundColor: palette.danger.main,
          color: '#ffffff',
          '&:hover': { backgroundColor: palette.danger.dark },
          '& .MuiChip-deleteIcon': { color: '#ffffff', '&:hover': { color: '#f0f0f0' } }
        };
      case 'alert':
        return {
          backgroundColor: palette.alert.main,
          color: '#000000',
          '&:hover': { backgroundColor: '#e0a800' },
          '& .MuiChip-deleteIcon': { color: '#000000', '&:hover': { color: '#333' } }
        };
      default:
        return {
          backgroundColor: palette.primary.main,
          color: '#ffffff',
          '&:hover': { backgroundColor: palette.primary.dark },
          '& .MuiChip-deleteIcon': { color: '#ffffff', '&:hover': { color: '#f0f0f0' } }
        };
    }
  };

  return {
    borderRadius: '12px',
    fontWeight: '500',
    fontSize: '14px',
    height: '28px',
    ...getChipColors(),
  };
});

export const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select options...',
  disabled = false,
  maxHeight = 200,
  className = '',
  chipVariant = 'primary',
  label
}) => {
  const [open, setOpen] = React.useState(false);
  const StyledChip = getStyledChip(chipVariant);
  const StyledFormControl = getStyledFormControl(open);

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const selectedValue = event.target.value as string[];
    onChange(selectedValue);
  };

  const handleDelete = (valueToDelete: string) => (event: React.MouseEvent) => {
    event.stopPropagation();
    onChange(value.filter((v) => v !== valueToDelete));
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <StyledFormControl fullWidth className={className} disabled={disabled}>
      {label && <InputLabel>{label}</InputLabel>}
      <StyledSelect
        multiple
        open={open}
        onOpen={handleOpen}
        onClose={handleClose}
        value={value}
        onChange={handleChange}
        input={<OutlinedInput label={label} />}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: maxHeight,
              borderRadius: '0 0 12px 12px',
              marginTop: '0px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              border: `2px solid ${palette.primary.main}`,
              borderTop: 'none',
            },
          },
          MenuListProps: {
            style: {
              padding: '8px 0',
            },
          },
        }}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {(selected as string[]).map((val) => {
              const option = options.find(opt => opt.value === val);
              const label = option ? option.label : val;
              return (
                <StyledChip
                  key={val}
                  label={label}
                  deleteIcon={<FaTimes size={12} />}
                  onDelete={handleDelete(val)}
                  onMouseDown={(event) => {
                    event.stopPropagation();
                  }}
                />
              );
            })}
          </Box>
        )}
        displayEmpty
      >
        <MenuItem disabled value="">
          <em style={{ color: '#6c757d' }}>
            {value.length === 0 ? placeholder : 'Select more options...'}
          </em>
        </MenuItem>
        {options.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            disabled={option.disabled}
            sx={{
              fontSize: '14px',
              padding: '12px 16px',
              '&:hover': {
                backgroundColor: '#f8f9fa',
              },
              '&.Mui-selected': {
                backgroundColor: `${palette.primary.main}1a`,
                '&:hover': {
                  backgroundColor: `${palette.primary.main}2a`,
                },
              },
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </StyledSelect>
    </StyledFormControl>
  );
};
