import React from 'react';
import { createComponent, type EventName } from '@lit/react';
import {
  DsButton as LitDsButton,
} from '@my-ds/components/ds-button/ds-button.js';
import type { DsClickEvent } from '@my-ds/components/shared/events.js';

export const DsButton = createComponent({
  tagName: 'ds-button',
  elementClass: LitDsButton,
  react: React,
  events: {
    onDsClick: 'ds-click' as EventName<DsClickEvent>,
  },
});

DsButton.displayName = 'DsButton';
