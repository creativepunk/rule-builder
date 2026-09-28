import type { Meta, StoryObj } from '@storybook/web-components';
import './ds-number-field.js';
import type { DsNumberFieldType } from './ds-number-field.js';
interface NumberFieldArgs {
    type: DsNumberFieldType;
    label: string;
    isRequired: boolean;
    value: number | undefined;
    min: number | undefined;
    max: number | undefined;
    step: number;
    placeholder: string;
    helperText: string;
    errorMessage: string;
    successMessage: string;
    invalid: boolean;
    valid: boolean;
    disabled: boolean;
    readonly: boolean;
    allowNegative: boolean;
}
declare const meta: Meta<NumberFieldArgs>;
export default meta;
type Story = StoryObj<NumberFieldArgs>;
export declare const Default: Story;
export declare const WithValue: Story;
export declare const WithMinMax: Story;
export declare const WithStep: Story;
export declare const Inline: Story;
export declare const Invalid: Story;
export declare const Valid: Story;
export declare const Disabled: Story;
export declare const Readonly: Story;
export declare const ShowcaseStates: Story;
export declare const ShowcaseInlineLayouts: Story;
//# sourceMappingURL=ds-number-field.stories.d.ts.map