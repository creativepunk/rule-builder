import type { Meta, StoryObj } from '@storybook/web-components';
import './ds-text-area.js';
import type { DsTextAreaType, DsTextAreaResize } from './ds-text-area.js';
interface TextAreaArgs {
    type: DsTextAreaType;
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
    maxlength: number | null;
    hasCount: boolean;
    resize: DsTextAreaResize;
}
declare const meta: Meta<TextAreaArgs>;
export default meta;
type Story = StoryObj<TextAreaArgs>;
export declare const Default: Story;
export declare const WithValue: Story;
export declare const NoCount: Story;
export declare const Inline: Story;
export declare const Invalid: Story;
export declare const Valid: Story;
export declare const Disabled: Story;
export declare const Readonly: Story;
export declare const ShowcaseStates: Story;
export declare const ShowcaseInlineLayouts: Story;
export declare const ResizeVertical: Story;
export declare const ResizeHorizontal: Story;
export declare const ResizeBoth: Story;
export declare const ShowcaseResizeVariants: Story;
export declare const ShowcaseGrowBehavior: Story;
//# sourceMappingURL=ds-text-area.stories.d.ts.map