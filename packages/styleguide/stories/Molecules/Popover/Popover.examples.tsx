import {
  Box,
  Column,
  Container,
  FillButton,
  FlexBox,
  LayoutGrid,
  Popover,
  PopoverProps,
} from '@codecademy/gamut';
import {
  CheckerDense,
  CheckerLoose,
  CheckerRegular,
  DiagonalADense,
  DiagonalALoose,
  DiagonalARegular,
} from '@codecademy/gamut-patterns';
import React, { useRef, useState } from 'react';

export const PopoverExample = (args: PopoverProps) => {
  const [open, setOpen] = useState(false);
  const activeElRef = useRef<HTMLDivElement>(null);
  const toggleOpen = () => setOpen(!open);
  return (
    <>
      <Box ref={activeElRef}>
        <FillButton onClick={toggleOpen}>Open Popover</FillButton>
      </Box>
      <Container>
        <Popover
          {...args}
          isOpen={open}
          targetRef={activeElRef}
          onRequestClose={() => setOpen(false)}
        >
          <FlexBox flexDirection="column" p={16} alignItems="flex-start">
            <Box fontSize={16} mb={8}>
              Hooray!
            </Box>
            <FillButton size="small" onClick={() => setOpen(false)}>
              Close Popover
            </FillButton>
          </FlexBox>
        </Popover>
      </Container>
    </>
  );
};

export const PopoverWithoutFocus = (args: PopoverProps) => {
  const [open, setOpen] = useState(false);
  const activeElRef = useRef<HTMLDivElement>(null);

  const toggleOpen = () => setOpen(!open);

  return (
    <>
      <Box ref={activeElRef}>
        <FillButton onClick={toggleOpen}>Open Popover</FillButton>
      </Box>
      <Container>
        <Popover
          {...args}
          isOpen={open}
          targetRef={activeElRef}
          onRequestClose={() => setOpen(false)}
        >
          <FlexBox flexDirection="column" p={16} alignItems="flex-start">
            <Box fontSize={16} mb={8}>
              Nothing clickable here but the container has fallback focus
            </Box>
          </FlexBox>
        </Popover>
      </Container>
    </>
  );
};

export const PatternedPopoversGrid = (args: PopoverProps) => {
  return (
    <LayoutGrid columnGap={8} rowGap={48}>
      {([
        [CheckerDense, 'CheckerDense'],
        [CheckerLoose, 'CheckerLoose'],
        [CheckerRegular, 'CheckerRegular'],
        [DiagonalADense, 'DiagonalADense'],
        [DiagonalALoose, 'DiagonalALoose'],
        [DiagonalARegular, 'DiagonalARegular'],
      ] as const).map(([pattern, patternName]) => (
        <Column key={patternName} size={4}>
          <FlexBox justifyContent="center">
            <PopoverExample {...args} pattern={pattern} />
          </FlexBox>
        </Column>
      ))}
    </LayoutGrid>
  );
};
