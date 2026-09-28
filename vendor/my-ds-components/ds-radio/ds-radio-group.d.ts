import { LitElement } from 'lit';
import '../ds-form-label/ds-form-label.js';
import '../ds-form-message/ds-form-message.js';
import './ds-radio.js';
export type DsRadioGroupOrientation = 'vertical' | 'horizontal';
export type DsRadioGroupType = 'stacked' | 'inline';
/** @tagname ds-radio-group */
export declare class DsRadioGroup extends LitElement {
    static styles: import("lit").CSSResult[];
    /** Text label for the whole group. */
    label: string;
    /** Appends a red asterisk to the group label. */
    isRequired: boolean;
    /** Shows info tip icon on the group label. */
    hasInfoTip: boolean;
    /** Puts the entire group in an error state. */
    hasError: boolean;
    /** Disables all child radios. */
    isDisabled: boolean;
    /** Makes all child radios read-only. */
    isReadOnly: boolean;
    /** Lays items out horizontally or vertically. */
    optionOrientation: DsRadioGroupOrientation;
    /** `default` = standard spacing; `inline` = label sits beside the group. */
    type: DsRadioGroupType;
    /** Helper text shown below the group when there is no error. */
    helperText: string;
    /** Error text shown below the group when hasError is true. */
    errorText: string;
    /** Automatically checks the first radio if none are already checked. */
    defaultFirstSelected: boolean;
    /** HTML form field name propagated to all child radios. */
    name: string;
    private _getRadios;
    private _autoSelectedRadio;
    private _syncChildren;
    updated(): void;
    private _onSlotChange;
    private _onRadioChange;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ds-radio-group': DsRadioGroup;
    }
}
//# sourceMappingURL=ds-radio-group.d.ts.map