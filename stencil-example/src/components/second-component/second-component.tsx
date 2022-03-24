import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'second-component',
  styleUrl: 'second-component.css',
  shadow: false,
})
export class SecondComponent {

  render() {
    return (
      <Host>
        Hello I'm the second component!
      </Host>
    );
  }

}
