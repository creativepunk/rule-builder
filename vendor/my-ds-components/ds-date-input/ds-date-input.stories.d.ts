import type { Meta, StoryObj } from '@storybook/web-components';
import './ds-date-input.js';
import type { DsDateInputLayoutType } from './ds-date-input.js';
interface DateInputArgs {
    type: DsDateInputLayoutType;
    label: string;
    isRequired: boolean;
    value: string;
    placeholder: string;
    helperText: string;
    errorMessage: string;
    successMessage: string;
    invalid: boolean;
    valid: boolean;
    disabled: boolean;
    readonly: boolean;
    min: string;
    max: string;
    isClearable: boolean;
}
declare const meta: Meta<DateInputArgs>;
export default meta;
type Story = StoryObj<DateInputArgs>;
export declare const Default: Story;
export declare const Filled: Story;
export declare const Invalid: Story;
export declare const Valid: Story;
export declare const Disabled: Story;
export declare const Inline: Story;
export declare const ShowcaseStates: Story;
export declare const ShowcaseInline: Story;
//# sourceMappingURL=ds-date-input.stories.d.ts.map