import { LitElement } from 'lit';
export type DsSearchVariant = 'expanded' | 'expandable-ghost' | 'expandable-tertiary';
/** @tagname ds-search */
export declare class DsSearch extends LitElement {
    static styles: import("lit").CSSResult[];
    variant: DsSearchVariant;
    /** Placeholder text shown when the input is empty. */
    placeholder: string;
    /** Reflects whether input has a non-empty value — used by CSS to show/hide clear. */
    hasValue: boolean;
    ariaLabel: string | null;
    /** Disables the input and all interaction. */
    disabled: boolean;
    /** Controlled value — synced to the internal input. */
    value: string;
    /** Native input name attribute for form submission. */
    name: string;
    /** Accessible label for the clear button (i18n). */
    closeButtonAssistiveText: string;
    private _expanded;
    private _inputValue;
    private _inputEl?;
    connectedCallback(): void;
    disconnectedCallback(): void;
    willUpdate(changed: Map<string, unknown>): void;
    private _onDocPointerDown;
    private _onContainerClick;
    private _onInput;
    private _onClear;
    private _onKeyDown;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ds-search': DsSearch;
    }
}
//# sourceMappingURL=ds-search.d.ts.map