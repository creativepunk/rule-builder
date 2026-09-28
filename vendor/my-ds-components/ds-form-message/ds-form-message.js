var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { resetStyles, typographyBaseStyles, typographyStyles } from '../shared/styles.js';
import '../ds-icon/ds-icon.js';
/** @tagname ds-form-message */
let DsFormMessage = class DsFormMessage extends LitElement {
    constructor() {
        super(...arguments);
        /** Visual and semantic type — controls which text prop is displayed. */
        this.type = 'error';
        /** Text shown when type="helper". */
        this.helperText = '';
        /** Text shown when type="error". */
        this.errorText = '';
        /** Text shown when type="success". */
        this.successText = '';
    }
    get _resolvedText() {
        if (this.type === 'helper')
            return this.helperText;
        if (this.type === 'success')
            return this.successText;
        return this.errorText;
    }
    render() {
        const showIcon = this.type === 'error' || this.type === 'success';
        const iconName = this.type === 'error' ? 'error' : 'check_circle';
        const ariaLive = this.type === 'helper' ? nothing : 'polite';
        const text = this._resolvedText;
        return html `
      ${showIcon
            ? html `
            <span class="icon" aria-hidden="true">
              <ds-icon name=${iconName} size="sm"></ds-icon>
            </span>
          `
            : nothing}
      <span class="text text-helper-helper-regular" role="status" aria-live=${ariaLive}>
        ${text ? text : html `<slot></slot>`}
      </span>
    `;
    }
};
DsFormMessage.styles = [
    resetStyles,
    typographyBaseStyles,
    typographyStyles,
    css `
      :host {
        display: flex;
        align-items: flex-start;
        gap: var(--ds-spacing-spacing-04);
        padding-top: var(--ds-spacing-spacing-04);
      }

      /* Helper has no gap (no icon) */
      :host([type='helper']) {
        gap: 0;
      }

      .icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      :host([type='error']) .icon {
        color: var(--ds-icon-icon-danger);
      }

      :host([type='success']) .icon {
        color: var(--ds-icon-icon-success);
      }

      /* Hide icon slot in helper mode */
      :host([type='helper']) .icon {
        display: none;
      }

      .text {
        flex: 1 0 0;
        min-width: 1px;
        font-feature-settings: 'cv08' 1, 'zero' 1, 'cv05' 1;
        word-break: break-word;
      }

      :host([type='error']) .text,
      :host(:not([type])) .text {
        color: var(--ds-text-text-danger);
      }

      :host([type='success']) .text {
        color: var(--ds-text-text-success);
      }

      :host([type='helper']) .text {
        color: var(--ds-text-text-subtlest);
      }
    `,
];
__decorate([
    property({ type: String, reflect: true })
], DsFormMessage.prototype, "type", void 0);
__decorate([
    property({ type: String, reflect: true, attribute: 'helper-text' })
], DsFormMessage.prototype, "helperText", void 0);
__decorate([
    property({ type: String, reflect: true, attribute: 'error-text' })
], DsFormMessage.prototype, "errorText", void 0);
__decorate([
    property({ type: String, reflect: true, attribute: 'success-text' })
], DsFormMessage.prototype, "successText", void 0);
DsFormMessage = __decorate([
    customElement('ds-form-message')
], DsFormMessage);
export { DsFormMessage };
//# sourceMappingURL=ds-form-message.js.map