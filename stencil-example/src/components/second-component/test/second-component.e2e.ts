import { newE2EPage } from '@stencil/core/testing';

describe('second-component', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<second-component></second-component>');

    const element = await page.find('second-component');
    expect(element).toHaveClass('hydrated');
  });
});
