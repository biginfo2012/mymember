let Imageupload = {

  model: {
    defaults: {
      tagName: 'div',
      draggable: '.section-column-child', // Can be dropped only inside `form` elements
      droppable: true, // Can't drop other elements inside
      attributes: {
        class: 'image-element',
        type: 'image'
      },
      components: [
        {
          tagName: 'div',
          components: [
            {
              tagName: 'image',
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
      styles: `.image-element{
                    widht:100% !important;
                    display: flex;
                    justify-content: center; 
                  }`,
    }
  }

}

export default Imageupload
