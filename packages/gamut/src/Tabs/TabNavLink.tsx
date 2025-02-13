import styled from '@emotion/styled';

import { TabButton } from './TabButton';

export const TabNavLink = styled(TabButton)();

TabNavLink.defaultProps = {
  variant: 'standard',
  role: 'tab',
};
