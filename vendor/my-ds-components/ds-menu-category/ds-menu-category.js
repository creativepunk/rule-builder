var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { resetStyles, typographyBaseStyles, typographyStyles } from '../shared/styles.js';
/**
 * Section label for use inside <ds-action-menu>, <ds-single-select-menu>,
 * or <ds-multi-select-menu>.
 */
/** @tagname ds-menu-category */
let DsMenuCategory = class DsMenuCategory extends LitElement {
    render() {
        return html `<span class="label text-helper-helper-regular"><slot></slot></span>`;
    }
};
DsMenuCategory.styles = [
    resetStyles,
    typographyBaseStyles,
    typographyStyles,
    css `
      :host {
        display: block;
      }

      .label {
        display: block;
        padding: var(--ds-spacing-spacing-04) var(--ds-spacing-spacing-06)
          var(--ds-spacing-spacing-02);
        color: var(--ds-text-text-subtlest);
        font-feature-settings: 'cv08' 1;
        white-space: nowrap;
      }
    `,
];
DsMenuCategory = __decorate([
    customElement('ds-menu-category')
], DsMenuCategory);
export { DsMenuCategory };
//# sourceMappingURL=ds-menu-category.js.map