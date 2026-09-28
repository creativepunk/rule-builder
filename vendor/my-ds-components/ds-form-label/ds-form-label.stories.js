import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import './ds-form-label.js';
const meta = {
    title: 'Internal/Form Label',
    component: 'ds-form-label',
    argTypes: {
        label: {
            control: 'text',
            description: 'Label text content.',
            table: { category: 'Props', type: { summary: 'string' }, defaultValue: { summary: '' } },
        },
        isRequired: {
            control: 'boolean',
            description: 'Appends a red asterisk (*) immediately after the text.',
            table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' }, category: 'Props' },
        },
        hasInfoTip: {
            control: 'boolean',
            description: 'Shows an info icon after the label text.',
            table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' }, category: 'Props' },
        },
        type: {
            control: 'inline-radio',
            options: ['stacked', 'inline'],
            description: 'stacked grows to fill its container and wraps; inline is a fixed 180px width for side-by-side form rows.',
            table: { type: { summary: `'stacked' | 'inline'` }, defaultValue: { summary: 'stacked' }, category: 'Props' },
        },
        for: {
            control: 'text',
            description: 'Associates the label with a form control by id.',
            table: { type: { summary: 'string' }, category: 'Props' },
        },
    },
    args: {
        label: 'Label',
        isRequired: false,
        hasInfoTip: false,
        type: 'stacked',
    },
    render: (args) => html `
    <ds-form-label
      label=${args.label}
      type=${args.type}
      ?is-required=${args.isRequired}
      ?has-info-tip=${args.hasInfoTip}
      for=${ifDefined(args.for || undefined)}
    ></ds-form-label>
  `,
};
export default meta;
export const Default = {
    args: { label: 'Label' },
};
export const Required = {
    args: { label: 'Label', isRequired: true },
};
export const WithInfoTip = {
    name: 'With Info Tip',
    args: { label: 'Label', hasInfoTip: true },
};
export const RequiredWithInfoTip = {
    name: 'Required + Info Tip',
    args: { label: 'Label', isRequired: true, hasInfoTip: true },
};
export const Inline = {
    args: { label: 'Label', type: 'inline' },
};
export const InlineRequired = {
    name: 'Inline + Required',
    args: { label: 'Label', type: 'inline', isRequired: true },
};
export const LongTextWraps = {
    name: 'Long text — wraps',
    args: { label: 'This is a long label that should wrap to the next line and keep the asterisk tight', isRequired: true },
};
export const ShowcaseLayouts = {
    name: 'Showcase — Layouts',
    tags: ['!dev'],
    parameters: { controls: { disable: true } },
    render: () => html `
    <div style="display: flex; flex-direction: column; gap: 24px; padding: 24px;">
      <div>
        <p style="color: #acacac; font: 12px/16px Inter, sans-serif; margin: 0 0 8px;">Stacked (fills container)</p>
        <div style="width: 240px; background: #222; padding: 4px;">
          <ds-form-label label="Stacked label wraps when long" is-required></ds-form-label>
        </div>
      </div>
      <div>
        <p style="color: #acacac; font: 12px/16px Inter, sans-serif; margin: 0 0 8px;">Inline (180px fixed)</p>
        <div style="display: flex; align-items: flex-start; background: #222; padding: 4px;">
          <ds-form-label type="inline" label="Inline label wraps inside fixed width" is-required></ds-form-label>
          <div style="flex: 1; height: 32px; background: #333; border-radius: 4px;"></div>
        </div>
      </div>
    </div>
  `,
};
export const ShowcaseStates = {
    name: 'Showcase — States',
    tags: ['!dev'],
    parameters: { controls: { disable: true } },
    render: () => html `
    <div style="display: flex; flex-direction: column; gap: 16px; padding: 24px; width: 240px;">
      <ds-form-label label="Default label"></ds-form-label>
      <ds-form-label label="Required label" is-required></ds-form-label>
      <ds-form-label label="With info tip" has-info-tip></ds-form-label>
      <ds-form-label label="Required + info tip" is-required has-info-tip></ds-form-label>
    </div>
  `,
};
//# sourceMappingURL=ds-form-label.stories.js.map