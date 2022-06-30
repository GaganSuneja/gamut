import { Anchor, ContentContainer, Text } from '@codecademy/gamut';
import { ArrowChevronLeftIcon } from '@codecademy/gamut-icons';
import { css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';

import { AppHeaderCatalogDropdownProps } from '../../AppHeader/AppHeaderElements/AppHeaderCatalogDropdown';
import { AppHeaderCatalogSection } from '../../AppHeader/AppHeaderElements/AppHeaderCatalogSection';
import { AppHeaderDropdownProps } from '../../AppHeader/AppHeaderElements/AppHeaderDropdown';
import { AppHeaderLinkSections } from '../../AppHeader/AppHeaderElements/AppHeaderLinkSections';
import { AppHeaderListItem } from '../../AppHeader/AppHeaderElements/AppHeaderListItem';
import { AppHeaderResourceDropdownProps } from '../../AppHeader/AppHeaderElements/AppHeaderResourcesDropdown';
import { AppHeaderResourcesSection } from '../../AppHeader/AppHeaderElements/AppHeaderResourcesSection';
import {
  AppHeaderClickHandler,
  AppHeaderItem,
} from '../../AppHeader/AppHeaderElements/types';

export type AppHeaderSubMenuMobileProps = (
  | AppHeaderDropdownProps
  | AppHeaderCatalogDropdownProps
  | AppHeaderResourceDropdownProps
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

const renderSection = (item: AppHeaderItem, action: AppHeaderClickHandler) => {
  switch (item.type) {
    case 'catalog-dropdown':
      return <AppHeaderCatalogSection action={action} item={item} />;
    case 'new-resources-dropdown':
      return <AppHeaderResourcesSection action={action} />;
    default:
      return (
        <AppHeaderLinkSections action={action} item={item} showIcon mobile />
      );
  }
};

export const AppHeaderSubMenuMobile: React.FC<AppHeaderSubMenuMobileProps> = ({
  action,
  handleClose,
  item,
}) => {
  return (
    <AppHeaderListItem aria-labelledby={`${item.text} menu`}>
      <ContentContainer>
        <StyledAnchor onClick={handleClose} variant="interface" as="button">
          <ArrowChevronLeftIcon size={12} aria-hidden />
          <Text fontSize={16} ml={8}>
            Full Menu
          </Text>
        </StyledAnchor>
        <Text as="h1" fontSize={22} mb={16}>
          {item.type === 'profile-dropdown' ? item.userDisplayName : item.text}
        </Text>
      </ContentContainer>
      {renderSection(item, action)}
    </AppHeaderListItem>
  );
};
