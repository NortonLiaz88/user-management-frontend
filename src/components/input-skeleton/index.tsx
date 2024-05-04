import React from 'react';
import {Skeleton} from '@mui/material';

export const InputSkeleton: React.FC = () => {
  return (
    <Skeleton
      sx={{height: '8.8rem', marginTop: '1.6rem', borderRadius: '1.6rem'}}
    />
  );
};
