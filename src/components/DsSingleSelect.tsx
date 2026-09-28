import React from 'react';
import { createComponent, type EventName } from '@lit/react';
import {
  DsSingleSelectMenu as LitMenu,
  DsSingleSelectMenuItem as LitMenuItem,
} from '@my-ds/components/ds-single-select-menu/ds-single-select-menu.js';
import type { DsSelectMenuChangeEvent } from '@my-ds/components/shared/events.js';

export type { DsSelectMenuChangeEvent };

export const DsSingleSelectMenu = createComponent({
  tagName: 'ds-single-select-menu',
  elementClass: LitMenu,
  react: React,
  events: {
    onDsSelectMenuChange: 'ds-select-menu-change' as EventName<DsSelectMenuChangeEvent>,
  },
});
DsSingleSelectMenu.displayName = 'DsSingleSelectMenu';

export const DsSingleSelectMenuItem = createComponent({
  tagName: 'ds-single-select-menu-item',
  elementClass: LitMenuItem,
  react: React,
  events: {},
});
DsSingleSelectMenuItem.displayName = 'DsSingleSelectMenuItem';
