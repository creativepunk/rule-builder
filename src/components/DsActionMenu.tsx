import React from 'react';
import { createComponent, type EventName } from '@lit/react';
import { DsActionMenu as LitDsActionMenu } from '@my-ds/components/ds-action-menu/ds-action-menu.js';
import { DsActionMenuItem as LitDsActionMenuItem } from '@my-ds/components/ds-action-menu/ds-action-menu-item.js';
import type { DsMenuActionEvent } from '@my-ds/components/shared/events.js';

export const DsActionMenu = createComponent({
  tagName: 'ds-action-menu',
  elementClass: LitDsActionMenu,
  react: React,
  events: {
    onDsMenuAction: 'ds-menu-action' as EventName<DsMenuActionEvent>,
  },
});

DsActionMenu.displayName = 'DsActionMenu';

export const DsActionMenuItem = createComponent({
  tagName: 'ds-action-menu-item',
  elementClass: LitDsActionMenuItem,
  react: React,
  events: {},
});

DsActionMenuItem.displayName = 'DsActionMenuItem';
