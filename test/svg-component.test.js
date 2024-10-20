import { html, fixture, expect } from '@open-wc/testing';
import "../svg-component.js";

describe("svgComponent test", () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <svg-component
        title="title"
      ></svg-component>
    `);
  });

  it("basic will it blend", async () => {
    expect(element).to.exist;
  });

  it("passes the a11y audit", async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
