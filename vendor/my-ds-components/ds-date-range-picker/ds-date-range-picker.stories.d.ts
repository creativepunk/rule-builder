import type { Meta, StoryObj } from '@storybook/web-components';
import './ds-date-range-picker.js';
import type { DsDateRangePickerLayoutType } from './ds-date-range-picker.js';
interface DateRangePickerArgs {
    type: DsDateRangePickerLayoutType;
    label: string;
    isRequired: boolean;
    startDate: string;
    endDate: string;
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
declare const meta: Meta<DateRangePickerArgs>;
export default meta;
type Story = StoryObj<DateRangePickerArgs>;
export declare const Default: Story;
export declare const Selected: Story;
export declare const Invalid: Story;
export declare const Valid: Story;
export declare const Disabled: Story;
export declare const Inline: Story;
export declare const ShowcaseStates: Story;
export declare const ShowcaseInline: Story;
//# sourceMappingURL=ds-date-range-picker.stories.d.ts.map