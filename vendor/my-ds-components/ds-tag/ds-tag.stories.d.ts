import type { Meta, StoryObj } from '@storybook/web-components';
import './ds-tag.js';
import '../ds-icon/ds-icon.js';
import type { DsTagColor, DsTagSize } from './ds-tag.js';
interface TagArgs {
    color: DsTagColor;
    size: DsTagSize;
    disabled: boolean;
    isDismissable: boolean;
    hasIcon: boolean;
    truncate: boolean;
    label: string;
}
declare const meta: Meta<TagArgs>;
export default meta;
type Story = StoryObj<TagArgs>;
export declare const Default: Story;
export declare const Dismissable: Story;
export declare const WithIcon: Story;
export declare const WithIconAndDismiss: Story;
export declare const Disabled: Story;
export declare const Blue: Story;
export declare const Cyan: Story;
export declare const Teal: Story;
export declare const Green: Story;
export declare const Purple: Story;
export declare const Magenta: Story;
export declare const Red: Story;
export declare const Orange: Story;
export declare const Yellow: Story;
export declare const HighContrast: Story;
export declare const ShowcaseColors: Story;
export declare const ShowcaseSizes: Story;
export declare const ShowcaseStates: Story;
export declare const ShowcaseMatrix: Story;
//# sourceMappingURL=ds-tag.stories.d.ts.map