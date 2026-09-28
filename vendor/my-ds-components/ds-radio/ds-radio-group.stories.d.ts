import type { Meta, StoryObj } from '@storybook/web-components';
import './ds-radio.js';
import './ds-radio-group.js';
import type { DsRadioGroupOrientation, DsRadioGroupType } from './ds-radio-group.js';
interface RadioGroupArgs {
    label: string;
    name: string;
    isRequired: boolean;
    hasInfoTip: boolean;
    hasError: boolean;
    isDisabled: boolean;
    isReadOnly: boolean;
    defaultFirstSelected: boolean;
    optionOrientation: DsRadioGroupOrientation;
    type: DsRadioGroupType;
    helperText: string;
    errorText: string;
}
declare const meta: Meta<RadioGroupArgs>;
export default meta;
type Story = StoryObj<RadioGroupArgs>;
export declare const Default: Story;
export declare const Horizontal: Story;
export declare const Error: Story;
export declare const Disabled: Story;
export declare const ReadOnly: Story;
export declare const WithHelperText: Story;
export declare const InlineVertical: Story;
export declare const InlineHorizontal: Story;
export declare const ShowcaseMatrix: Story;
//# sourceMappingURL=ds-radio-group.stories.d.ts.map