import * as React from 'react';
import { SvgCss } from 'react-native-svg';

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

const HelpIcon: React.FC<Props> = ({ width, height, color = '#5E0CBC' }) => {
  return (
    <SvgCss
      xml={`<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z" fill="#FF9800"/>
<path d="M6.81738 6.75C6.99371 6.24875 7.34175 5.82608 7.79985 5.55685C8.25795 5.28762 8.79655 5.1892 9.32027 5.27903C9.84398 5.36886 10.319 5.64114 10.6612 6.04765C11.0034 6.45415 11.1907 6.96864 11.1899 7.5C11.1899 9 8.93988 9.75 8.93988 9.75" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9 12.75H9.00542" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

  `}
      width={width}
      height={height}
    />
  );
};

export { HelpIcon };
