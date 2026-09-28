import React from 'react';
import { createComponent, type EventName } from '@lit/react';
import { DsMultiSelectMenu as LitDsMultiSelectMenu } from '@my-ds/components/ds-multi-select-menu/ds-multi-select-menu.js';
export type { DsMultiSelectMenu as DsMultiSelectMenuElement } from '@my-ds/components/ds-multi-select-menu/ds-multi-select-menu.js';
import { DsMultiSelectMenuItem as LitDsMultiSelectMenuItem } from '@my-ds/components/ds-multi-select-menu/ds-multi-select-menu-item.js';
import type { DsSelectMenuChangeEvent } from '@my-ds/components/shared/events.js';

export const DsMultiSelectMenu = createComponent({
  tagName: 'ds-multi-select-menu',
  elementClass: LitDsMultiSelectMenu,
  react: React,
  events: {
    onDsSelectMenuChange: 'ds-select-menu-change' as EventName<DsSelectMenuChangeEvent>,
  },
});

DsMultiSelectMenu.displayName = 'DsMultiSelectMenu';

export const DsMultiSelectMenuItem = createComponent({
  tagName: 'ds-multi-select-menu-item',
  elementClass: LitDsMultiSelectMenuItem,
  react: React,
  events: {},
});

DsMultiSelectMenuItem.displayName = 'DsMultiSelectMenuItem';
