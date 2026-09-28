import { LitElement } from 'lit';
export type DsBadgeColor = 'gray' | 'blue' | 'cyan' | 'teal' | 'green' | 'purple' | 'magenta' | 'red' | 'orange' | 'yellow' | 'inverted';
/** @tagname ds-badge */
export declare class DsBadge extends LitElement {
    static styles: import("lit").CSSResult[];
    color: DsBadgeColor;
    hasIcon: boolean;
    count: string;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ds-badge': DsBadge;
    }
}
//# sourceMappingURL=ds-badge.d.ts.map