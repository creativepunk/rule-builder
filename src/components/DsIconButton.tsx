import React from 'react';
import { createComponent, type EventName } from '@lit/react';
import { DsIconButton as LitDsIconButton } from '@my-ds/components/ds-icon-button/ds-icon-button.js';
import type { DsClickEvent } from '@my-ds/components/shared/events.js';

export const DsIconButton = createComponent({
  tagName: 'ds-icon-button',
  elementClass: LitDsIconButton,
  react: React,
  events: {
    onDsClick: 'ds-click' as EventName<DsClickEvent>,
  },
});

DsIconButton.displayName = 'DsIconButton';
