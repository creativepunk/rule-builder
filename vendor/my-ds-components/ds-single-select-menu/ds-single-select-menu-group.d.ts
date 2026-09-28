import { LitElement } from 'lit';
import '../ds-menu-category/ds-menu-category.js';
import '../ds-menu-category/ds-menu-separator.js';
/**
 * Logical grouping of items inside a <ds-single-select-menu>.
 *
 * - title — optional section label rendered above the items.
 * - has-separator — automatically set by the parent menu on every group
 *   except the first.
 */
/** @tagname ds-single-select-menu-group */
export declare class DsSingleSelectMenuGroup extends LitElement {
    static styles: import("lit").CSSResult[];
    title: string;
    /** Automatically set by <ds-single-select-menu>. True for every group except the first. */
    hasSeparator: boolean;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ds-single-select-menu-group': DsSingleSelectMenuGroup;
    }
}
//# sourceMappingURL=ds-single-select-menu-group.d.ts.map