var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { resetStyles } from '../shared/styles.js';
/** @tagname ds-menu-separator */
let DsMenuSeparator = class DsMenuSeparator extends LitElement {
    render() {
        return html `<div class="line" role="separator"></div>`;
    }
};
DsMenuSeparator.styles = [
    resetStyles,
    css `
      :host {
        display: block;
        padding: var(--ds-spacing-spacing-02) 0;
      }

      .line {
        width: 100%;
        height: 1px;
        background: var(--ds-border-border-default);
      }
    `,
];
DsMenuSeparator = __decorate([
    customElement('ds-menu-separator')
], DsMenuSeparator);
export { DsMenuSeparator };
//# sourceMappingURL=ds-menu-separator.js.map