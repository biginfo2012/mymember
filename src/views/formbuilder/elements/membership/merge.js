
export default class MergeElement {
  label = 'First name';
  constructor(label, name, type) {
    this.label = label;
    this.name = name;
    this.type = type;
  }

  getElement() {
    return {
      model: {
        // Default properties
        defaults: {
          tagName: 'div',
          attributes: {class: 'merge element'},
          draggable: false, // Can be dropped only inside `form` elements
          droppable: false, // Can't drop other elements inside
          components: this.label,
          styles: ``,
          stylable: [],
        }
      }
    }
  }
}

