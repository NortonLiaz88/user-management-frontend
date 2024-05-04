import {
  FormControl,
  MenuItem,
  OutlinedInput,
} from '@mui/material';
import React from 'react';
import {FieldError} from '../field-error';
import {InputSkeleton} from '../input-skeleton';
import {Container, CustomSelect, Label} from './styles';
import { uniqueId } from 'lodash';

export interface ISelect {
  name: string;
  value: string;
  id: string;
}

export interface SelectProps {
  name: string;
  value: string;
  id: string;
}

interface Props {
  label: string;
  error?: string;
  loading?: boolean;
  selectItems: any[];
  onChange: (value: any) => void;
  onBlur: (value: any) => void;
  multiple?: boolean;
  value: string | string[];
  disabled?: boolean;
  canFlush?: boolean;
}

export const Select: React.FC<Props> = ({
  error,
  label,
  loading,
  multiple,
  selectItems,
  disabled,
  onBlur,
  onChange,
  value,
  canFlush,
}: Props) => {
  return (
    <Container>
      {loading ? (
        <InputSkeleton />
      ) : (
        <FormControl sx={{m: 1, minWidth: 120, width: '100%', margin: 0}}>
          <Label>{label}</Label>

          <CustomSelect
            disabled={disabled}
            autoWidth
            error={!!error}
            displayEmpty
            value={value}
            input={<OutlinedInput />}
            multiple={multiple ?? false}
            onChange={onChange}
            onBlur={onBlur}>
            {canFlush && (
              <MenuItem sx={{fontSize: '1.4rem', width: '40rem'}} value="">
                -
              </MenuItem>
            )}
            {selectItems?.length > 0 &&
              selectItems.map(item => (
                <MenuItem
                  sx={{fontSize: '1.4rem', width: '40rem'}}
                  key={item?.id + uniqueId()}
                  value={item?.value}>
                  {item?.name}
                </MenuItem>
              ))}
          </CustomSelect>
          {error && <FieldError error={error} />}
        </FormControl>
      )}
    </Container>
  );
};
