import { LitElement } from 'lit';
import '../ds-form-label/ds-form-label.js';
import '../ds-form-message/ds-form-message.js';
export type DsFieldInputLayoutType = 'default' | 'inline';
/** @tagname ds-field-input */
export declare class DsFieldInput extends LitElement {
    static styles: import("lit").CSSResult[];
    /** Label text above / beside the control. */
    label: string;
    /** Appends a red asterisk to the label. */
    isRequired: boolean;
    /** `default` — stacked label above; `inline` — 180px label to the left. */
    type: DsFieldInputLayoutType;
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
    /** Passed through to aria-disabled on the wrapper (no visual effect here). */
    disabled: boolean;
    /** Passed through for aria-readonly on the wrapper. */
    readonly: boolean;
    private _messageType;
    private _messageText;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ds-field-input': DsFieldInput;
    }
}
//# sourceMappingURL=ds-field-input.d.ts.map