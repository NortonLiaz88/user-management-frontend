import React from 'react';
import {FieldError} from '../field-error';
import {ControlLabel, CustomCheckbox, Label} from './styles';

interface Props {
  label: string;
  checked?: boolean;
  linked?: boolean;
  linkAction?: () => void;
  onChange: (value: any) => void;
  error?: string;
}

export const Checkbox: React.ForwardRefRenderFunction<
  HTMLInputElement,
  Props
> = ({checked, error, label, linked, linkAction, onChange}: Props) => {
  const handleOpenLink = () => {
    if (linked && linkAction) {
      linkAction();
    }
  };

  return (
    <>
      <ControlLabel linked={linked || false}>
        <CustomCheckbox
          sx={{'& .MuiSvgIcon-root': {fontSize: 24}}}
          checked={checked}
          name={label}
          onChange={e => onChange(e)}
        />
        <Label onClick={() => handleOpenLink()}>{label}</Label>
      </ControlLabel>
      {error && <FieldError error={error} />}
    </>
  );
};
