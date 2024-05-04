import {ButtonProps, CircularProgress} from '@mui/material';
import React from 'react';
import {TextGradient} from '../text-gradient';
import {CustomButton, IconContainer} from './styles';
import {GradientIcon} from '../gradient-icon';

interface Props extends ButtonProps {
  mode: 'filled' | 'outlined';
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconType?: 'plain' | 'gradient';
  loading?: boolean;
}
export const PrimaryButton: React.FC<Props> = ({
  mode,
  children,
  icon,
  iconType,
  loading,
  ...rest
}: Props) => {
  return (
    <CustomButton {...rest} mode={mode}>
      <>
        {loading ? (
          <CircularProgress
            sx={{color: mode === 'filled' ? '#fff' : '#992323'}}
          />
        ) : (
          <>
            {' '}
            {icon && iconType === 'gradient' && (
              <IconContainer>
                <GradientIcon icon={icon} />
              </IconContainer>
            )}
            {icon && iconType === 'plain' && (
              <IconContainer>{icon}</IconContainer>
            )}
            <TextGradient mode={mode}>{children}</TextGradient>
          </>
        )}
      </>
    </CustomButton>
  );
};
