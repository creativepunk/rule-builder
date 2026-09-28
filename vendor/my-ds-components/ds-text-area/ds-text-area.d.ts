import { LitElement } from 'lit';
import '../ds-form-label/ds-form-label.js';
import '../ds-form-message/ds-form-message.js';
export type DsTextAreaType = 'stacked' | 'inline';
export type DsTextAreaResize = 'none' | 'vertical' | 'horizontal' | 'both';
/** @tagname ds-text-area */
export declare class DsTextArea extends LitElement {
    static styles: import("lit").CSSResult[];
    /** Label text above / beside the control. */
    label: string;
    /** Appends a red asterisk to the label. */
    isRequired: boolean;
    /** `stacked` — label above; `inline` — 180px label to the left. */
    type: DsTextAreaType;
    /** Current string value. */
    value: string;
    /** Placeholder text shown when no value is set. */
    placeholder: string;
    /** Helper text shown below the control in the default state. */
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
    /** Makes the textarea read-only. */
    readonly: boolean;
    /** Maximum character length; also drives the `n/max` count display. */
    maxlength: number | null;
    /** Shows a character count in the footer row alongside the message. */
    hasCount: boolean;
    /** Controls the resize handle. `none` disables it (default). */
    resize: DsTextAreaResize;
    private _charCount;
    private _onInput;
    private _onChange;
    private _onFocus;
    private _onBlur;
    private _countLabel;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ds-text-area': DsTextArea;
    }
}
//# sourceMappingURL=ds-text-area.d.ts.map