import { Stack } from '@fluentui/react';
import PropTypes from 'prop-types';

import { CustomIcon, Text } from './styles';

export function NoItemsFound({ text, iconName, iconAreaLabel }) {
  return (
    <Stack
      verticalAlign="center"
      horizontalAlign="center"
      tokens={{ padding: 20, childrenGap: 20 }}
    >
      <CustomIcon aria-label={iconAreaLabel} iconName={iconName} />
      <Text>{text}</Text>
    </Stack>
  );
}

NoItemsFound.propTypes = {
  text: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
  iconAreaLabel: PropTypes.string.isRequired,
};
