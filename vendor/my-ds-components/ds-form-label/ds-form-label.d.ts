import { LitElement } from 'lit';
import '../ds-icon/ds-icon.js';
export type DsFormLabelType = 'stacked' | 'inline';
/** @tagname ds-form-label */
export declare class DsFormLabel extends LitElement {
    static styles: import("lit").CSSResult[];
    /** Label text. Alternatively use the default slot. */
    label: string;
    /** Appends a red asterisk to mark the field as required. */
    isRequired: boolean;
    /** Shows a small info icon after the label text. */
    hasInfoTip: boolean;
    /**
     * stacked — grows to fill the parent container (default).
     * inline  — fixed 180px width, for side-by-side form layouts.
     */
    type: DsFormLabelType;
    /** Associates this label with a form control via its id. */
    for: string;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ds-form-label': DsFormLabel;
    }
}
//# sourceMappingURL=ds-form-label.d.ts.map