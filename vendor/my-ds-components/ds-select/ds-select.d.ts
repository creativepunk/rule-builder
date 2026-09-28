import { LitElement } from 'lit';
import '../ds-field-input/ds-field-input.js';
import '../ds-icon-button/ds-icon-button.js';
import '../ds-icon/ds-icon.js';
import type { DsSelectionFeedback } from '../ds-multi-select-menu/ds-multi-select-menu.js';
export type DsSelectSelection = 'single' | 'multi';
export type DsSelectType = 'default' | 'inline';
export type { DsSelectionFeedback };
/** @tagname ds-select */
export declare class DsSelect extends LitElement {
    static styles: import("lit").CSSResult[];
    /** Determines whether the trigger renders single-value or chip-based multi-value display. */
    selection: DsSelectSelection;
    /** `default` = stacked label above trigger; `inline` = 180px label to the left. */
    type: DsSelectType;
    /** Label text above / beside the trigger. */
    label: string;
    /** Placeholder shown when no value is selected. */
    placeholder: string;
    /** Helper text shown below the trigger. */
    helperText: string;
    /** Error message shown when invalid=true. */
    errorMessage: string;
    /** Success message shown when valid=true. */
    successMessage: string;
    /** Marks the field as required — adds asterisk to label. */
    isRequired: boolean;
    /** Shows a clear (×) button when a single value is selected. */
    isClearable: boolean;
    /** Disables the entire control. */
    disabled: boolean;
    /** Makes the field read-only (trigger not interactive, dropdown never opens). */
    readonly: boolean;
    /** Shows error state — red bottom border + error message. */
    invalid: boolean;
    /** Shows success state — green bottom border + success message. */
    valid: boolean;
    /** Currently selected values — synced from the slotted menu. */
    values: string[];
    /**
     * Controls how selected items are surfaced when the menu reopens.
     * Only applies when `selection="multi"`.
     * - `top`: selected items move to the top immediately on each toggle.
     * - `fixed`: items never reorder.
     * - `top-after-reopen`: selected items move to the top when the menu reopens (default).
     */
    selectionFeedback: DsSelectionFeedback;
    private _open;
    private _focusedIndex;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _onMenuChange;
    private _closeDropdown;
    private _onTriggerClick;
    private _onTriggerKeydown;
    private _onDropdownMousedown;
    private _onDropdownMouseover;
    private _onClearClick;
    private _onDocClick;
    private _onDocKeydown;
    private _slottedItems;
    private _activateFocusedItem;
    private _scrollFocusedIntoView;
    private _syncFocusedAttr;
    private _labelForValue;
    private _renderTriggerContent;
    render(): import("lit").TemplateResult<1>;
    protected updated(changed: Map<string, unknown>): void;
    private _multiSelectMenu;
    private _syncMenuSelectionFeedback;
    private _onSlotChange;
}
declare global {
    interface HTMLElementTagNameMap {
        'ds-select': DsSelect;
    }
}
//# sourceMappingURL=ds-select.d.ts.map