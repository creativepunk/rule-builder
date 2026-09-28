import React from 'react';
import { createComponent, type EventName } from '@lit/react';
import { DsTag as LitDsTag } from '@my-ds/components/ds-tag/ds-tag.js';
import type { DsTagDismissEvent } from '@my-ds/components/shared/events.js';

export const DsTag = createComponent({
  tagName: 'ds-tag',
  elementClass: LitDsTag,
  react: React,
  events: {
    onDsTagDismiss: 'ds-tag-dismiss' as EventName<DsTagDismissEvent>,
  },
});

DsTag.displayName = 'DsTag';
