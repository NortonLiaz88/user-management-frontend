import React from 'react';
import {Text} from './styles';

interface Props {
  mode: 'filled' | 'outlined';
  children: React.ReactNode;
}

export const TextGradient: React.FC<Props> = ({mode, children}: Props) => {
  return <Text mode={mode}>{children}</Text>;
};
