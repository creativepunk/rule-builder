import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { CSSProperties } from 'react';
import { DsButton } from './components/DsButton';
import { FilterRow } from './components/FilterRow';
import { DsActionMenu, DsActionMenuItem } from './components/DsActionMenu';
import { DsIconButton } from './components/DsIconButton';
import { DsIcon } from './components/DsIcon';

export type Variant = 1 | 3 | 4;

type Connector = 'and' | 'or';
interface FilterEntry { id: string }
interface GroupEntry { id: string; name: string }
type TopLevelItem = { id: string; type: 'filter' } | { id: string; type: 'group' };

const V2_LABEL: CSSProperties = {
  width: '37px', height: '28px', flexShrink: 0,
  display: 'flex', alignItems: 'center', gap: '4px',
  fontSize: '14px', fontFamily: 'inherit',
};

const V1_LABEL: CSSProperties = {
  width: '50px', height: '28px', flexShrink: 0,
  display: 'flex', alignItems: 'center', gap: '2px',
  fontSize: '14px', fontFamily: 'inherit',
};

// ── Connector between two rows / groups ───────────────────────────────────────

function FilterConnector({ value, onToggle }: { value: Connector; onToggle: () => void }) {
  const color = value === 'or' ? 'var(--ds-text-text-warning)' : 'var(--ds-text-text-success)';
  return (
    <button
      type="button"
      onClick={onToggle}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        background: 'transparent',
        border: 'none',
        padding: 0,
        cursor: 'pointer',
        margin: '2px 0',
        paddingBottom: '8px',
        paddingLeft: '12px',
      }}
    >
      <span style={{ color, fontSize: '14px', fontFamily: 'inherit', fontWeight: 500, lineHeight: 1 }}>
        {value === 'and' ? 'And' : 'Or'}
      </span>
      <span className="material-symbols-rounded" style={{ fontSize: '16px', color: 'var(--ds-icon-icon-subtle)', userSelect: 'none', lineHeight: 1 }}>
        expand_all
      </span>
    </button>
  );
}

// ── Filter group ──────────────────────────────────────────────────────────────

function FilterGroup({ onRemove, variant = 1, onParamSelected, defaultConnector = 'or' }: { onRemove: () => void; variant?: Variant; onParamSelected?: () => void; showRemove?: boolean; defaultConnector?: Connector }) {
  // initialId is used for both the first filter and the initial pendingId
  const initialId = React.useRef(crypto.randomUUID());
  const [filters, setFilters] = useState<FilterEntry[]>([{ id: initialId.current }]);
  const [connectors, setConnectors] = useState<Connector[]>([]);
  const [pendingId, setPendingId] = useState<string | null>(initialId.current);
  const [hoveredFilterId, setHoveredFilterId] = useState<string | null>(null);

  function addFilter() {
    const id = crypto.randomUUID();
    setPendingId(id);
    setFilters(prev => {
      setConnectors(c => [...c, defaultConnector]);
      return [...prev, { id }];
    });
  }

  function removeFilter(id: string) {
    if (id === pendingId) setPendingId(null);
    setFilters(prev => {
      const next = prev.filter(f => f.id !== id);
      if (next.length === 0) { onRemove(); return prev; }
      const idx = prev.findIndex(f => f.id === id);
      setConnectors(c => {
        const nc = [...c];
        nc.splice(Math.max(0, idx - 1), 1);
        return nc;
      });
      return next;
    });
  }

  function toggleConnector() {
    setConnectors(prev => {
      const next = prev[0] === 'and' ? 'or' : 'and';
      return prev.map(() => next);
    });
  }

  const groupConnector: Connector = connectors.length > 0 ? connectors[0] : defaultConnector;
  const headerLabel = groupConnector === 'or' ? 'Any of the following are true' : 'All of the following are true';

  return (
    <div style={{ position: 'relative', width: variant !== 1 ? undefined : '600px', flex: variant !== 1 ? 1 : undefined }}>
      <div style={{
        padding: '12px 40px 12px 12px',
        borderRadius: '6px',
        background: variant !== 1 ? 'transparent' : 'var(--ds-background-input-pressed)',
        boxShadow: 'inset 0 0 0 1px var(--ds-border-border-bold)',
      }}>
        {/* Header */}
        {variant === 4 ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '10px', fontSize: '14px', fontFamily: 'inherit', color: 'var(--ds-text-text-subtle)' }}>
            <button
              type="button"
              onClick={toggleConnector}
              style={{ display: 'flex', alignItems: 'center', gap: '2px', background: 'transparent', border: 'none', padding: 0, cursor: 'pointer', color: 'var(--ds-text-text-subtle)', fontSize: '14px', fontFamily: 'inherit', fontWeight: 500 }}
            >
              {groupConnector === 'and' ? 'All' : 'Any'}
              <span className="material-symbols-rounded" style={{ fontSize: '16px', color: 'var(--ds-icon-icon-subtle)', userSelect: 'none', lineHeight: 1 }}>expand_all</span>
            </button>
            <span>of the following are true,</span>
          </div>
        ) : (
          <div style={{ fontSize: '12px', color: 'var(--ds-text-text-subtle)', fontFamily: 'inherit', marginBottom: '10px' }}>
            {headerLabel}
          </div>
        )}

        {/* Filter rows inside group — same unified pattern as top-level items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {filters.map((filter, i) => (
            <div key={filter.id}
              onMouseEnter={() => setHoveredFilterId(filter.id)}
              onMouseLeave={() => setHoveredFilterId(null)}
              style={{
                display: variant !== 1 ? 'flex' : 'block',
                alignItems: variant !== 1 ? 'flex-start' : undefined,
                gap: variant !== 1 ? '8px' : undefined,
              }}>
              {/* Child index 0 */}
              {variant === 1 && i > 0
                ? <FilterConnector value={connectors[i - 1]} onToggle={toggleConnector} />
                : variant !== 1
                  ? i === 0
                    ? <span style={{ ...V2_LABEL, color: 'var(--ds-text-text-subtlest)', userSelect: 'none' }}>The</span>
                    : variant === 4
                      ? <span style={{ ...V2_LABEL, color: 'var(--ds-text-text-subtlest)', userSelect: 'none' }}>{groupConnector === 'or' ? 'Or' : 'And'}</span>
                      : i === 1
                        ? <button type="button" onClick={toggleConnector} style={{ ...V2_LABEL, background: 'transparent', border: 'none', padding: 0, cursor: 'pointer', color: 'var(--ds-text-text-subtlest)', fontWeight: 500 }}>
                            {groupConnector === 'or' ? 'Or' : 'And'}
                            <span className="material-symbols-rounded" style={{ fontSize: '16px', color: 'var(--ds-icon-icon-subtlest)', userSelect: 'none', lineHeight: 1 }}>expand_all</span>
                          </button>
                        : <span style={{ ...V2_LABEL, color: 'var(--ds-text-text-subtlest)', userSelect: 'none' }}>{groupConnector === 'or' ? 'Or' : 'And'}</span>
                  : null
              }
              {/* Child index 1: stable position */}
              <FilterRow
                onRemove={() => removeFilter(filter.id)}
                onParamSelected={filter.id === pendingId ? () => {
                  setPendingId(null);
                  if (filter.id === initialId.current) onParamSelected?.();
                } : undefined}
                width={variant === 1 ? '100%' : undefined}
                variant={variant}
                showRemove={filter.id === hoveredFilterId}
              />
            </div>
          ))}
        </div>

        {/* Add filter — hidden while a new row is still in param-picking mode */}
        {pendingId === null && (
          <div style={{ marginTop: '8px' }}>
            <DsButton variant="tertiary" size="sm" onDsClick={addFilter}>Add filter</DsButton>
          </div>
        )}
      </div>

      {/* Remove group × — outside the border, aligned to top edge */}
      <button
        type="button"
        onClick={onRemove}
        aria-label="Remove filter group"
        style={{
          position: 'absolute',
          right: '-28px',
          top: '6px',
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
      </button>
    </div>
  );
}

// ── AI Query Input ────────────────────────────────────────────────────────────


// ── FilterSection ─────────────────────────────────────────────────────────────

function FilterSection({ title, variant, defaultConnector = 'and' }: { title: string; variant: Variant; defaultConnector?: Connector }) {
  const [items, setItems] = useState<TopLevelItem[]>([]);
  const [connectors, setConnectors] = useState<Connector[]>([]);
  const [pendingItemId, setPendingItemId] = useState<string | null>(null);
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);

  const groupDefaultConnector: Connector = defaultConnector === 'and' ? 'or' : 'and';

  function addFilter() {
    const id = crypto.randomUUID();
    setPendingItemId(id);
    setItems(prev => {
      if (prev.length > 0) setConnectors(c => [...c, defaultConnector]);
      return [...prev, { id, type: 'filter' }];
    });
  }

  function addFilterGroup() {
    const id = crypto.randomUUID();
    setPendingItemId(id);
    setItems(prev => {
      if (prev.length > 0) setConnectors(c => [...c, defaultConnector]);
      return [...prev, { id, type: 'group' }];
    });
  }

  function removeItem(id: string) {
    if (id === pendingItemId) setPendingItemId(null);
    setItems(prev => {
      const idx = prev.findIndex(item => item.id === id);
      setConnectors(c => {
        const next = [...c];
        next.splice(Math.max(0, idx - 1), 1);
        return next;
      });
      return prev.filter(item => item.id !== id);
    });
  }

  function toggleConnector() {
    setConnectors(prev => {
      const next = prev[0] === 'and' ? 'or' : 'and';
      return prev.map(() => next);
    });
  }

  const itemsAndButtons = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
      {/* Unified render — FilterRow/FilterGroup always at child index 1 so React
          preserves their state when variant switches. Only styles change. */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {items.map((item, i) => {
          const labelStyle = item.type === 'group' ? { ...V2_LABEL, height: '40px' } : V2_LABEL;
          return (
            <div key={item.id}
              onMouseEnter={() => setHoveredItemId(item.id)}
              onMouseLeave={() => setHoveredItemId(null)}
              style={{
                display: variant !== 1 ? 'flex' : 'block',
                alignItems: variant !== 1 ? 'flex-start' : undefined,
                gap: variant !== 1 ? '8px' : undefined,
              }}>
              {/* Child index 0: connector (v1) or label (v2/3/4) */}
              {variant === 1 && i > 0
                ? <FilterConnector value={connectors[i - 1]} onToggle={toggleConnector} />
                : variant !== 1
                  ? i === 0
                    ? <span style={{ ...labelStyle, color: 'var(--ds-text-text-subtlest)', userSelect: 'none' }}>
                        {variant === 4
                          ? (item.type === 'filter' ? 'The' : 'This')
                          : 'Where'}
                      </span>
                    : variant === 4
                      ? <span style={{ ...labelStyle, color: 'var(--ds-text-text-subtlest)', userSelect: 'none' }}>{connectors[i - 1] === 'and' ? 'And' : 'Or'}</span>
                      : i === 1
                        ? <button type="button" onClick={toggleConnector} style={{ ...labelStyle, background: 'transparent', border: 'none', padding: 0, cursor: 'pointer', color: 'var(--ds-text-text-subtlest)', fontWeight: 500 }}>
                            {connectors[i - 1] === 'and' ? 'And' : 'Or'}
                            <span className="material-symbols-rounded" style={{ fontSize: '16px', color: 'var(--ds-icon-icon-subtlest)', userSelect: 'none', lineHeight: 1 }}>expand_all</span>
                          </button>
                        : <span style={{ ...labelStyle, color: 'var(--ds-text-text-subtlest)', userSelect: 'none' }}>{connectors[i - 1] === 'and' ? 'And' : 'Or'}</span>
                  : null
              }
              {/* Child index 1: content — stable position preserves state on variant switch */}
              {item.type === 'filter' ? (
                <FilterRow
                  onRemove={() => removeItem(item.id)}
                  variant={variant}
                  onParamSelected={item.id === pendingItemId ? () => setPendingItemId(null) : undefined}
                  showRemove={item.id === hoveredItemId}
                />
              ) : (
                <FilterGroup
                  onRemove={() => removeItem(item.id)}
                  variant={variant}
                  onParamSelected={item.id === pendingItemId ? () => setPendingItemId(null) : undefined}
                  showRemove={item.id === hoveredItemId}
                  defaultConnector={groupDefaultConnector}
                />
              )}
            </div>
          );
        })}
      </div>

      {pendingItemId === null && (
        <div style={{ display: 'flex', gap: '8px', marginTop: items.length > 0 ? '4px' : '0' }}>
          <DsButton variant="tertiary" size="sm" onDsClick={addFilter}>Add filter</DsButton>
          <DsButton variant="tertiary" size="sm" onDsClick={addFilterGroup}>Add filter group</DsButton>
        </div>
      )}
    </div>
  );

  if (variant === 4) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ fontSize: 'var(--ds-typography-cozy-regular-body-md-font-size)', fontFamily: 'var(--ds-font-family-normal)', fontWeight: 'var(--ds-typography-cozy-regular-body-md-font-weight)' as React.CSSProperties['fontWeight'], letterSpacing: 'var(--ds-typography-cozy-regular-body-md-letter-spacing)', lineHeight: 'var(--ds-typography-cozy-regular-body-md-line-height)', color: 'var(--ds-text-text-primary)' }}>
          {title}
        </div>
        {items.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px', fontFamily: 'inherit', color: 'var(--ds-text-text-subtle)' }}>
            <button
              type="button"
              onClick={toggleConnector}
              style={{ display: 'flex', alignItems: 'center', gap: '2px', background: 'transparent', border: 'none', padding: 0, cursor: 'pointer', color: 'var(--ds-text-text-subtle)', fontSize: '14px', fontFamily: 'inherit', fontWeight: 500 }}
            >
              {(connectors[0] ?? defaultConnector) === 'and' ? 'All' : 'Any'}
              <span className="material-symbols-rounded" style={{ fontSize: '16px', color: 'var(--ds-icon-icon-subtle)', userSelect: 'none', lineHeight: 1 }}>expand_all</span>
            </button>
            <span>of the following are true,</span>
          </div>
        )}
        {itemsAndButtons}
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {/* Section title */}
      <div style={{ fontSize: 'var(--ds-typography-cozy-regular-body-md-font-size)', fontFamily: 'var(--ds-font-family-normal)', fontWeight: 'var(--ds-typography-cozy-regular-body-md-font-weight)' as React.CSSProperties['fontWeight'], letterSpacing: 'var(--ds-typography-cozy-regular-body-md-letter-spacing)', lineHeight: 'var(--ds-typography-cozy-regular-body-md-line-height)', color: 'var(--ds-text-text-primary)' }}>
        {title}
      </div>
      {itemsAndButtons}
    </div>
  );
}

// ── Filter Group V1 ──────────────────────────────────────────────────────────

function FilterGroupV1({ name, onNameChange, onRemove }: {
  name: string;
  onNameChange: (n: string) => void;
  onRemove: () => void;
}) {
  const initialId = React.useRef(crypto.randomUUID());
  const [filters, setFilters] = useState<FilterEntry[]>([{ id: initialId.current }]);
  const [connector, setConnector] = useState<Connector>('and');
  const [pendingId, setPendingId] = useState<string | null>(initialId.current);
  const [hoveredFilterId, setHoveredFilterId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(name);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPos, setMenuPos] = useState<{ top?: number; bottom?: number; left: number } | null>(null);
  const [menuBtnHovered, setMenuBtnHovered] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const menuContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editingName) {
      nameInputRef.current?.focus();
      nameInputRef.current?.select();
    }
  }, [editingName]);

  useEffect(() => {
    if (!menuOpen) return;
    function handleClick(e: MouseEvent) {
      if (
        menuContainerRef.current && !menuContainerRef.current.contains(e.target as Node) &&
        menuBtnRef.current && !menuBtnRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [menuOpen]);

  function addFilter() {
    const id = crypto.randomUUID();
    setPendingId(id);
    setFilters(prev => [...prev, { id }]);
  }

  function removeFilter(id: string) {
    if (id === pendingId) setPendingId(null);
    setFilters(prev => {
      const next = prev.filter(f => f.id !== id);
      if (next.length === 0) { onRemove(); return prev; }
      return next;
    });
  }

  function commitName() {
    setEditingName(false);
    onNameChange(nameInput.trim() || name);
  }

  function cancelName() {
    setNameInput(name);
    setEditingName(false);
  }

  function openMenu(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const openUp = window.innerHeight - rect.bottom < 100;
    setMenuPos(openUp
      ? { bottom: window.innerHeight - rect.top + 4, left: rect.right }
      : { top: rect.bottom + 4, left: rect.right }
    );
    setMenuOpen(prev => !prev);
  }

  function handleMenuAction(e: Event) {
    const detail = (e as CustomEvent).detail as { value: string };
    if (detail.value === 'edit') {
      setNameInput(name);
      setEditingName(true);
    } else if (detail.value === 'delete') {
      onRemove();
    }
    setMenuOpen(false);
  }

  const tabTextStyles: CSSProperties = {
    color: 'var(--ds-text-text-subtlest)',
    fontFamily: 'var(--ds-typography-cozy-helper-helper-medium-font-family)',
    fontSize: '14px',
    fontWeight: 'var(--ds-typography-cozy-helper-helper-medium-font-weight)' as CSSProperties['fontWeight'],
    lineHeight: 'var(--ds-typography-cozy-helper-helper-medium-line-height)',
    letterSpacing: 'var(--ds-typography-cozy-helper-helper-medium-letter-spacing)',
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Rule tab — top-right corner, floats above box with no layout impact */}
      <div style={{ position: 'absolute', top: 0, right: 0, transform: 'translateY(-100%)' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          background: '#222222',
          borderTop: '1px solid #000000',
          borderLeft: '1px solid #000000',
          borderRadius: '6px 0px 0 0',
          height: '24px',
        }}>
          {editingName ? (
            <span style={{ display: 'inline-grid' }}>
              <span aria-hidden style={{
                gridArea: '1/1', visibility: 'hidden', pointerEvents: 'none',
                whiteSpace: 'pre', padding: '0 10px',
                height: '24px', display: 'flex', alignItems: 'center',
                ...tabTextStyles,
              }}>{nameInput || ' '}</span>
              <input
                ref={nameInputRef}
                className="group-name-input"
                value={nameInput}
                onChange={e => setNameInput(e.target.value)}
                onBlur={cancelName}
                onKeyDown={e => {
                  if (e.key === 'Enter') commitName();
                  if (e.key === 'Escape') cancelName();
                  e.stopPropagation();
                }}
                style={{
                  gridArea: '1/1', width: '100%',
                  height: '24px',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  padding: '0 10px',
                  textAlign: 'right',
                  ...tabTextStyles,
                }}
              />
            </span>
          ) : (
            <span style={{ padding: '0 6px 0 10px', whiteSpace: 'nowrap', userSelect: 'none', ...tabTextStyles }}>
              {name}
            </span>
          )}
          <button
            ref={menuBtnRef}
            type="button"
            aria-label="Rule options"
            onClick={openMenu}
            onMouseEnter={() => setMenuBtnHovered(true)}
            onMouseLeave={() => setMenuBtnHovered(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '20px',
              height: '20px',
              margin: '0 2px',
              background: menuBtnHovered ? 'rgba(255,255,255,0.08)' : 'transparent',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              color: menuBtnHovered ? 'var(--ds-icon-icon-default)' : 'var(--ds-icon-icon-subtlest)',
              transition: 'background 120ms, color 120ms',
              flexShrink: 0,
            }}
          >
            <span className="material-symbols-rounded" style={{ fontSize: '16px', userSelect: 'none', lineHeight: 1 }}>more_vert</span>
          </button>
        </div>
      </div>

      {/* Confirm/Cancel — absolute right of group, vertical stack, only while editing */}
      {editingName && (
        <div style={{ position: 'absolute', top: -24, left: 'calc(100% + 8px)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span onMouseDown={e => e.preventDefault()}>
            <DsIconButton
              variant="primary"
              size="sm"
              aria-label="Confirm name"
              onDsClick={commitName}
            >
              <DsIcon name="check" size="sm" />
            </DsIconButton>
          </span>
          <span onMouseDown={e => e.preventDefault()}>
            <DsIconButton
              variant="tertiary"
              size="sm"
              aria-label="Cancel name change"
              onDsClick={cancelName}
            >
              <DsIcon name="close" size="sm" />
            </DsIconButton>
          </span>
        </div>
      )}

      {menuOpen && menuPos && createPortal(
        <div
          ref={menuContainerRef}
          style={{ position: 'fixed', top: menuPos.top, bottom: menuPos.bottom, left: menuPos.left - 160, zIndex: 9999, minWidth: '160px' }}
        >
          <DsActionMenu onDsMenuAction={handleMenuAction as any}>
            <DsActionMenuItem value="edit">Edit rule name</DsActionMenuItem>
            <DsActionMenuItem value="delete" variant="danger">Delete rule</DsActionMenuItem>
          </DsActionMenu>
        </div>,
        document.body
      )}

      {/* Bordered box */}
      <div style={{
        background: 'linear-gradient(to right, #202020 0%, #161616 15%, #161616 85%, #202020 100%)',
        borderTop: '2px solid #000000',
        borderBottom: '2px solid #000000',
      }}>
        {/* Filter rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
          {filters.map((filter, i) => (
            <React.Fragment key={filter.id}>
              <div
                onMouseEnter={() => setHoveredFilterId(filter.id)}
                onMouseLeave={() => setHoveredFilterId(null)}
                style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', padding: '12px 36px 12px 12px' }}
              >
                {i === 0 ? (
                  <span style={{ ...V1_LABEL, color: 'var(--ds-text-text-subtlest)', userSelect: 'none' }}>Where</span>
                ) : (
                  <button
                    type="button"
                    onClick={() => setConnector(c => c === 'and' ? 'or' : 'and')}
                    style={{ ...V1_LABEL, background: 'transparent', border: 'none', padding: 0, cursor: 'pointer', color: 'var(--ds-text-text-subtlest)', fontWeight: 500 }}
                  >
                    {connector === 'and' ? 'And' : 'Or'}
                    <span className="material-symbols-rounded" style={{ fontSize: '16px', color: 'var(--ds-icon-icon-subtlest)', userSelect: 'none', lineHeight: 1 }}>expand_all</span>
                  </button>
                )}
                <FilterRow
                  onRemove={() => removeFilter(filter.id)}
                  onParamSelected={filter.id === pendingId ? () => setPendingId(null) : undefined}
                  variant={4}
                  showRemove={filter.id === hoveredFilterId}
                />
              </div>
              <div style={{ width: '30%', height: '1px', background: 'linear-gradient(to right, #161616, #000000)', marginLeft: 'auto' }} />
            </React.Fragment>
          ))}
        </div>

        {/* Add filter row */}
        <div style={{ padding: '12px', display: 'flex', justifyContent: 'flex-end' }}>
          <DsButton variant="ghost" size="sm" onDsClick={addFilter}>+ Add</DsButton>
        </div>
      </div>
    </div>
  );
}

// ── Filter Section V1 ─────────────────────────────────────────────────────────

function FilterSectionV1({ title }: { title: string }) {
  const [groups, setGroups] = useState<GroupEntry[]>(() => [{ id: crypto.randomUUID(), name: 'Rule 1' }]);
  const [connectors, setConnectors] = useState<Connector[]>([]);

  function addGroup() {
    const id = crypto.randomUUID();
    setGroups(prev => {
      const num = prev.length + 1;
      setConnectors(c => [...c, 'and']);
      return [...prev, { id, name: `Rule ${num}` }];
    });
  }

  function removeGroup(id: string) {
    setGroups(prev => {
      const idx = prev.findIndex(g => g.id === id);
      setConnectors(c => {
        const next = [...c];
        next.splice(Math.max(0, idx - 1), 1);
        return next;
      });
      return prev.filter(g => g.id !== id);
    });
  }

  function updateGroupName(id: string, n: string) {
    setGroups(prev => prev.map(g => g.id === id ? { ...g, name: n } : g));
  }

  function toggleConnector(idx: number) {
    setConnectors(prev => prev.map((c, i) => i === idx ? (c === 'and' ? 'or' : 'and') : c));
  }

  const titleStyle: CSSProperties = {
    fontSize: 'var(--ds-typography-cozy-regular-body-md-font-size)',
    fontFamily: 'var(--ds-font-family-normal)',
    fontWeight: 'var(--ds-typography-cozy-regular-body-md-font-weight)' as CSSProperties['fontWeight'],
    letterSpacing: 'var(--ds-typography-cozy-regular-body-md-letter-spacing)',
    lineHeight: 'var(--ds-typography-cozy-regular-body-md-line-height)',
    color: 'var(--ds-text-text-primary)',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <div style={{ ...titleStyle, marginBottom: '12px' }}>{title}</div>
      {groups.map((group, i) => (
        <React.Fragment key={group.id}>
          {i > 0 && (
            <DsButton
              variant="tertiary"
              size="md"
              onDsClick={() => toggleConnector(i - 1)}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--ds-text-text-subtle)' }}>
                {connectors[i - 1] === 'and' ? 'And' : 'Or'}
                <span className="material-symbols-rounded" style={{ fontSize: '16px', userSelect: 'none', lineHeight: 1, color: 'var(--ds-icon-icon-subtle)' }}>expand_all</span>
              </span>
            </DsButton>
          )}
          <FilterGroupV1
            name={group.name}
            onNameChange={n => updateGroupName(group.id, n)}
            onRemove={() => removeGroup(group.id)}
          />
        </React.Fragment>
      ))}
      <div style={{ marginTop: '8px' }}>
        <DsButton variant="tertiary" size="md" onDsClick={addGroup}>+ Add</DsButton>
      </div>
    </div>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────

function App() {
  const [variant, setVariant] = useState<Variant>(3);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '747px' }}>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
        {variant === 1 ? (
          <>
            <FilterSectionV1 title="Include alerts" />
            <FilterSectionV1 title="Exclude alerts" />
          </>
        ) : (
          <>
            <FilterSection title="Include alerts where," variant={variant} />
            <FilterSection title="Exclude alerts where," variant={variant} defaultConnector="or" />
          </>
        )}
      </div>

      {/* Variant switcher — fixed to viewport bottom */}
      <div style={{ position: 'fixed', bottom: '16px', right: '24px', zIndex: 1000 }}>
        <select
          value={variant}
          onChange={e => setVariant(Number(e.target.value) as Variant)}
          style={{
            background: 'var(--ds-elevation-default)',
            border: '1px solid var(--ds-border-border-subtle)',
            borderRadius: '4px',
            color: 'var(--ds-text-text-subtlest)',
            fontSize: '11px',
            fontFamily: 'inherit',
            padding: '3px 6px',
            cursor: 'pointer',
            outline: 'none',
          }}
        >
          {([1, 3, 4] as Variant[]).map(v => (
            <option key={v} value={v}>Iteration {v}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default App;
