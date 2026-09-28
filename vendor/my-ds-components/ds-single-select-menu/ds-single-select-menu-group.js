var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { resetStyles } from '../shared/styles.js';
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
let DsSingleSelectMenuGroup = class DsSingleSelectMenuGroup extends LitElement {
    constructor() {
        super(...arguments);
        this.title = '';
        /** Automatically set by <ds-single-select-menu>. True for every group except the first. */
        this.hasSeparator = false;
    }
    render() {
        return html `
      ${this.hasSeparator ? html `<ds-menu-separator></ds-menu-separator>` : nothing}
      ${this.title ? html `<ds-menu-category>${this.title}</ds-menu-category>` : nothing}
      <div role="group" aria-label=${this.title || nothing}>
        <slot></slot>
      </div>
    `;
    }
};
DsSingleSelectMenuGroup.styles = [resetStyles];
__decorate([
    property({ type: String })
], DsSingleSelectMenuGroup.prototype, "title", void 0);
__decorate([
    property({ type: Boolean, attribute: 'has-separator' })
], DsSingleSelectMenuGroup.prototype, "hasSeparator", void 0);
DsSingleSelectMenuGroup = __decorate([
    customElement('ds-single-select-menu-group')
], DsSingleSelectMenuGroup);
export { DsSingleSelectMenuGroup };
//# sourceMappingURL=ds-single-select-menu-group.js.map