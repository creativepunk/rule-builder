var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { resetStyles, typographyBaseStyles, typographyStyles, insetFocusRingStyles, } from '../shared/styles.js';
import { dispatch } from '../shared/events.js';
/** @tagname ds-search */
let DsSearch = class DsSearch extends LitElement {
    constructor() {
        super(...arguments);
        this.variant = 'expandable-ghost';
        /** Placeholder text shown when the input is empty. */
        this.placeholder = 'Search';
        /** Reflects whether input has a non-empty value — used by CSS to show/hide clear. */
        this.hasValue = false;
        this.ariaLabel = null;
        /** Disables the input and all interaction. */
        this.disabled = false;
        /** Controlled value — synced to the internal input. */
        this.value = '';
        /** Native input name attribute for form submission. */
        this.name = '';
        /** Accessible label for the clear button (i18n). */
        this.closeButtonAssistiveText = 'Clear search';
        this._expanded = false;
        this._inputValue = '';
        this._onDocPointerDown = (e) => {
            if (this.variant === 'expanded' || !this._expanded)
                return;
            if (this.contains(e.target) || this.shadowRoot?.contains(e.target))
                return;
            if (!this._inputValue) {
                this._expanded = false;
            }
        };
        this._onContainerClick = (e) => {
            if (this.disabled)
                return;
            if (this._expanded || this.variant === 'expanded') {
                // Already open — just focus the input if the click wasn't on the input itself
                if (e.target !== this._inputEl) {
                    this._inputEl?.focus();
                }
                return;
            }
            this._expanded = true;
            this.updateComplete.then(() => {
                this._inputEl?.focus();
            });
            dispatch(this, 'ds-search-expand', { originalEvent: e });
        };
        this._onInput = (e) => {
            const input = e.target;
            this._inputValue = input.value;
            this.hasValue = this._inputValue.length > 0;
            dispatch(this, 'ds-input', { value: this._inputValue, originalEvent: e });
        };
        this._onClear = (e) => {
            e.stopPropagation();
            this._inputValue = '';
            this.hasValue = false;
            if (this._inputEl) {
                this._inputEl.value = '';
                this._inputEl.focus();
            }
            dispatch(this, 'ds-search-clear', { originalEvent: e });
            dispatch(this, 'ds-input', { value: '', originalEvent: e });
        };
        this._onKeyDown = (e) => {
            if (e.key === 'Escape' && this.variant !== 'expanded' && !this._inputValue) {
                this._expanded = false;
            }
        };
    }
    connectedCallback() {
        super.connectedCallback();
        document.addEventListener('pointerdown', this._onDocPointerDown);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        document.removeEventListener('pointerdown', this._onDocPointerDown);
    }
    willUpdate(changed) {
        if (changed.has('value')) {
            this._inputValue = this.value;
            this.hasValue = this.value.length > 0;
        }
    }
    render() {
        const isCollapsible = this.variant !== 'expanded';
        const showTextArea = this._expanded || !isCollapsible;
        const iconSearch = html `
      <span
        class="icon-search"
        aria-hidden="true"
        @pointerdown=${(e) => {
            if (this._expanded || this.variant === 'expanded')
                e.preventDefault();
        }}
      >
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.9167 10.0833L13.75 12.9167" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/>
          <circle cx="6.75" cy="6.75" r="4.25" stroke="currentColor" stroke-width="1.25"/>
        </svg>
      </span>
    `;
        return html `
      <div
        class="container text-regular-body-md ${showTextArea ? 'expanded' : ''}"
        role=${isCollapsible ? 'button' : 'search'}
        aria-label=${isCollapsible && !showTextArea ? (this.ariaLabel ?? 'Open search') : (this.ariaLabel ?? nothing)}
        aria-expanded=${isCollapsible ? String(showTextArea) : nothing}
        tabindex=${isCollapsible && !showTextArea ? '0' : nothing}
        @click=${this._onContainerClick}
        @keydown=${(e) => {
            if (!showTextArea && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                this._onContainerClick(e);
            }
            else {
                this._onKeyDown(e);
            }
        }}
      >
        ${iconSearch}
        ${showTextArea ? html `
          <span class="text-area">
            <input
              class="input"
              type="search"
              autocomplete="off"
              spellcheck="false"
              placeholder=${this.placeholder}
              .value=${this._inputValue}
              aria-label=${this.ariaLabel ?? this.placeholder}
              name=${this.name || nothing}
              ?disabled=${this.disabled}
              @input=${this._onInput}
            />
          </span>
          <button
            class="clear-btn"
            type="button"
            aria-label=${this.closeButtonAssistiveText}
            tabindex=${this.hasValue ? '0' : '-1'}
            ?disabled=${this.disabled}
            @click=${this._onClear}
          >
            <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M11 5L5 11M5 5L11 11" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/>
            </svg>
          </button>
        ` : nothing}
      </div>
    `;
    }
};
DsSearch.styles = [
    resetStyles,
    typographyBaseStyles,
    typographyStyles,
    insetFocusRingStyles,
    css `
      :host {
        display: inline-flex;
        vertical-align: middle;
      }

      /* ── Base container ───────────────────────────────────────────────── */
      .container {
        all: unset;
        box-sizing: border-box;
        display: inline-flex;
        align-items: center;
        gap: var(--ds-spacing-spacing-04);
        height: 32px;
        padding: 0 var(--ds-spacing-spacing-04);
        border-radius: var(--ds-radius-semantic-radius-sm);
        cursor: pointer;
        user-select: none;
        white-space: nowrap;
        position: relative;
        transition:
          background-color 70ms cubic-bezier(0.2, 0, 0.38, 0.9),
          box-shadow 70ms cubic-bezier(0.2, 0, 0.38, 0.9);
        overflow: hidden;
      }

      .container.expanded {
        cursor: text;
        transition:
          width 70ms cubic-bezier(0.2, 0, 0.38, 0.9),
          background-color 70ms cubic-bezier(0.2, 0, 0.38, 0.9),
          box-shadow 70ms cubic-bezier(0.2, 0, 0.38, 0.9);
      }

      /* ── Search icon ──────────────────────────────────────────────────── */
      .icon-search {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        width: 16px;
        height: 16px;
        color: var(--ds-icon-icon-default);
      }

      /* ── Text area (placeholder + input) ─────────────────────────────── */
      .text-area {
        display: flex;
        flex: 1 0 0;
        align-items: center;
        min-width: 1px;
        overflow: hidden;
      }

      .input {
        all: unset;
        flex: 1 0 0;
        min-width: 1px;
        color: var(--ds-text-text-default);
        cursor: text;
      }

      .input::placeholder {
        color: var(--ds-text-text-subtlest);
      }

      /* Suppress native browser clear button on type="search" */
      .input::-webkit-search-cancel-button,
      .input::-webkit-search-decoration {
        -webkit-appearance: none;
        appearance: none;
      }

      /* ── Clear button ─────────────────────────────────────────────────── */
      .clear-btn {
        all: unset;
        box-sizing: border-box;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        width: 20px;
        height: 20px;
        border-radius: var(--ds-radius-semantic-radius-pill);
        cursor: pointer;
        color: var(--ds-icon-icon-default);
        transition: background-color 120ms ease;
      }

      .clear-btn:hover {
        background: var(--ds-background-neutral-subtle-hovered);
      }

      .clear-btn svg {
        width: 16px;
        height: 16px;
        display: block;
      }

      .clear-btn:focus-visible {
        outline: 2px solid var(--ds-focus-focus);
        outline-offset: 2px;
      }

      /* Hide clear button when no value ──────────────────────────────────── */
      :host(:not([has-value])) .clear-btn {
        display: none;
      }

      /* ── Collapsed state (expandable variants, not expanded) ─────────── */
      /* expandable-ghost: no border by default */
      :host([variant='expandable-ghost']) .container:not(.expanded) {
        background: transparent;
        width: 32px;
      }
      :host([variant='expandable-ghost']) .container:not(.expanded):hover {
        background: var(--ds-background-input-hovered);
      }

      /* expandable-tertiary: has border by default */
      :host([variant='expandable-tertiary']) .container:not(.expanded) {
        background: transparent;
        box-shadow: inset 0 0 0 1px var(--ds-border-border-bold);
        width: 32px;
      }
      :host([variant='expandable-tertiary']) .container:not(.expanded):hover {
        background: var(--ds-background-input-hovered);
      }

      /* ── Expanded state (CSS class set in render) ────────────────────── */
      /* Hide text area when collapsed */
      :host(:not([variant='expanded'])) .container:not(.expanded) .text-area,
      :host(:not([variant='expanded'])) .container:not(.expanded) .clear-btn {
        display: none;
      }

      .container.expanded,
      :host([variant='expanded']) .container {
        width: var(--ds-search-width, 340px);
        background: transparent;
        box-shadow: inset 0 0 0 1px var(--ds-border-border-bold);
      }

      .container.expanded:hover,
      :host([variant='expanded']) .container:hover {
        background: var(--ds-background-input-hovered);
        box-shadow: inset 0 0 0 1px var(--ds-border-border-bold);
      }

      .container.expanded:focus-within,
      :host([variant='expanded']) .container:focus-within {
        background: var(--ds-background-input-pressed);
        box-shadow: inset 0 0 0 1px var(--ds-focus-focus);
        border-radius: var(--ds-radius-semantic-radius-none);
        outline: none;
      }

      :host([has-value]) .container {
        border-radius: var(--ds-radius-semantic-radius-none);
      }

      /* ── Disabled state ─────────────────────────────────────────────────── */
      :host([disabled]) {
        pointer-events: none;
        opacity: 0.4;
      }

      /* Focus ring is on container via focus-within, not on input ─────────── */
      .input:focus {
        outline: none;
      }

      /* Native button (collapsed trigger) — use its own focus-visible ring */
      button.container:focus-visible {
        outline: 2px solid var(--ds-focus-focus);
        outline-offset: 2px;
      }

      button.container:focus:not(:focus-visible) {
        outline: none;
      }
    `,
];
__decorate([
    property({ type: String, reflect: true })
], DsSearch.prototype, "variant", void 0);
__decorate([
    property({ type: String })
], DsSearch.prototype, "placeholder", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'has-value' })
], DsSearch.prototype, "hasValue", void 0);
__decorate([
    property({ type: String, attribute: 'aria-label' })
], DsSearch.prototype, "ariaLabel", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], DsSearch.prototype, "disabled", void 0);
__decorate([
    property({ type: String })
], DsSearch.prototype, "value", void 0);
__decorate([
    property({ type: String })
], DsSearch.prototype, "name", void 0);
__decorate([
    property({ type: String, attribute: 'close-button-assistive-text' })
], DsSearch.prototype, "closeButtonAssistiveText", void 0);
__decorate([
    state()
], DsSearch.prototype, "_expanded", void 0);
__decorate([
    state()
], DsSearch.prototype, "_inputValue", void 0);
__decorate([
    query('.input')
], DsSearch.prototype, "_inputEl", void 0);
DsSearch = __decorate([
    customElement('ds-search')
], DsSearch);
export { DsSearch };
//# sourceMappingURL=ds-search.js.map