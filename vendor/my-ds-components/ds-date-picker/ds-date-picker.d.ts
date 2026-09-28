import { LitElement } from 'lit';
import { type DateFormat } from '../shared/date-mask.js';
import '../ds-field-input/ds-field-input.js';
import '../ds-calendar/ds-calendar.js';
import '../ds-icon-button/ds-icon-button.js';
import '../ds-icon/ds-icon.js';
export type DsDatePickerLayoutType = 'stacked' | 'inline';
/**
 * Single-date picker: typed input + calendar flyout.
 * @tagname ds-date-picker
 */
export declare class DsDatePicker extends LitElement {
    static styles: import("lit").CSSResult[];
    /** Selected date as ISO `YYYY-MM-DD`. */
    value: string;
    /** Placeholder shown when empty and not focused. */
    placeholder: string;
    /** Date format for mask display. */
    format: DateFormat;
    label: string;
    isRequired: boolean;
    type: DsDatePickerLayoutType;
    helperText: string;
    errorMessage: string;
    successMessage: string;
    invalid: boolean;
    valid: boolean;
    disabled: boolean;
    readonly: boolean;
    min: string;
    max: string;
    /** Shows a clear (×) button when a value is set. */
    isClearable: boolean;
    private _mask;
    private _focused;
    private _selectAll;
    private _justFocused;
    private _open;
    private _calYear;
    private _calMonth;
    willUpdate(changed: Map<string, unknown>): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _handleOutsideClick;
    private _toggleFlyout;
    private _handleCalendarSelect;
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
        'ds-date-picker': DsDatePicker;
    }
}
//# sourceMappingURL=ds-date-picker.d.ts.map