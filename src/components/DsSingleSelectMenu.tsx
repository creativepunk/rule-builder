import React from 'react';
import { createComponent, type EventName } from '@lit/react';
import { DsSingleSelectMenu as LitDsSingleSelectMenu } from '@my-ds/components/ds-single-select-menu/ds-single-select-menu.js';
import { DsSingleSelectMenuItem as LitDsSingleSelectMenuItem } from '@my-ds/components/ds-single-select-menu/ds-single-select-menu-item.js';
import type { DsSelectMenuChangeEvent } from '@my-ds/components/shared/events.js';

export const DsSingleSelectMenu = createComponent({
  tagName: 'ds-single-select-menu',
  elementClass: LitDsSingleSelectMenu,
  react: React,
  events: {
    onDsSelectMenuChange: 'ds-select-menu-change' as EventName<DsSelectMenuChangeEvent>,
  },
});

DsSingleSelectMenu.displayName = 'DsSingleSelectMenu';

export const DsSingleSelectMenuItem = createComponent({
  tagName: 'ds-single-select-menu-item',
  elementClass: LitDsSingleSelectMenuItem,
  react: React,
  events: {},
});

DsSingleSelectMenuItem.displayName = 'DsSingleSelectMenuItem';
