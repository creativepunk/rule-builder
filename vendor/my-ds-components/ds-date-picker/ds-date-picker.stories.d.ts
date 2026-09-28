import type { Meta, StoryObj } from '@storybook/web-components';
import './ds-date-picker.js';
import type { DsDatePickerLayoutType } from './ds-date-picker.js';
interface DatePickerArgs {
    type: DsDatePickerLayoutType;
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
declare const meta: Meta<DatePickerArgs>;
export default meta;
type Story = StoryObj<DatePickerArgs>;
export declare const Default: Story;
export declare const Selected: Story;
export declare const Invalid: Story;
export declare const Valid: Story;
export declare const Disabled: Story;
export declare const Inline: Story;
export declare const ShowcaseStates: Story;
export declare const ShowcaseInline: Story;
//# sourceMappingURL=ds-date-picker.stories.d.ts.map