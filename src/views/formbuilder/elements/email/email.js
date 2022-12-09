const emailType =  {
        // Make the editor understand when to bind `my-input-type`
        //isComponent: el => el.tagName === 'INPUT',
        // Model definition
        model: {
          // Default properties
          defaults: {
            tagName: 'div',
            //draggable: 'form, form *', // Can be dropped only inside `form` elements
            draggable: '.section-column-child', // Can be dropped only inside `form` elements
            droppable: false, // Can't drop other elements inside
            attributes: {class: 'email element'},
            components: [
                {
                    tagName: 'div',
                    attributes: {class: 'email-section'},
                    draggable: false,
                    droppable: false,
                    selectable: false,
                    hoverable: false,
                    components: [
                        {
                            tagName: 'input',
                            attributes: {
                                type: 'text',
                                name: 'email',
                                class: 'email-input'
                            },
                            draggable: false,
                            droppable: false,
                            selectable: false,
                            hoverable: false,
                        },
                    ],
                },
                {
                    tagName: 'div',
                    type: 'text',
                    components: 'example@example.com',
                    attributes: {class: 'email-text'},
                    draggable: false,
                    droppable: false,
                    selectable: false,
                    hoverable: false,
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
            traits: [
                'name',
                'placehoder',
                {
                    type: 'checkbox'
                }
            ],
            styles: `.email {padding: 10px;}
                     .email-text {width: 50%}
                     .email-input {width: 40%; height: 35px; border-radius: 5px;}
            `
          }
        },
    }

export default emailType
