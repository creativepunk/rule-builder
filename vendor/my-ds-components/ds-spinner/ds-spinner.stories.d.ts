import type { Meta, StoryObj } from '@storybook/web-components';
import './ds-spinner.js';
import type { DsSpinnerSize, DsSpinnerAppearance } from './ds-spinner.js';
interface SpinnerArgs {
    size: DsSpinnerSize;
    appearance: DsSpinnerAppearance;
    label: string;
}
declare const meta: Meta<SpinnerArgs>;
export default meta;
type Story = StoryObj<SpinnerArgs>;
export declare const Default: Story;
export declare const Inherit: Story;
export declare const Inverted: Story;
export declare const SizeXs: Story;
export declare const SizeSm: Story;
export declare const SizeMd: Story;
export declare const SizeLg: Story;
export declare const SizeXl: Story;
export declare const ShowcaseAppearances: Story;
export declare const ShowcaseSizes: Story;
export declare const ShowcaseMatrix: Story;
//# sourceMappingURL=ds-spinner.stories.d.ts.map