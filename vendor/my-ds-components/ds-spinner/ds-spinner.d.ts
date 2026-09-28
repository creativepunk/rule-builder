import { LitElement } from 'lit';
export type DsSpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type DsSpinnerAppearance = 'inherit' | 'inverted';
/** @tagname ds-spinner */
export declare class DsSpinner extends LitElement {
    static styles: import("lit").CSSResult[];
    size: DsSpinnerSize;
    appearance: DsSpinnerAppearance;
    /** Accessible label announced to screen readers. */
    label: string;
    private get _strokeWidth();
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ds-spinner': DsSpinner;
    }
}
//# sourceMappingURL=ds-spinner.d.ts.map