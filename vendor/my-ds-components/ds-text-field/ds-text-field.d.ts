import { LitElement } from 'lit';
import '../ds-field-input/ds-field-input.js';
export type DsTextFieldType = 'stacked' | 'inline';
/** @tagname ds-text-field */
export declare class DsTextField extends LitElement {
    static styles: import("lit").CSSResult[];
    /** Label text above / beside the control. */
    label: string;
    /** Appends a red asterisk to the label. */
    isRequired: boolean;
    /** `stacked` — label above; `inline` — 180px label to the left. */
    type: DsTextFieldType;
    /** Current string value. */
    value: string;
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
    /** HTML input type — text, email, password, url, search, tel, etc. */
    inputType: string;
    /** Maximum character length. */
    maxlength: number | null;
    /** Minimum character length. */
    minlength: number | null;
    /** Autocomplete hint for the browser. */
    autocomplete: string;
    private _onInput;
    private _onChange;
    private _onFocus;
    private _onBlur;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ds-text-field': DsTextField;
    }
}
//# sourceMappingURL=ds-text-field.d.ts.map