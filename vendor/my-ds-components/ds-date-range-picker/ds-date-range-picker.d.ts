import { LitElement } from 'lit';
import { type DateFormat } from '../shared/date-mask.js';
import '../ds-field-input/ds-field-input.js';
import '../ds-calendar/ds-calendar.js';
import '../ds-icon-button/ds-icon-button.js';
import '../ds-icon/ds-icon.js';
export type DsDateRangePickerLayoutType = 'stacked' | 'inline';
/**
 * Date range picker: two typed inputs (start / end) with a shared calendar flyout.
 * @tagname ds-date-range-picker
 */
export declare class DsDateRangePicker extends LitElement {
    static styles: import("lit").CSSResult[];
    /** Start date as ISO `YYYY-MM-DD`. */
    startDate: string;
    /** End date as ISO `YYYY-MM-DD`. */
    endDate: string;
    label: string;
    isRequired: boolean;
    type: DsDateRangePickerLayoutType;
    helperText: string;
    errorMessage: string;
    successMessage: string;
    invalid: boolean;
    valid: boolean;
    disabled: boolean;
    readonly: boolean;
    min: string;
    max: string;
    /** Date format for mask display. */
    format: DateFormat;
    /** Shows a clear (×) button when any value is set. */
    isClearable: boolean;
    private _startMask;
    private _endMask;
    private _startFocused;
    private _endFocused;
    private _selectAll;
    private _justFocused;
    private _open;
    private _activeInput;
    private _calYear;
    private _calMonth;
    willUpdate(changed: Map<string, unknown>): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _handleOutsideClick;
    private _openWithFocus;
    private _toggleFlyout;
    private _handleCalendarSelect;
    private _getStartInput;
    private _getEndInput;
    private _setCursor;
    private _handleStartFocus;
    private _handleStartBlur;
    private _handleEndFocus;
    private _handleEndBlur;
    private _handleKeydown;
    private _handleStartClick;
    private _handleEndClick;
    private _emitRange;
    private get _calendarValue();
    private _handleClear;
    private _renderMask;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ds-date-range-picker': DsDateRangePicker;
    }
}
//# sourceMappingURL=ds-date-range-picker.d.ts.map