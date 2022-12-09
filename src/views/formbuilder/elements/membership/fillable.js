
export default class MergeElement {
  label = 'First name';
  type = 'text';
  name = 'first_name'
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
          attributes: {class: ' element'},
          draggable: '.section-column-child', // Can be dropped only inside `form` elements
          droppable: false, // Can't drop other elements inside
          components: [
            {
              tagName: 'h5',
              type: this.type,
              content: this.label,
              draggable: false,
              droppable: true,
              selectable: false,
              hoverable: false,
              attributes: {class: 'fillable', name: this.name, inputType: this.type}
            },
            {
              tagName: 'div',
              components: [
                {
                  tagName: 'i',
                  components: '',
                  hoverable: false,
                  badgable: false,
                  draggable: false,
                  droppable: false,
                  selectable: false,
                  attributes: {class: 'fa fa-plus'},
                }
              ],
              hoverable: false,
              badgable: false,
              draggable: false,
              droppable: false,
              selectable: false,
              attributes: {class: 'bottom add-more-element'},

            }
          ],
          styles: `
                .heading {padding: 10px;}
          `,
          stylable: ['heading-1','heading-2','font-size','align-content'],
        }
      }
    }
  }
}

