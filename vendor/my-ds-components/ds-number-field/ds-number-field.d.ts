import { LitElement } from 'lit';
import '../ds-field-input/ds-field-input.js';
export type DsNumberFieldType = 'default' | 'inline';
/** @tagname ds-number-field */
export declare class DsNumberField extends LitElement {
    static styles: import("lit").CSSResult[];
    /** Label text above / beside the control. */
    label: string;
    /** Appends a red asterisk to the label. */
    isRequired: boolean;
    /** `default` — stacked label above; `inline` — 180px label to the left. */
    type: DsNumberFieldType;
    /** Current numeric value. */
    value: number | null;
    /** Minimum allowed value. */
    min: number | null;
    /** Maximum allowed value. */
    max: number | null;
    /** Amount to increment/decrement per step. */
    step: number;
    /** Placeholder text shown when no value is set. */
    placeholder: string;
    /** Helper text shown below the control. */
    helperText: string;
    /** Error message shown when invalid=true. */
    errorMessage: string;
    /** Success message shown when valid=true. */
    successMessage: string;
    /** Triggers error styling + shows error message. */
    invalid: boolean;
    /** Triggers success styling + shows success message. */
    valid: boolean;
    /** Disables the entire control. */
    disabled: boolean;
    /** Makes the input read-only. */
    readonly: boolean;
    /** When true, the decrement button and keyboard entry can go below zero. */
    allowNegative: boolean;
    private _inputValue;
    private _rangeError;
    willUpdate(changed: Map<string, unknown>): void;
    private get _effectiveMin();
    private _clamp;
    private _buildRangeError;
    private _decrement;
    private _increment;
    private _commit;
    private _filterRaw;
    private _onInput;
    private _onBlur;
    private _onFocus;
    private _onKeydown;
    private _onPaste;
    private get _decrementDisabled();
    private get _incrementDisabled();
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ds-number-field': DsNumberField;
    }
}
//# sourceMappingURL=ds-number-field.d.ts.map