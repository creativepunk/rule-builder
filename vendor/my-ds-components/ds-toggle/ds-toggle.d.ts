import { LitElement } from 'lit';
export type DsToggleSize = 'sm' | 'md';
/** @tagname ds-toggle */
export declare class DsToggle extends LitElement {
    static formAssociated: boolean;
    private _internals;
    static styles: import("lit").CSSResult[];
    /** Controlled checked / on state. */
    isChecked: boolean;
    /** Prevents interaction. */
    isDisabled: boolean;
    /** Shows a loading spinner inside the track. */
    isLoading: boolean;
    /** sm = 32×16px track, md = 40×20px track. */
    size: DsToggleSize;
    /** Optional label text rendered to the right of the track. */
    label: string;
    /** Optional description text rendered below the label. */
    description: string;
    /** Form field name. */
    name: string;
    /** Form field value submitted when checked. */
    value: string;
    /** aria-label for the hidden checkbox input (use when there is no visible label). */
    ariaLabel: string;
    constructor();
    private _handleChange;
    private _handleKeyDown;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ds-toggle': DsToggle;
    }
}
//# sourceMappingURL=ds-toggle.d.ts.map