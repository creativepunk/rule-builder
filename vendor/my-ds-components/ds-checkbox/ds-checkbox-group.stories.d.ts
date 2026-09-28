import type { Meta, StoryObj } from '@storybook/web-components';
import './ds-checkbox.js';
import './ds-checkbox-group.js';
import type { DsCheckboxGroupOrientation, DsCheckboxGroupType } from './ds-checkbox-group.js';
interface CheckboxGroupArgs {
    label: string;
    name: string;
    isRequired: boolean;
    hasInfoTip: boolean;
    hasError: boolean;
    isDisabled: boolean;
    isReadOnly: boolean;
    optionOrientation: DsCheckboxGroupOrientation;
    type: DsCheckboxGroupType;
    helperText: string;
    errorText: string;
}
declare const meta: Meta<CheckboxGroupArgs>;
export default meta;
type Story = StoryObj<CheckboxGroupArgs>;
export declare const Default: Story;
export declare const Horizontal: Story;
export declare const Error: Story;
export declare const Disabled: Story;
export declare const ReadOnly: Story;
export declare const WithHelperText: Story;
export declare const InlineVertical: Story;
export declare const InlineHorizontal: Story;
export declare const ShowcaseMatrix: Story;
//# sourceMappingURL=ds-checkbox-group.stories.d.ts.map