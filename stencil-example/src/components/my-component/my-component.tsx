import { Component, h, State, Host } from '@stencil/core';
@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: false,
})
export class MyComponent {
  
  @State() childElements: string[] = [];
  onClick() {
    for(var i = 0; i < 1000; i++) {
      this.childElements = [
        ...this.childElements,
        '<second-component></second-component>'
      ];
    }
  }

  render() {
    return <Host>
      <button onClick={() => this.onClick()}>Click Me</button>
      <h1>{ this.childElements.length } children</h1>
      <ul>
        { this.childElements.map((element) => {
          return <li innerHTML={ element }></li>
        })}
      </ul>
    </Host>
  }
}
