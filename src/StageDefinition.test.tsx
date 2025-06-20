import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import StageDefinition from './StageDefinition';

const mockStageDefinition = {
  build: ['compile', 'test'],
  deploy: ['upload', 'restart'],
};

describe('StageDefinition', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(
      <StageDefinition stageDefinition={mockStageDefinition} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
