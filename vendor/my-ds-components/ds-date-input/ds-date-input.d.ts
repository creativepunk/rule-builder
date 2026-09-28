import { LitElement } from 'lit';
import { type DateFormat } from '../shared/date-mask.js';
import '../ds-field-input/ds-field-input.js';
import '../ds-icon-button/ds-icon-button.js';
import '../ds-icon/ds-icon.js';
export type DsDateInputLayoutType = 'stacked' | 'inline';
/**
 * A simple typed date input — text-only, no picker flyout.
 * @tagname ds-date-input
 */
export declare class DsDateInput extends LitElement {
    static styles: import("lit").CSSResult[];
    /** Current value as ISO `YYYY-MM-DD`. */
    value: string;
    /** Placeholder shown when empty and not focused. */
    placeholder: string;
    /** Date format for mask display. */
    format: DateFormat;
    /** Label text above/beside the field. */
    label: string;
    /** Appends a red asterisk to the label. */
    isRequired: boolean;
    /** `default` — stacked label; `inline` — 180px label to the left. */
    type: DsDateInputLayoutType;
    /** Helper text shown below the field. */
    helperText: string;
    /** Error message shown when `invalid` is true. */
    errorMessage: string;
    /** Success message shown when `valid` is true. */
    successMessage: string;
    invalid: boolean;
    valid: boolean;
    disabled: boolean;
    readonly: boolean;
    /** Min date as ISO string `YYYY-MM-DD`. */
    min: string;
    /** Max date as ISO string `YYYY-MM-DD`. */
    max: string;
    /** Shows a clear (×) button when a value is set. */
    isClearable: boolean;
    private _mask;
    private _focused;
    private _selectAll;
    private _justFocused;
    willUpdate(changed: Map<string, unknown>): void;
    private _getInput;
    private _setCursor;
    private _handleFocus;
    private _handleBlur;
    private _handleKeydown;
    private _handleClick;
    private _emitIfComplete;
    private _handleClear;
    private _renderMask;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ds-date-input': DsDateInput;
    }
}
//# sourceMappingURL=ds-date-input.d.ts.map