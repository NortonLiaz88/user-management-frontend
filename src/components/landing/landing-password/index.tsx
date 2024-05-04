import React, {forwardRef, useState} from 'react';
import {FieldError} from '../../field-error';
import {Container, IconContainer, InputText} from './styles';
interface Props {
  icon: React.ReactNode;
  label: string;
  error?: string;
  onClick?: (event: any) => void;
  onChange: (value: any) => void;
  onBlur: (value: any) => void;
  value?: string;
}

const LandingPassword: React.ForwardRefRenderFunction<
  HTMLInputElement,
  Props
> = ({error, icon, value, onBlur, onChange}: Props, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled] = useState(false);

  return (
    <>
      <Container isFocused={isFocused} isFilled={isFilled}>
        <IconContainer isFocused={isFocused}>{icon}</IconContainer>
        <InputText
          value={value}
          onFocus={() => setIsFocused(true)}
          placeholder="Digite sua senha"
          isFocused={isFocused}
          onBlur={onBlur}
          onChange={onChange}
          type="password"
        />
      </Container>

      {error && <FieldError error={error} />}
    </>
  );
};

export default forwardRef(LandingPassword);
