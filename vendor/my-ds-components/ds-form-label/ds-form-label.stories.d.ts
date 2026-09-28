import type { Meta, StoryObj } from '@storybook/web-components';
import './ds-form-label.js';
import type { DsFormLabelType } from './ds-form-label.js';
interface FormLabelArgs {
    label: string;
    isRequired: boolean;
    hasInfoTip: boolean;
    type: DsFormLabelType;
    for?: string;
}
declare const meta: Meta<FormLabelArgs>;
export default meta;
type Story = StoryObj<FormLabelArgs>;
export declare const Default: Story;
export declare const Required: Story;
export declare const WithInfoTip: Story;
export declare const RequiredWithInfoTip: Story;
export declare const Inline: Story;
export declare const InlineRequired: Story;
export declare const LongTextWraps: Story;
export declare const ShowcaseLayouts: Story;
export declare const ShowcaseStates: Story;
//# sourceMappingURL=ds-form-label.stories.d.ts.map