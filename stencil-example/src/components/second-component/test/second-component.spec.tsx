import { newSpecPage } from '@stencil/core/testing';
import { SecondComponent } from '../second-component';

describe('second-component', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SecondComponent],
      html: `<second-component></second-component>`,
    });
    expect(page.root).toEqualHtml(`
      <second-component>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </second-component>
    `);
  });
});
