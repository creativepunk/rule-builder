import type { Meta, StoryObj } from '@storybook/web-components';
import './ds-text-field.js';
import type { DsTextFieldType } from './ds-text-field.js';
interface TextFieldArgs {
    type: DsTextFieldType;
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
    inputType: string;
}
declare const meta: Meta<TextFieldArgs>;
export default meta;
type Story = StoryObj<TextFieldArgs>;
export declare const Default: Story;
export declare const WithValue: Story;
export declare const Inline: Story;
export declare const Invalid: Story;
export declare const Valid: Story;
export declare const Disabled: Story;
export declare const Readonly: Story;
export declare const ShowcaseStates: Story;
export declare const ShowcaseInlineLayouts: Story;
//# sourceMappingURL=ds-text-field.stories.d.ts.map