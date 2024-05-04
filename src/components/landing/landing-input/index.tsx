import React, {forwardRef, useState} from 'react';
import {FieldError} from '../../field-error';
import {Container, IconContainer, InputText} from './styles';
interface Props {
  icon: React.ReactNode;
  label: string;
  error?: string;
  onChange: (value: any) => void;
  onBlur: (value: any) => void;
  value?: string;
}

const LandingInput: React.ForwardRefRenderFunction<HTMLInputElement, Props> = (
  {icon, error, value, onBlur, onChange}: Props,
  _,
) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [tapping, setTapping] = useState(false);

  return (
    <>
      <Container isFocused={isFocused} isFilled={isFilled} isTapping={tapping}>
        <IconContainer isFocused={isFocused}>{icon}</IconContainer>
        <InputText
          value={value}
          onFocus={() => setIsFocused(true)}
          placeholder="Digite seu e-mail"
          isFocused={isFocused}
          onBlur={onBlur}
          onChange={onChange}
        />
      </Container>

      {error && <FieldError error={error} />}
    </>
  );
};

export default forwardRef(LandingInput);
