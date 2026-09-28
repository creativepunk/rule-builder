import type { Meta, StoryObj } from '@storybook/web-components';
import './ds-badge.js';
import '../ds-icon/ds-icon.js';
import type { DsBadgeColor } from './ds-badge.js';
interface BadgeArgs {
    color: DsBadgeColor;
    hasIcon: boolean;
    count: string;
}
declare const meta: Meta<BadgeArgs>;
export default meta;
type Story = StoryObj<BadgeArgs>;
export declare const Default: Story;
export declare const WithIcon: Story;
export declare const Blue: Story;
export declare const Cyan: Story;
export declare const Teal: Story;
export declare const Green: Story;
export declare const Purple: Story;
export declare const Magenta: Story;
export declare const Red: Story;
export declare const Orange: Story;
export declare const Yellow: Story;
export declare const Inverted: Story;
export declare const ShowcaseColors: Story;
export declare const ShowcaseWithIcons: Story;
export declare const ShowcaseMatrix: Story;
//# sourceMappingURL=ds-badge.stories.d.ts.map