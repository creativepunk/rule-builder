import React from 'react';

type DsIconSize = 'sm' | 'md' | 'lg';
type DsIconStyle = 'outlined' | 'rounded' | 'sharp';

interface DsIconProps {
  name: string;
  size?: DsIconSize;
  iconStyle?: DsIconStyle;
  fill?: boolean;
}

export function DsIcon({ name, size, iconStyle, fill }: DsIconProps) {
  return React.createElement('ds-icon', {
    name,
    size,
    'icon-style': iconStyle,
    fill: fill ? '' : undefined,
  });
}
