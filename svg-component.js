/**
 * Copyright 2024 NicholasLetwin
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `svg-component`
 * 
 * @demo index.html
 * @element svg-component
 */
export class svgComponent extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "svg-component";
  }

  // method to get the file location for the SVG based on the goal number
  getSvgPath() {
    
    return new URL(`./lib/svgs/${this.goal}.svg`, import.meta.url).href; 
  }

  

  constructor() {
    super();
    this.goal = 1; // default goal set to 1 (No poverty)
    this.label = ""; 
    this.colorOnly = false; // boolean that controls whether to show only the color square
    this.width = "254px";
    this.height = "254px";
    this.title = this.getGoalDescription(); // Sets title to goal description
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Title",
    };

    

    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/svg-component.ar.json", import.meta.url).href +
        "/../",
      locales: ["ar", "es", "hi", "zh"],


    
    });
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      goal: { type: String }, //svg goal number 1-17
      label: { type: String }, // custom ALT text
      colorOnly: { type: Boolean }, // bool to render color square only
      width: { type: String }, // width of svg/square
      height: { type: String }, //height
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
      }
      .wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin: var(--ddd-spacing-8);
        padding: var(--ddd-spacing-16);
        width: 100%;
        height: 100%;
      }
      .color-square {
  display: block;
  width: 100%;
  height: auto;

  aspect-ratio: 1 / 1; // keeps color box in square 
}
      h3 span {
        font-size: var(--svg-component-label-font-size, var(--ddd-font-size-s));
      }
      
     

:host { // Color codes for the different SDG goals
  --un-sdg-goal-1: #eb1c2c;
  --un-sdg-goal-2: #d2a02a;
  --un-sdg-goal-3: #2c9b48;
  --un-sdg-goal-4: #c21f33;
  --un-sdg-goal-5: #ef402a;
  --un-sdg-goal-6: #00add8;
  --un-sdg-goal-7: #fdb713;
  --un-sdg-goal-8: #8f1737;
  --un-sdg-goal-9: #f36d24;
  --un-sdg-goal-10: #e01583;
  --un-sdg-goal-11: #f99c24;
  --un-sdg-goal-12: #cf8d2a;
  --un-sdg-goal-13: #48773d;
  --un-sdg-goal-14: #007dbb;
  --un-sdg-goal-15: #3faf49;
  --un-sdg-goal-16: #01558a;
  --un-sdg-goal-17: #193667;
}
    `];
  }

  // Lit render the HTML
  render() {
    
    return html`
<div class="wrapper" style="width: ${this.width}; height: ${this.height};">
  <h3><span>${this.t.title}:</span> ${this.title}</h3>
  <slot></slot>
  ${this.colorOnly
        ? html`<div class="color-square" 
                    style="background-color: var(--un-sdg-goal-${this.goal}); width: ${this.width}; height: ${this.height};">
                </div>`
        : html`<img src="${this.getSvgPath()}" 
                    alt="${this.label || `Goal ${this.goal}: ${this.getGoalDescription()}`}"
                    width="${this.width}" 
                    height="${this.height}" 
                    loading="lazy" 
                    fetchpriority="low" />`} <!-- renders SVG image if colorOnly is false -->
</div>`;
  }

  // returns the description for current SDG goal based on goal number
  getGoalDescription() {
    const descriptions = [
      'No Poverty', 'Zero Hunger', 'Good Health and Well-being', //  goal descriptions
      'Quality Education', 'Gender Equality', 'Clean Water and Sanitation', 
      'Affordable and Clean Energy', 'Decent Work and Economic Growth', 
      'Industry, Innovation and Infrastructure', 'Reduced Inequality',
      'Sustainable Cities and Communities', 'Responsible Consumption and Production',
      'Climate Action', 'Life Below Water', 'Life on Land', 
      'Peace, Justice and Strong Institutions', 'Partnerships for the Goals'
    ];
    return descriptions[this.goal - 1] || 'Sustainable Development Goal';// returns description or fall back to previous
  }

  // method for whenever properties change
  updated(changedProperties) {
    if (changedProperties.has('goal')) { // checks if 'goal' property has changed
      this.title = this.getGoalDescription();  // updates title when goal changes
    }
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(svgComponent.tag, svgComponent);