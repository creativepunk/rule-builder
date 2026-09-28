import { LitElement } from 'lit';
/** @tagname ds-radio */
export declare class DsRadio extends LitElement {
    static formAssociated: boolean;
    private _internals;
    static styles: import("lit").CSSResult[];
    /** Controlled selected state. */
    isChecked: boolean;
    /** Prevents interaction and dims the control. */
    isDisabled: boolean;
    /** Prevents interaction; retains opacity but shows a read-only appearance. */
    isReadOnly: boolean;
    /** Renders the border in danger color. */
    hasError: boolean;
    /** Appends a red asterisk after the label. */
    isRequired: boolean;
    /** Label text. Alternatively, use the default slot. */
    label: string;
    /** Optional helper/description text rendered beneath the label. */
    description: string;
    /** Form field name — should match across all radios in a group. */
    name: string;
    /** Form field value submitted when selected. */
    value: string;
    /** ID forwarded to the native input; useful for external <label for="..."> or aria-describedby. */
    inputId: string;
    /** Tooltip set on the <label> element. */
    title: string;
    private _hasDefaultSlot;
    constructor();
    private _onDefaultSlotChange;
    private _handleChange;
    private _handleKeyDown;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ds-radio': DsRadio;
    }
}
//# sourceMappingURL=ds-radio.d.ts.map