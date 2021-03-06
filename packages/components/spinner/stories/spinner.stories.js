import { html, storiesOf } from '@open-wc/demoing-storybook';
import { boolean, select, text, withKnobs } from '@storybook/addon-knobs';
import { helpers } from '@tradeshift/elements';

import '@tradeshift/elements.spinner';
import { colors, sizes } from '../src/utils';
import readme from '../README.md';

storiesOf('ts-spinner', module)
	.addDecorator(withKnobs)
	.add(
		'default',
		() => {
			const message = text('Message', 'Loading...');
			const visible = boolean('Visible', true);

			const size = select(
				'Size',
				{
					default: sizes.LARGE,
					...helpers.objectKeysChangeCase(sizes)
				},
				''
			);

			const color = select(
				'Color',
				{
					default: colors.BLUE,
					...helpers.objectKeysChangeCase(colors)
				},
				''
			);

			return html`
				<ts-spinner ?data-visible="${visible}" data-message="${message}" data-size="${size}" data-color="${color}">
				</ts-spinner>
			`;
		},
		{ notes: readme }
	);
