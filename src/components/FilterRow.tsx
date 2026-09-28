import { forwardRef, useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { DsMultiSelectMenu, DsMultiSelectMenuItem, type DsMultiSelectMenuElement } from './DsMultiSelectMenu';
import { DsSingleSelectMenu, DsSingleSelectMenuItem } from './DsSingleSelectMenu';
import { DsTag } from './DsTag';
import type { Variant } from '../App';

// ── Data ──────────────────────────────────────────────────────────────────────

const PARAM_VALUES: Record<string, { value: string; label: string }[]> = {
  'alert.id':               [],
  'alert.dedup_key':        [],
  'alert.name':             [],
  'alert.type': [
    { value: 'aerender_after_effects_error_status_alert',          label: 'aerender_after_effects_error_status_alert' },
    { value: 'aerender_aws_permission_denied_status_alert',        label: 'aerender_aws_permission_denied_status_alert' },
    { value: 'aerender_illegal_arg_flag_status_alert',             label: 'aerender_illegal_arg_flag_status_alert' },
    { value: 'allow_incorrect_som_error_alert',                    label: 'allow_incorrect_som_error_alert' },
    { value: 'allowincorrectsomerror_allow_incorrect_som_error_alert', label: 'allowincorrectsomerror_allow_incorrect_som_error_alert' },
    { value: 'an3_epg_alert_delivery_failed',                      label: 'an3_epg_alert_delivery_failed' },
    { value: 'an3_epg_alert_fetch_failed',                         label: 'an3_epg_alert_fetch_failed' },
    { value: 'an3_epg_alert_schema_failed',                        label: 'an3_epg_alert_schema_failed' },
    { value: 'an3_epg_alert_transform_failed',                     label: 'an3_epg_alert_transform_failed' },
    { value: 'an3_playout_alert_hls_error',                        label: 'an3_playout_alert_hls_error' },
    { value: 'an3_playout_alert_hole',                             label: 'an3_playout_alert_hole' },
    { value: 'an3_playout_alert_monitor_failure',                  label: 'an3_playout_alert_monitor_failure' },
    { value: 'an3_playout_alert_recue',                            label: 'an3_playout_alert_recue' },
    { value: 'asset_duration_mismatch',                            label: 'asset_duration_mismatch' },
    { value: 'asset_missing_in_cloud',                             label: 'asset_missing_in_cloud' },
    { value: 'hole_in_playlist',                                   label: 'hole_in_playlist' },
    { value: 'incorrect_som',                                      label: 'incorrect_som' },
    { value: 'missing_live_event',                                 label: 'missing_live_event' },
    { value: 'no_playlist',                                        label: 'no_playlist' },
    { value: 'no_published_playlist',                              label: 'no_published_playlist' },
    { value: 'hourly_missing_scte_standard',                       label: 'hourly_missing_scte_standard' },
    { value: 'orphan_live_event',                                  label: 'orphan_live_event' },
  ],
  'alert.description':      [],
  'alert.severity': [
    { value: 'critical', label: 'critical' },
    { value: 'high',     label: 'high' },
    { value: 'medium',   label: 'medium' },
    { value: 'low',      label: 'low' },
    { value: 'info',     label: 'info' },
  ],
  'alert.state': [
    { value: 'active',        label: 'active' },
    { value: 'resolved',      label: 'resolved' },
    { value: 'acknowledged',  label: 'acknowledged' },
    { value: 'silenced',      label: 'silenced' },
    { value: 'pending',       label: 'pending' },
  ],
  'alert.triggered_at':     [],
  'alert.issue_start_time': [],
  'alert.duration_ms':      [],
  'alert.snoozed_by':       [],
  'alert.snoozed_at':       [],
  'alert.snooze_until':     [],
  'alert.resolved_at':      [],
  'alert.resolved_by':      [],
  'alert.source_id':        [],
  'alert.version':          [],
  'alert.expires_at':       [],
  'alert.correlation_id':   [],
  'alert.checksum_state':   [],
  'alert.created_at':       [],
  'alert.updated_at':       [],
  'alert.timestamp':        [],
  'entity.entity_id':       [],
  'entity.product': [
    { value: 'TS',  label: 'TS' },
    { value: 'CP',  label: 'CP' },
    { value: 'AN',  label: 'AN' },
    { value: 'AN3', label: 'AN3' },
  ],
  'entity.amg_id':          [],
  'entity.service':         [],
  'entity.name':            [],
  'entity_cp.automation_url': [
    { value: 'alshallal.amagi.tv',                label: 'alshallal.amagi.tv' },
    { value: 'atpmedia.cloudport.amagi.tv',       label: 'atpmedia.cloudport.amagi.tv' },
    { value: 'blueantmediacanada.amagi.tv',       label: 'blueantmediacanada.amagi.tv' },
    { value: 'blueantmediausa.amagi.tv',          label: 'blueantmediausa.amagi.tv' },
    { value: 'buzzfeed.amagi.tv',                 label: 'buzzfeed.amagi.tv' },
    { value: 'c15studio.cloudport.amagi.tv',      label: 'c15studio.cloudport.amagi.tv' },
    { value: 'caracolfast.cloudport.amagi.tv',    label: 'caracolfast.cloudport.amagi.tv' },
    { value: 'channel4.cloudport.amagi.tv',       label: 'channel4.cloudport.amagi.tv' },
    { value: 'channel5.cloudport.amagi.tv',       label: 'channel5.cloudport.amagi.tv' },
    { value: 'fastmedia.amagi.tv',                label: 'fastmedia.amagi.tv' },
    { value: 'france24.amagi.tv',                 label: 'france24.amagi.tv' },
    { value: 'gong.amagi.tv',                     label: 'gong.amagi.tv' },
    { value: 'hnc.cloudport.amagi.tv',            label: 'hnc.cloudport.amagi.tv' },
    { value: 'ixmedia.cloudport.amagi.tv',        label: 'ixmedia.cloudport.amagi.tv' },
    { value: 'kochmedia.amagi.tv',                label: 'kochmedia.amagi.tv' },
    { value: 'lawandcrimecp.amagi.tv',            label: 'lawandcrimecp.amagi.tv' },
    { value: 'leadstory.cloudport.amagi.tv',      label: 'leadstory.cloudport.amagi.tv' },
    { value: 'lds.amagi.tv',                      label: 'lds.amagi.tv' },
    { value: 'lovetv.amagi.tv',                   label: 'lovetv.amagi.tv' },
    { value: 'mainstream-media.amagi.tv',         label: 'mainstream-media.amagi.tv' },
    { value: 'modus.cloudport.amagi.tv',          label: 'modus.cloudport.amagi.tv' },
    { value: 'narrative.amagi.tv',                label: 'narrative.amagi.tv' },
    { value: 'palatinmedia.amagi.tv',             label: 'palatinmedia.amagi.tv' },
    { value: 'playmedia.cloudport.amagi.tv',      label: 'playmedia.cloudport.amagi.tv' },
    { value: 'qwest.cloudport.amagi.tv',          label: 'qwest.cloudport.amagi.tv' },
    { value: 'samsunguk.amagi.tv',                label: 'samsunguk.amagi.tv' },
    { value: 'samsungus.amagi.tv',                label: 'samsungus.amagi.tv' },
    { value: 'samsungde.amagi.tv',                label: 'samsungde.amagi.tv' },
    { value: 'samsungfr.amagi.tv',                label: 'samsungfr.amagi.tv' },
    { value: 'samsungau.amagi.tv',                label: 'samsungau.amagi.tv' },
    { value: 'samsungca.amagi.tv',                label: 'samsungca.amagi.tv' },
    { value: 'samsungin.amagi.tv',                label: 'samsungin.amagi.tv' },
    { value: 'samsungbr.amagi.tv',                label: 'samsungbr.amagi.tv' },
    { value: 'samsungjp.amagi.tv',                label: 'samsungjp.amagi.tv' },
    { value: 'sport1.cloudport.amagi.tv',         label: 'sport1.cloudport.amagi.tv' },
    { value: 'tern-cloud.amagi.tv',               label: 'tern-cloud.amagi.tv' },
    { value: 'theafricanchannel.amagi.tv',        label: 'theafricanchannel.amagi.tv' },
    { value: 'uktv.cloudport.amagi.tv',           label: 'uktv.cloudport.amagi.tv' },
    { value: 'videosolutions.amagi.tv',           label: 'videosolutions.amagi.tv' },
    { value: 'xitecp.amagi.tv',                   label: 'xitecp.amagi.tv' },
    { value: 'zee1.cloudport.amagi.tv',           label: 'zee1.cloudport.amagi.tv' },
  ],
  'entity_cp.account_domain': [],
  'entity_cp.feed_code':      [],
  'entity_cp.headend_code':   [],
  'entity_cp.playlist_id':    [],
  'entity_cp.playlist_date':  [],
  'entity_cp.asset_id':       [],
  'entity_cp.asset_title':    [],
  'entity_ts.delivery': [
    { value: 'agenticnoc2', label: 'agenticnoc2' },
  ],
  'entity_ts.module':         [],
  'entity_ts.cluster':        [],
  'entity_an3.channel_id':    [],
  'entity_an3.channel_name':  [],
  'entity_an3.domain':        [],
  'infra.cloud':              [],
  'infra.region':             [],
  'infra.cluster':            [],
  'infra.cloud_account':      [],
  'infra.deployment_mode':    [],
};

const PARAM_LABELS: Record<string, string> = {
  'alert.id':                   'alert.id',
  'alert.dedup_key':            'alert.dedup_key',
  'alert.name':                 'alert.name',
  'alert.type':                 'alert.type',
  'alert.description':          'alert.description',
  'alert.severity':             'alert.severity',
  'alert.state':                'alert.state',
  'alert.triggered_at':         'alert.triggered_at',
  'alert.issue_start_time':     'alert.issue_start_time',
  'alert.duration_ms':          'alert.duration_ms',
  'alert.snoozed_by':           'alert.snoozed_by',
  'alert.snoozed_at':           'alert.snoozed_at',
  'alert.snooze_until':         'alert.snooze_until',
  'alert.resolved_at':          'alert.resolved_at',
  'alert.resolved_by':          'alert.resolved_by',
  'alert.source_id':            'alert.source_id',
  'alert.version':              'alert.version',
  'alert.expires_at':           'alert.expires_at',
  'alert.correlation_id':       'alert.correlation_id',
  'alert.checksum_state':       'alert.checksum_state',
  'alert.created_at':           'alert.created_at',
  'alert.updated_at':           'alert.updated_at',
  'alert.timestamp':            'alert.timestamp',
  'entity.entity_id':           'entity.entity_id',
  'entity.product':             'entity.product',
  'entity.amg_id':              'entity.amg_id',
  'entity.service':             'entity.service',
  'entity.name':                'entity.name',
  'entity_cp.automation_url':   'entity_cp.automation_url',
  'entity_cp.account_domain':   'entity_cp.account_domain',
  'entity_cp.feed_code':        'entity_cp.feed_code',
  'entity_cp.headend_code':     'entity_cp.headend_code',
  'entity_cp.playlist_id':      'entity_cp.playlist_id',
  'entity_cp.playlist_date':    'entity_cp.playlist_date',
  'entity_cp.asset_id':         'entity_cp.asset_id',
  'entity_cp.asset_title':      'entity_cp.asset_title',
  'entity_ts.delivery':         'entity_ts.delivery',
  'entity_ts.module':           'entity_ts.module',
  'entity_ts.cluster':          'entity_ts.cluster',
  'entity_an3.channel_id':      'entity_an3.channel_id',
  'entity_an3.channel_name':    'entity_an3.channel_name',
  'entity_an3.domain':          'entity_an3.domain',
  'infra.cloud':                'infra.cloud',
  'infra.region':               'infra.region',
  'infra.cluster':              'infra.cluster',
  'infra.cloud_account':        'infra.cloud_account',
  'infra.deployment_mode':      'infra.deployment_mode',
};

const PARAMETERS = Object.entries(PARAM_LABELS).map(([value, label]) => ({ value, label }));

const OPERATORS = [
  { value: 'is-any-of',        label: 'is any of' },
  { value: 'is-not',           label: 'is not' },
  { value: 'is-all-of',        label: 'is all of' },
  { value: 'contains',         label: 'contains' },
  { value: 'does-not-contain', label: 'does not contain' },
  { value: 'is-empty',         label: 'is empty' },
];

const NUMERIC_OPERATORS = [
  { value: 'eq',  label: '=' },
  { value: 'neq', label: '≠' },
  { value: 'gt',  label: '>' },
  { value: 'gte', label: '≥' },
  { value: 'lt',  label: '<' },
  { value: 'lte', label: '≤' },
  { value: 'is-empty', label: 'is empty' },
];

const NUMERIC_PARAMS = new Set([
  'alert.duration_ms',
  'alert.version',
  'alert.triggered_at',
  'alert.issue_start_time',
  'alert.snoozed_at',
  'alert.snooze_until',
  'alert.resolved_at',
  'alert.created_at',
  'alert.updated_at',
  'alert.timestamp',
  'alert.expires_at',
  'entity_cp.playlist_date',
]);

// Which value UI each operator uses
const OPERATOR_VALUE_TYPE: Record<string, 'multi' | 'text' | 'none'> = {
  'is-any-of':        'multi',
  'is-not':           'multi',
  'is-all-of':        'multi',
  'contains':         'text',
  'does-not-contain': 'text',
  'is-empty':         'none',
  'eq':               'text',
  'neq':              'text',
  'gt':               'text',
  'gte':              'text',
  'lt':               'text',
  'lte':              'text',
};

// ── Helpers ──────────────────────────────────────────────────────────────────

function formatNumericDisplay(raw: string): string {
  if (raw === '') return '';
  const stripped = raw.replace(/,/g, '');
  const [intPart, ...decParts] = stripped.split('.');
  const intNum = parseInt(intPart, 10);
  if (isNaN(intNum) && intPart !== '-') return raw;
  const formattedInt = isNaN(intNum) ? intPart : intNum.toLocaleString('en-US');
  return decParts.length > 0 ? formattedInt + '.' + decParts.join('.') : formattedInt;
}

// ── Segment ──────────────────────────────────────────────────────────────────

interface SegmentProps {
  children: ReactNode;
  onClick?: () => void;
  isActive?: boolean;
  separator?: boolean;
  style?: CSSProperties;
  variant?: Variant;
}

const Segment = forwardRef<HTMLButtonElement, SegmentProps>(
  function Segment({ children, onClick, isActive = false, separator = true, style, variant = 1 }, ref) {
    const [hovered, setHovered] = useState(false);

    const defaultBg = variant === 3 ? 'var(--ds-background-neutral-default)' : 'transparent';
    let bg = defaultBg;
    if (isActive)     bg = 'var(--ds-background-input-hovered)';
    else if (hovered) bg = 'var(--ds-background-input-hovered)';

    const hasSeparator = variant === 1 && separator;

    return (
      <button
        ref={ref}
        type="button"
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          height: (variant === 3 || variant === 4) ? '28px' : '100%',
          padding: '0 10px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: bg,
          border: 'none',
          borderRadius: variant === 3 ? '4px' : variant === 4 ? (isActive ? '4px' : '0px') : undefined,
          borderRight: hasSeparator ? '1px solid var(--ds-border-border-bold)' : 'none',
          borderBottom: variant === 4 ? (isActive ? 'none' : hovered ? 'none' : '1px solid var(--ds-border-border-bold)') : undefined,
          boxShadow: variant === 4 ? (isActive ? 'inset 0 0 0 1px var(--ds-focus-focus)' : 'none') : undefined,
          color: 'var(--ds-text-text-primary)',
          fontSize: 'var(--ds-typography-cozy-medium-body-sm-font-size)',
          fontFamily: 'var(--ds-font-family-normal)',
          fontWeight: 'var(--ds-typography-cozy-medium-body-sm-font-weight)' as React.CSSProperties['fontWeight'],
          letterSpacing: 'var(--ds-typography-cozy-medium-body-sm-letter-spacing)',
          lineHeight: 'var(--ds-typography-cozy-medium-body-sm-line-height)',
          whiteSpace: 'nowrap',
          flexShrink: 0,
          cursor: 'pointer',
          transition: 'background 120ms',
          ...style,
        }}
      >
        {children}
      </button>
    );
  }
);

// ── FilterRow ─────────────────────────────────────────────────────────────────

type ActiveDropdown = 'param' | 'operator' | 'values' | null;

interface FilterRowProps {
  paramValue?: string;
  onRemove: () => void;
  onParamSelected?: () => void;
  width?: string | number;
  variant?: Variant;
  showRemove?: boolean;
}

export function FilterRow({ paramValue, onRemove, onParamSelected, width = '600px', variant = 1, showRemove = false }: FilterRowProps) {
  const [param, setParam] = useState(paramValue ?? '');
  const [operator, setOperator] = useState('is-any-of');
  const [paramQuery, setParamQuery] = useState('');
  const [query, setQuery] = useState('');
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [textValue, setTextValue] = useState('');
  const [error, setError] = useState(false);
  const [active, setActive] = useState<ActiveDropdown>(paramValue ? 'values' : 'param');
  const [hoveredValuesSegment, setHoveredValuesSegment] = useState(false);
  const [numberInputError, setNumberInputError] = useState(false);

  // Derived early so useEffects below can reference it without TDZ issues
  const operatorType = OPERATOR_VALUE_TYPE[operator] ?? 'multi';

  const menuRef = useRef<DsMultiSelectMenuElement>(null);
  const selectAllItemRef = useRef<HTMLElement>(null);

  const containerRef       = useRef<HTMLDivElement>(null);
  const paramRef           = useRef<HTMLButtonElement>(null);
  const operatorRef        = useRef<HTMLButtonElement>(null);
  const valuesRef          = useRef<HTMLButtonElement>(null);
  const valuesV4Ref        = useRef<HTMLDivElement>(null);
  const inputRef           = useRef<HTMLInputElement>(null);
  const paramSearchRef     = useRef<HTMLInputElement>(null);
  const paramDropdownRef   = useRef<HTMLDivElement>(null);
  const operatorDropdownRef= useRef<HTMLDivElement>(null);
  const valuesDropdownRef  = useRef<HTMLDivElement>(null);

  // Auto-focus the right input on mount
  useEffect(() => {
    if (paramValue) inputRef.current?.focus();
    else paramSearchRef.current?.focus();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-focus the correct input whenever the active panel changes
  useEffect(() => {
    if (active === 'param') {
      requestAnimationFrame(() => {
        paramSearchRef.current?.focus();
        // Scroll the currently selected param item to the top of the dropdown
        if (param) {
          const selected = paramDropdownRef.current?.querySelector<HTMLElement>(
            'ds-single-select-menu-item[selected]'
          );
          selected?.scrollIntoView({ block: 'start', behavior: 'instant' });
        }
      });
    } else if (active === 'values') {
      requestAnimationFrame(() => {
        inputRef.current?.focus();
        menuRef.current?.handleMenuOpen?.();
        // Pin "Select all" above any selected items that _applyOrder moved to order:-1
        if (selectAllItemRef.current) {
          selectAllItemRef.current.style.order = '-9999';
        }
      });
    }
  }, [active]);

  // Close on outside click — remove row only if no param; show error if param but no value
  useEffect(() => {
    function onOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        if (!param) { onRemove(); return; }
        const hasValue = selectedValues.length > 0 || textValue !== '' || operatorType === 'none';
        if (!hasValue) setError(true);
        setActive(null);
        setQuery('');
        setParamQuery('');
      }
    }
    document.addEventListener('mousedown', onOutside);
    return () => document.removeEventListener('mousedown', onOutside);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param, selectedValues, textValue, operatorType]);

  // Keyboard navigation: ArrowDown/Up moves through menu items, Escape returns to input
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    function getDropdownItems(): HTMLElement[] {
      const dropdownRef =
        active === 'param'    ? paramDropdownRef :
        active === 'operator' ? operatorDropdownRef :
        active === 'values'   ? valuesDropdownRef : null;
      if (!dropdownRef?.current) return [];
      const items = Array.from(
        dropdownRef.current.querySelectorAll<HTMLElement>(
          'ds-multi-select-menu-item:not([disabled]), ds-single-select-menu-item:not([disabled])'
        )
      );
      // Sort by CSS order to match the visual order set by _applyOrder / Select-all pinning
      return items.sort((a, b) => (parseInt(a.style.order, 10) || 0) - (parseInt(b.style.order, 10) || 0));
    }

    function clearFocused(items: HTMLElement[]) {
      items.forEach(i => i.removeAttribute('data-focused'));
    }

    function onKeyDown(e: KeyboardEvent) {
      if (!['ArrowDown', 'ArrowUp', 'Escape', 'Enter'].includes(e.key)) return;
      const items = getDropdownItems();
      if (!items.length) return;

      e.preventDefault();

      if (e.key === 'Escape') {
        clearFocused(items);
        return;
      }

      const currentIdx = items.findIndex(i => i.hasAttribute('data-focused'));

      if (e.key === 'Enter') {
        if (currentIdx !== -1) {
          // Trigger the item's own click handler through shadow DOM
          const inner = items[currentIdx].shadowRoot?.querySelector<HTMLElement>('.item');
          (inner ?? items[currentIdx]).click();
        }
        return;
      }

      if (e.key === 'ArrowDown') {
        const next = currentIdx === -1 ? 0 : Math.min(currentIdx + 1, items.length - 1);
        clearFocused(items);
        items[next].setAttribute('data-focused', '');
        items[next].scrollIntoView({ block: 'nearest' });
      } else if (e.key === 'ArrowUp') {
        if (currentIdx > 0) {
          clearFocused(items);
          items[currentIdx - 1].setAttribute('data-focused', '');
          items[currentIdx - 1].scrollIntoView({ block: 'nearest' });
        } else {
          clearFocused(items);
        }
      }
    }

    // Pre-highlight first item when dropdown opens (rAF lets Lit elements render first)
    let rafId = requestAnimationFrame(() => {
      const items = getDropdownItems();
      if (items.length > 0) items[0].setAttribute('data-focused', '');
    });

    container.addEventListener('keydown', onKeyDown);
    return () => {
      cancelAnimationFrame(rafId);
      container.removeEventListener('keydown', onKeyDown);
      getDropdownItems().forEach(i => i.removeAttribute('data-focused'));
    };
  }, [active]);

  // Re-highlight first item whenever the search query changes
  useEffect(() => {
    if (active === null) return;
    const dropdownRef =
      active === 'param'    ? paramDropdownRef :
      active === 'operator' ? operatorDropdownRef :
      active === 'values'   ? valuesDropdownRef : null;
    const rafId = requestAnimationFrame(() => {
      if (!dropdownRef?.current) return;
      const items = Array.from(
        dropdownRef.current.querySelectorAll<HTMLElement>(
          'ds-multi-select-menu-item:not([disabled]), ds-single-select-menu-item:not([disabled])'
        )
      );
      items.forEach(i => i.removeAttribute('data-focused'));
      if (items.length > 0) items[0].setAttribute('data-focused', '');
    });
    return () => cancelAnimationFrame(rafId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, paramQuery]);

  function toggle(panel: ActiveDropdown) {
    if (panel === 'values') {
      setError(false);
    }
    setActive(prev => {
      if (prev === panel) { setParamQuery(''); setQuery(''); return null; }
      if (panel !== 'values') setQuery('');
      if (panel !== 'param') setParamQuery('');
      return panel;
    });
    if (panel === 'values') requestAnimationFrame(() => inputRef.current?.focus());
  }

  function handleParamSelect(e: Event) {
    const value: string = (e as CustomEvent).detail?.values?.[0] ?? param;
    setParamQuery('');
    if (value === param) {
      // Same parameter re-selected — just close
      setActive(null);
    } else {
      const wasNumeric = NUMERIC_PARAMS.has(param);
      const isNumeric  = NUMERIC_PARAMS.has(value);
      if (wasNumeric !== isNumeric) {
        setOperator(isNumeric ? 'eq' : 'is-any-of');
      }
      setParam(value);
      setSelectedValues([]);
      setTextValue('');
      setError(false);
      setNumberInputError(false);
      setActive('values');
      onParamSelected?.();
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }

  function handleOperatorSelect(e: Event) {
    const value: string = (e as CustomEvent).detail?.values?.[0] ?? operator;
    const newType = OPERATOR_VALUE_TYPE[value] ?? 'multi';
    const oldType = OPERATOR_VALUE_TYPE[operator] ?? 'multi';
    if (newType !== oldType) {
      setSelectedValues([]);
      setTextValue('');
    }
    setOperator(value);
    // Auto-open and focus the values field for text-type operators
    setActive(newType === 'text' ? 'values' : null);
  }

  function handleValuesChange(e: Event) {
    const fromEvent: string[] = (e as CustomEvent).detail?.values ?? [];
    const hasSelectAll = fromEvent.includes('__select_all__');

    if (hasSelectAll && !allSelected) {
      setSelectedValues(allValues.map(v => v.value));
      setError(false);
      return;
    }

    if (!hasSelectAll && allSelected) {
      setSelectedValues([]);
      return;
    }

    const normalValues = fromEvent.filter(v => v !== '__select_all__');
    setSelectedValues(prev => {
      const visibleKeys = new Set(filtered.map(v => v.value));
      const retained = prev.filter(v => !visibleKeys.has(v));
      const merged = [...retained, ...normalValues];
      if (merged.length > 0) setError(false);
      return merged;
    });
  }

  function removeSelectedValue(value: string) {
    setSelectedValues(prev => prev.filter(v => v !== value));
  }

  const isNumericParam = NUMERIC_PARAMS.has(param);
  const activeOperators = isNumericParam ? NUMERIC_OPERATORS : OPERATORS;
  const paramLabel    = PARAM_LABELS[param] ?? param;
  const operatorLabel = activeOperators.find(o => o.value === operator)?.label ?? operator;
  const allValues     = PARAM_VALUES[param] ?? [];
  const filtered      = query.trim()
    ? allValues.filter(v => v.label.toLowerCase().includes(query.toLowerCase()))
    : allValues;
  const allSelected   = allValues.length > 0 && allValues.every(v => selectedValues.includes(v.value));
  const filteredParams = paramQuery.trim()
    ? PARAMETERS.filter(p => p.label.toLowerCase().includes(paramQuery.toLowerCase()))
    : PARAMETERS;

  // Read segment positions after DOM layout to avoid stale/zero values on mount
  const [segmentLeft, setSegmentLeft] = useState({ param: 0, operator: 0, values: 0 });
  // For v4: capture each dropdown's top/bottom once when it opens, so tag wrapping doesn't shift them.
  const [v4DropdownTop, setV4DropdownTop] = useState({ param: 0, operator: 0, values: 0 });
  const [v4DropdownBottom, setV4DropdownBottom] = useState({ param: 0, operator: 0, values: 0 });
  // Direction each dropdown opens: 'down' (below trigger) or 'up' (above trigger)
  const [dropdownDir, setDropdownDir] = useState<Record<'param' | 'operator' | 'values', 'down' | 'up'>>({
    param: 'down', operator: 'down', values: 'down',
  });
  useLayoutEffect(() => {
    setSegmentLeft({
      param:    paramRef.current?.offsetLeft    ?? 0,
      operator: operatorRef.current?.offsetLeft ?? 0,
      values:   variant === 4
        ? (valuesV4Ref.current?.offsetLeft ?? 0)
        : (valuesRef.current?.offsetLeft   ?? 0),
    });
    if (variant === 4) {
      const containerH = containerRef.current?.offsetHeight ?? 0;
      setV4DropdownTop({
        param:    paramRef.current    ? paramRef.current.offsetTop    + paramRef.current.offsetHeight    + 4 : 0,
        operator: operatorRef.current ? operatorRef.current.offsetTop + operatorRef.current.offsetHeight + 4 : 0,
        values:   valuesV4Ref.current ? valuesV4Ref.current.offsetTop + valuesV4Ref.current.offsetHeight + 4 : 0,
      });
      setV4DropdownBottom({
        param:    paramRef.current    ? containerH - paramRef.current.offsetTop    + 4 : 0,
        operator: operatorRef.current ? containerH - operatorRef.current.offsetTop + 4 : 0,
        values:   valuesV4Ref.current ? containerH - valuesV4Ref.current.offsetTop + 4 : 0,
      });
    }
  }, [active, variant]); // intentionally excludes selectedValues

  // Flip dropdown direction when there isn't enough space below the trigger
  useLayoutEffect(() => {
    if (!active) return;
    const triggerEl =
      active === 'param'    ? paramRef.current :
      active === 'operator' ? operatorRef.current :
      variant === 4         ? valuesV4Ref.current : valuesRef.current;
    if (!triggerEl) return;
    const rect = triggerEl.getBoundingClientRect();
    const dir: 'down' | 'up' = window.innerHeight - rect.bottom < 220 ? 'up' : 'down';
    setDropdownDir(prev => prev[active] === dir ? prev : { ...prev, [active]: dir });
  }, [active, variant]);

  const anyOpen = active !== null;

  const containerWidth = variant === 1 ? width : variant === 4 ? undefined : 'fit-content';

  return (
    <div ref={containerRef} style={{ position: 'relative', width: containerWidth, flex: variant === 4 ? 1 : undefined }}>
      <div
        style={{
          display: 'flex',
          alignItems: variant === 4 ? 'flex-start' : 'center',
          height: variant === 4 ? undefined : '32px',
          minHeight: variant === 4 ? '28px' : undefined,
          borderRadius: '8px 0px 8px 8px',
          gap: variant === 4 ? '8px' : variant === 3 ? '2px' : undefined,
          boxShadow: anyOpen && variant !== 4
            ? 'inset 0 0 0 1px var(--ds-focus-focus)'
            : error && variant !== 4
            ? 'inset 0 0 0 1px var(--ds-border-border-danger)'
            : (variant === 3 || variant === 4)
            ? 'none'
            : 'inset 0 0 0 1px var(--ds-border-border-bold)',
          background: anyOpen && variant !== 4 ? 'var(--ds-background-input-pressed)' : 'transparent',
          transition: 'box-shadow 70ms, background 70ms',
          overflow: variant === 1 ? 'hidden' : 'visible',
        }}
      >
        {/* Segment 1: Parameter */}
        <Segment
          ref={paramRef}
          separator={active !== 'param'}
          isActive={active === 'param'}
          variant={variant}
          style={{
            flex: variant !== 4 && active === 'param' ? 1 : undefined,
            width: variant === 4
              ? (param ? 'auto' : '220px')
              : (active === 'param' ? undefined : (variant !== 1 ? 'auto' : '140px')),
            cursor: active === 'param' ? 'text' : 'pointer',
          }}
          onClick={() => toggle('param')}
        >
          {/* Only show the label when a param is chosen and the param panel is closed */}
          {param && active !== 'param' && <span style={{ flexShrink: 0 }}>{paramLabel}</span>}
          {active === 'param' && (
            variant === 4 && param ? (
              /* Re-click mode: auto-size to label + placeholder + 8px right padding */
              <span style={{ display: 'inline-grid', flexShrink: 0 }}>
                <span aria-hidden style={{
                  gridArea: '1/1', visibility: 'hidden', pointerEvents: 'none',
                  whiteSpace: 'pre', paddingRight: '8px',
                  fontSize: '14px', fontFamily: 'var(--ds-font-family-normal)',
                }}>Search for parameter</span>
                <input
                  ref={paramSearchRef}
                  value={paramQuery}
                  placeholder="Search for parameter"
                  onChange={e => setParamQuery(e.target.value)}
                  onClick={e => e.stopPropagation()}
                  onKeyDown={e => e.stopPropagation()}
                  style={{
                    gridArea: '1/1', width: '100%',
                    background: 'transparent', border: 'none', outline: 'none',
                    color: 'var(--ds-text-text-primary)', font: 'inherit',
                    fontSize: '14px', cursor: 'text',
                  }}
                />
              </span>
            ) : (
              <input
                ref={paramSearchRef}
                value={paramQuery}
                placeholder="Search for parameter"
                onChange={e => setParamQuery(e.target.value)}
                onClick={e => e.stopPropagation()}
                onKeyDown={e => e.stopPropagation()}
                style={{
                  flex: 1,
                  minWidth: 0,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: 'var(--ds-text-text-primary)',
                  font: 'inherit',
                  fontSize: '14px',
                  cursor: 'text',
                }}
              />
            )
          )}
        </Segment>

        {/* Segment 2: Operator — hidden while param panel is open (except V4 always shows) */}
        {(active !== 'param' || variant === 4) && (
          <Segment
            ref={operatorRef}
            separator
            isActive={active === 'operator'}
            onClick={() => toggle('operator')}
            variant={variant}
            style={{ width: variant !== 1 ? 'auto' : '140px' }}
          >
            <span style={{ color: !param ? 'var(--ds-text-text-subtlest)' : undefined }}>{operatorLabel}</span>
          </Segment>
        )}

        {/* Segment 3: Values — hidden while param panel is open or operator has no value (except V4 always shows) */}
        {(active !== 'param' || variant === 4) && operatorType !== 'none' && (
          variant === 4 ? (
            /* V4: inline tag chips + search input */
            <div
              ref={valuesV4Ref}
              onMouseEnter={() => setHoveredValuesSegment(true)}
              onMouseLeave={() => setHoveredValuesSegment(false)}
              style={{
                flex: active === 'values' || operatorType !== 'text' ? 1 : undefined,
                padding: '2px',
                boxSizing: 'border-box',
                display: 'flex',
                flexWrap: operatorType === 'text' ? undefined : 'wrap',
                alignItems: 'center',
                gap: '2px',
                minHeight: '28px',
                borderRadius: active === 'values' ? '4px' : '0px',
                cursor: 'text',
                background: active === 'values' || hoveredValuesSegment ? 'var(--ds-background-input-hovered)' : 'transparent',
                boxShadow: active === 'values'
                  ? ((error || numberInputError) ? 'inset 0 0 0 1px var(--ds-border-border-danger)' : 'inset 0 0 0 1px var(--ds-focus-focus)')
                  : (!hoveredValuesSegment && !(operatorType === 'multi' && selectedValues.length > 0))
                    ? ((error || numberInputError) ? 'inset 0 -1px 0 var(--ds-border-border-danger)' : 'inset 0 -1px 0 var(--ds-border-border-bold)')
                    : 'none',
                transition: 'background 120ms',
              }}
              onClick={() => { if (active !== 'values') { setActive('values'); requestAnimationFrame(() => inputRef.current?.focus()); } }}
            >
              {operatorType === 'text' ? (
                active === 'values' ? (
                  <input
                    ref={inputRef}
                    value={isNumericParam ? formatNumericDisplay(textValue) : textValue}
                    placeholder={isNumericParam ? 'Enter number' : 'Enter value'}
                    onChange={e => {
                      const raw = isNumericParam ? e.target.value.replace(/,/g, '') : e.target.value;
                      setTextValue(raw);
                      if (raw) setError(false);
                      if (isNumericParam) setNumberInputError(raw !== '' && isNaN(Number(raw)));
                      else setNumberInputError(false);
                    }}
                    onClick={e => e.stopPropagation()}
                    style={{
                      flex: 1, minWidth: 0, background: 'transparent', border: 'none', outline: 'none',
                      color: 'var(--ds-text-text-primary)', cursor: 'text',
                      height: '24px', padding: '0 8px', boxSizing: 'border-box',
                      fontFamily: 'var(--ds-typography-cozy-regular-mono-body-md-font-family)',
                      fontSize: 'var(--ds-typography-cozy-regular-body-md-font-size)',
                      fontWeight: 'var(--ds-typography-cozy-regular-body-md-font-weight)' as React.CSSProperties['fontWeight'],
                      lineHeight: 'var(--ds-typography-cozy-regular-body-md-line-height)',
                      letterSpacing: 'var(--ds-typography-cozy-regular-body-md-letter-spacing)',
                    }}
                  />
                ) : (
                  <span
                    style={{
                      display: 'inline-flex', alignItems: 'center',
                      height: '24px', padding: '0 8px',
                      whiteSpace: 'nowrap',
                      color: textValue ? 'var(--ds-text-text-primary)' : (error ? 'var(--ds-text-text-danger)' : 'var(--ds-text-text-subtlest)'),
                      fontFamily: 'var(--ds-typography-cozy-regular-mono-body-md-font-family)',
                      fontSize: 'var(--ds-typography-cozy-regular-body-md-font-size)',
                      fontWeight: 'var(--ds-typography-cozy-regular-body-md-font-weight)' as React.CSSProperties['fontWeight'],
                      lineHeight: 'var(--ds-typography-cozy-regular-body-md-line-height)',
                      letterSpacing: 'var(--ds-typography-cozy-regular-body-md-letter-spacing)',
                    }}
                  >
                    {textValue
                      ? (isNumericParam ? formatNumericDisplay(textValue) : textValue)
                      : (error ? 'Enter value' : isNumericParam ? 'Enter number' : 'Enter value')}
                  </span>
                )
              ) : (
                <>
                  {selectedValues.map(v => {
                    const label = allValues.find(a => a.value === v)?.label ?? v;
                    return (
                      <DsTag key={v} size="sm" label={label} truncate={false} isDismissable onDsTagDismiss={e => { e.stopPropagation(); removeSelectedValue(v); }} />
                    );
                  })}
                  {error && selectedValues.length === 0 && active !== 'values' && (
                    <span style={{
                      display: 'flex', alignItems: 'center',
                      height: '24px', padding: '0 8px',
                      fontSize: '14px', color: 'var(--ds-text-text-danger)',
                      width: '100%', boxSizing: 'border-box',
                    }}>Select value</span>
                  )}
                  {active === 'values' && (
                    <input
                      ref={inputRef}
                      value={query}
                      placeholder="Search for value"
                      onChange={e => setQuery(e.target.value)}
                      onClick={e => e.stopPropagation()}
                      style={{
                        flex: 1, minWidth: '100px',
                        background: 'transparent', border: 'none', outline: 'none',
                        color: 'var(--ds-text-text-primary)', cursor: 'text',
                        height: '24px', padding: '0 8px', boxSizing: 'border-box',
                        fontFamily: 'var(--ds-typography-cozy-regular-mono-body-md-font-family)',
                        fontSize: 'var(--ds-typography-cozy-regular-body-sm-font-size)',
                        fontWeight: 'var(--ds-typography-cozy-regular-body-sm-font-weight)' as React.CSSProperties['fontWeight'],
                        lineHeight: 'var(--ds-typography-cozy-regular-body-sm-line-height)',
                        letterSpacing: 'var(--ds-typography-cozy-regular-body-sm-letter-spacing)',
                      }}
                    />
                  )}
                </>
              )}
            </div>
          ) : (
          <Segment
            ref={valuesRef}
            separator={false}
            isActive={active === 'values'}
            variant={variant}
            style={{
              flex: variant === 1 || active === 'values' ? 1 : undefined,
              width: variant !== 1 && active !== 'values' ? 'auto' : undefined,
              cursor: active === 'values' ? 'text' : 'pointer',
            }}
            onClick={() => toggle('values')}
          >
            {/* Error: no value selected after outside click */}
            {error && active !== 'values' && (
              <span style={{ flexShrink: 0, color: 'var(--ds-text-text-danger)' }}>Select value</span>
            )}
            {/* Multi-select: show count whenever values are selected */}
            {!error && operatorType === 'multi' && selectedValues.length > 0 && (
              <span style={{ flexShrink: 0 }}>{selectedValues.length} selected</span>
            )}
            {/* Text: show the value when closed */}
            {!error && operatorType === 'text' && textValue && active !== 'values' && (
              <span style={{
                flexShrink: 0,
                fontFamily: 'var(--ds-typography-cozy-regular-mono-body-md-font-family)',
                fontSize: 'var(--ds-typography-cozy-regular-body-md-font-size)',
                fontWeight: 'var(--ds-typography-cozy-regular-body-md-font-weight)' as React.CSSProperties['fontWeight'],
                lineHeight: 'var(--ds-typography-cozy-regular-body-md-line-height)',
                letterSpacing: 'var(--ds-typography-cozy-regular-body-md-letter-spacing)',
              }}>{isNumericParam ? formatNumericDisplay(textValue) : textValue}</span>
            )}
            {active === 'values' && operatorType === 'multi' && (
              <input
                ref={inputRef}
                value={query}
                placeholder="Search for values"
                onChange={e => setQuery(e.target.value)}
                onClick={e => e.stopPropagation()}
                style={{
                  flex: 1, minWidth: 0, background: 'transparent', border: 'none',
                  outline: 'none', color: 'var(--ds-text-text-primary)', cursor: 'text',
                  fontFamily: 'var(--ds-typography-cozy-regular-mono-body-md-font-family)',
                  fontSize: 'var(--ds-typography-cozy-regular-body-sm-font-size)',
                  fontWeight: 'var(--ds-typography-cozy-regular-body-sm-font-weight)' as React.CSSProperties['fontWeight'],
                  lineHeight: 'var(--ds-typography-cozy-regular-body-sm-line-height)',
                  letterSpacing: 'var(--ds-typography-cozy-regular-body-sm-letter-spacing)',
                }}
              />
            )}
            {active === 'values' && operatorType === 'text' && (
              <input
                ref={inputRef}
                value={isNumericParam ? formatNumericDisplay(textValue) : textValue}
                placeholder={isNumericParam ? 'Enter number' : 'Enter value'}
                onChange={e => {
                  const raw = isNumericParam ? e.target.value.replace(/,/g, '') : e.target.value;
                  setTextValue(raw);
                  if (raw) setError(false);
                }}
                onClick={e => e.stopPropagation()}
                style={{
                  flex: 1, minWidth: 0, background: 'transparent', border: 'none',
                  outline: 'none', color: 'var(--ds-text-text-primary)', cursor: 'text',
                  fontFamily: 'var(--ds-typography-cozy-regular-mono-body-md-font-family)',
                  fontSize: 'var(--ds-typography-cozy-regular-body-md-font-size)',
                  fontWeight: 'var(--ds-typography-cozy-regular-body-md-font-weight)' as React.CSSProperties['fontWeight'],
                  lineHeight: 'var(--ds-typography-cozy-regular-body-md-line-height)',
                  letterSpacing: 'var(--ds-typography-cozy-regular-body-md-letter-spacing)',
                }}
              />
            )}
          </Segment>
          )
        )}
      </div>

      {/* Remove button — shown once a parameter has been chosen */}
      {param && <button
        type="button"
        onClick={onRemove}
        aria-label="Remove filter"
        style={{
          position: 'absolute',
          right: '-28px',
          top: '0',
          background: 'transparent',
          border: 'none',
          color: 'var(--ds-text-text-secondary)',
          cursor: 'pointer',
          padding: '4px',
          lineHeight: 1,
          fontSize: '16px',
        }}
      >
        ×
      </button>}

      {/* Parameter dropdown */}
      {active === 'param' && (
        <div
          ref={paramDropdownRef}
          style={{
            position: 'absolute',
            ...(dropdownDir.param === 'down'
              ? { top: variant === 4 ? `${v4DropdownTop.param}px` : 'calc(100% + 4px)' }
              : { bottom: variant === 4 ? `${v4DropdownBottom.param}px` : 'calc(100% + 4px)' }),
            left: segmentLeft.param,
            zIndex: 100,
            '--ds-focus-focus': 'transparent',
          } as React.CSSProperties}
          onMouseDown={e => e.preventDefault()}
        >
          <DsSingleSelectMenu onDsSelectMenuChange={handleParamSelect}>
            {filteredParams.map(p => (
              <DsSingleSelectMenuItem key={p.value} value={p.value} selected={p.value === param}>
                {p.label}
              </DsSingleSelectMenuItem>
            ))}
          </DsSingleSelectMenu>
        </div>
      )}

      {/* Operator dropdown */}
      {active === 'operator' && (
        <div
          ref={operatorDropdownRef}
          style={{
            position: 'absolute',
            ...(dropdownDir.operator === 'down'
              ? { top: variant === 4 ? `${v4DropdownTop.operator}px` : 'calc(100% + 4px)' }
              : { bottom: variant === 4 ? `${v4DropdownBottom.operator}px` : 'calc(100% + 4px)' }),
            left: segmentLeft.operator,
            zIndex: 100,
            '--ds-focus-focus': 'transparent',
          } as React.CSSProperties}
          onMouseDown={e => e.preventDefault()}
        >
          <DsSingleSelectMenu onDsSelectMenuChange={handleOperatorSelect}>
            {activeOperators.map(o => (
              <DsSingleSelectMenuItem key={o.value} value={o.value} selected={o.value === operator}>
                {o.label}
              </DsSingleSelectMenuItem>
            ))}
          </DsSingleSelectMenu>
        </div>
      )}

      {/* Values dropdown — only for multi-select operators */}
      {active === 'values' && operatorType === 'multi' && (
        <div
          ref={valuesDropdownRef}
          style={{
            position: 'absolute',
            ...(dropdownDir.values === 'down'
              ? { top: 'calc(100% + 4px)' }
              : { bottom: 'calc(100% + 4px)' }),
            left: segmentLeft.values,
            right: 0,
            zIndex: 100,
            '--ds-focus-focus': 'transparent',
          } as React.CSSProperties}
          onMouseDown={e => e.preventDefault()}
        >
          <DsMultiSelectMenu ref={menuRef} selectionFeedback="top-after-reopen" style={{ width: '100%' }} onDsSelectMenuChange={handleValuesChange}>
            {allValues.length > 10 && (
              <DsMultiSelectMenuItem ref={selectAllItemRef} key="__select_all__" value="__select_all__" selected={allSelected}>
                Select all
              </DsMultiSelectMenuItem>
            )}
            {filtered.map(v => (
              <DsMultiSelectMenuItem key={v.value} value={v.value} selected={selectedValues.includes(v.value)}>
                {v.label}
              </DsMultiSelectMenuItem>
            ))}
          </DsMultiSelectMenu>
        </div>
      )}
    </div>
  );
}
