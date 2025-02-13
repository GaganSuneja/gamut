import { Anchor, Text } from '@codecademy/gamut';
import { ArrowChevronLeftIcon } from '@codecademy/gamut-icons';
import { css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';

import { AppHeaderCatalogDropdownProps } from '../../AppHeader/AppHeaderElements/AppHeaderCatalogDropdown';
import { AppHeaderCatalogSection } from '../../AppHeader/AppHeaderElements/AppHeaderCatalogSection';
import { AppHeaderDropdownProps } from '../../AppHeader/AppHeaderElements/AppHeaderDropdown';
import { AppHeaderLinkSections } from '../../AppHeader/AppHeaderElements/AppHeaderLinkSections';
import { AppHeaderListItem } from '../../AppHeader/AppHeaderElements/AppHeaderListItem';

export type AppHeaderSubMenuMobileProps = (
  | AppHeaderDropdownProps
  | AppHeaderCatalogDropdownProps
) & {
  handleClose: () => void;
};

const StyledAnchor = styled(Anchor)(
  css({
    alignItems: `center`,
    display: `flex`,
    my: 24,
    padding: 0,
    width: `100%`,
  })
);

export const AppHeaderSubMenuMobile: React.FC<AppHeaderSubMenuMobileProps> = ({
  action,
  handleClose,
  item,
}) => {
  return (
    <AppHeaderListItem aria-labelledby={`${item.text} menu`}>
      <StyledAnchor
        onClick={handleClose}
        variant="interface"
        as="button"
        ml={{ _: 16, xs: 32, sm: 64, md: 48 }}
      >
        <ArrowChevronLeftIcon size={12} aria-hidden />
        <Text fontSize={16} pl={8}>
          Menu
        </Text>
      </StyledAnchor>
      <Text
        as="h1"
        fontSize={22}
        mb={16}
        ml={{ _: 16, xs: 32, sm: 64, md: 48 }}
      >
        {item.type === 'profile-dropdown' ? item.userDisplayName : item.text}
      </Text>
      {item.type === 'catalog-dropdown' ? (
        <AppHeaderCatalogSection action={action} item={item} />
      ) : (
        <AppHeaderLinkSections action={action} item={item} showIcon mobile />
      )}
    </AppHeaderListItem>
  );
};
