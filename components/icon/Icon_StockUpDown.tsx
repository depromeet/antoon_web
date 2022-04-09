/* eslint-disable react/display-name */
import React from 'react';

import Icon from './Icon';

import type { IconProps } from '@_types/icon-type';

// eslint-disable-next-line react/display-name
const StockIcon: React.FC<IconProps> = React.memo((props) => (
  <Icon type="stroke" {...props}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
        d="M352 368h112V256"
      />
      <path
        d="M48 144l121.37 121.37a32 32 0 0045.26 0l50.74-50.74a32 32 0 0145.26 0L448 352"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
      />
    </svg>
  </Icon>
));

export const StockUpIcon: React.FC<IconProps> = React.memo((props) => (
  <StockIcon style={{ transform: 'rotate(0deg)' }} {...props} />
));

export const StockDownIcon: React.FC<IconProps> = React.memo((props) => (
  <StockIcon style={{ transform: 'rotate(180deg)' }} {...props} />
));
