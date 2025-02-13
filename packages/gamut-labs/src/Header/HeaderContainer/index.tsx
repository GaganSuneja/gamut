import cx from 'classnames';
import React from 'react';

import { AppBar } from '../../AppBar';
import { AppBarSection } from '../../AppBar/AppBarSection';
// eslint-disable-next-line gamut/no-css-standalone
import styles from './styles.module.scss';

export type HeaderContainerProps = {
  className?: string;
  /**
   * Pass ReactNode into any or each desired positions
   */
  sections?: {
    after?: React.ReactNode;
    left?: React.ReactNode;
    right?: React.ReactNode;
  };
};

export const HeaderContainer: React.FC<HeaderContainerProps> = ({
  className,
  sections: { after, left, right } = {},
}) => {
  return (
    <header className={cx(styles.container, className)} data-testid="AppHeader">
      <AppBar className={styles.appBar}>
        <AppBarSection position="left">{left}</AppBarSection>
        <AppBarSection position="right">{right}</AppBarSection>
      </AppBar>
      {after}
    </header>
  );
};
