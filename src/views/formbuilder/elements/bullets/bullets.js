
const createBullet = (value) => ({
  tagName: 'li',
  components: [
    {
      tagName: 'i',
      components: '',
      hoverable: false,
      badgable: false,
      draggable: false,
      droppable: false,
      selectable: false,
      attributes: { class: 'fa fa-check' }
    },
    {
      tagName: 'span',
      content: value,
      type: 'text',
      hoverable: false,
      badgable: false,
      draggable: false,
      droppable: false,
      selectable: false,
      attributes: { class: 'bullet-list-content' }
    }
  ],
  layerable: false,
  droppable: false,
  draggable: false,
  selectable: false,
  hoverable: false,
});
let bulletType = {
  model: {
    defaults: {
      tagName: 'div',
      draggable: '.section-column-child',
      droppable: false,
      attributes: { class: 'bullet element' },
      components: [
        {
          tagName: 'ul',
          attributes: { class: '' },
          layerable: false,
          droppable: false,
          draggable: false,
          selectable: false,
          hoverable: false,
          components: [
            createBullet('test')
          ]
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
              attributes: { class: 'fa fa-plus' },
            },
            {
              tagName: 'i',
              components: '',
              hoverable: false,
              badgable: false,
              draggable: false,
              droppable: false,
              selectable: false,
              attributes: { class: 'fa fa-plus' },
            },
            {
              tagName: 'i',
              components: '',
              hoverable: false,
              badgable: false,
              draggable: false,
              droppable: false,
              selectable: false,
              attributes: { class: 'fa fa-plus' },
            }
          ],
          hoverable: false,
          badgable: false,
          draggable: false,
          droppable: false,
          selectable: false,
          attributes: { class: 'bottom add-more-element' },

        }
      ],
      styles: `
                .input-table{ padding: 10px }
            `
    }
  },
  view: {
    events: {
      keydown: 'handleKeyDown'
    },
    handleKeyDown(e) {
      let parentUL = this.model.getChildAt(0);
      if (e.keyCode == 13) {
        e.preventDefault();
        parentUL.append(createBullet(''));
        return false;
      } else if (e.keyCode == 8) {
        if (e.target.innerText.length <= 1) {
          if (parentUL.attributes.components.length > 1) {
            let id = e.target.parentElement.id;
            let childModels = parentUL.attributes.components.models;
            for (var i = 0; i < childModels.length; i++) {
              if (childModels[i].view.el.id == id) {
                console.log("Remove index is " + i);
                console.log(parentUL);
                console.log(parentUL.getChildAt(i));
                parentUL.getChildAt(i).remove();
                return false;
              }
            }


          }


        }

      }
      return true;

    }
  }
}

export default bulletType
