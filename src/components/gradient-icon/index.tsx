import React from 'react';

interface Props {
  icon: React.ReactNode;
  height?: number;
  width?: number;
}

export const GradientIcon: React.FC<Props> = ({
  icon,
  height = 24,
  width = 24,
}: Props) => {
  return (
    <svg
      height={height}
      width={width}
      viewBox="0 0 10 10"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink">
      <defs>
        <linearGradient id="myGradient" gradientTransform="rotate(116)">
          <stop offset="0%" stopColor="#58bbff" />
          <stop offset="100%" stopColor="#5ded9f" />
        </linearGradient>
      </defs>
      {icon}
    </svg>
  );
};
