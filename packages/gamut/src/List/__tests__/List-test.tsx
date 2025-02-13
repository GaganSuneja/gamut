import { setupEnzyme } from '@codecademy/gamut-tests';
import React from 'react';

import { List } from '../List';
import { ListCol } from '../ListCol';
import { ListRow } from '../ListRow';

const renderWrapper = setupEnzyme(List, {
  children: (
    <ListRow>
      <ListCol>Hello</ListCol>
    </ListRow>
  ),
});

describe('List', () => {
  it('renders a default list by default', () => {
    const { wrapper } = renderWrapper();

    expect(wrapper.find('ListEl').prop('variant')).toBe('default');
    expect(wrapper.find('ListEl').prop('scrollable')).toBe(undefined);
  });
  it('configures rows with the correct variants', () => {
    const { wrapper } = renderWrapper();
    const wrappingRow = wrapper.find('RowEl').at(0);
    expect(wrappingRow.prop('variant')).toBe('default');
    expect(wrappingRow.prop('spacing')).toBe('normal');
  });
  it('configures columns with the correct variants', () => {
    const { wrapper } = renderWrapper();

    expect(wrapper.find('ColEl').prop('variant')).toBe('default');
    expect(wrapper.find('ColEl').prop('spacing')).toBe('normal');
    expect(wrapper.find('ColEl').prop('sticky')).toBe(false);
  });
  it('fixes the row header column when scrollable - but not other columns', () => {
    const { wrapper } = renderWrapper({
      scrollable: true,
      children: (
        <ListRow>
          <ListCol type="header">Hello</ListCol>
          <ListCol>Content</ListCol>
        </ListRow>
      ),
    });

    expect(wrapper.find({ type: 'header', sticky: true }).length).toBe(1);
    expect(wrapper.find({ type: 'content', sticky: true }).length).toBe(0);
  });
  it('renders ListRow with expanded content when expanded is true', () => {
    const { wrapper } = renderWrapper({
      children: (
        <ListRow
          expanded
          renderExpanded={() => <div id="surprise">Surprise!</div>}
        >
          <ListCol type="header">Hello</ListCol>
          <ListCol>Content</ListCol>
        </ListRow>
      ),
    });

    expect(wrapper.find('#surprise').length).toBe(1);
  });
  it('does not render ListRow with expanded content when expanded is false', () => {
    const { wrapper } = renderWrapper({
      children: (
        <ListRow
          expanded={false}
          renderExpanded={() => <div id="surprise">Surprise!</div>}
        >
          <ListCol type="header">Hello</ListCol>
          <ListCol>Content</ListCol>
        </ListRow>
      ),
    });
    expect(wrapper.find('#surprise').length).toBe(0);
  });
});
