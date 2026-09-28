import React from 'react';
import { createComponent, type EventName } from '@lit/react';
import { DsSearch as LitDsSearch } from '@my-ds/components/ds-search/ds-search.js';
import type { DsInputEvent, DsSearchExpandEvent, DsSearchClearEvent } from '@my-ds/components/shared/events.js';

export const DsSearch = createComponent({
  tagName: 'ds-search',
  elementClass: LitDsSearch,
  react: React,
  events: {
    onDsInput: 'ds-input' as EventName<DsInputEvent>,
    onDsSearchExpand: 'ds-search-expand' as EventName<DsSearchExpandEvent>,
    onDsSearchClear: 'ds-search-clear' as EventName<DsSearchClearEvent>,
  },
});

DsSearch.displayName = 'DsSearch';
