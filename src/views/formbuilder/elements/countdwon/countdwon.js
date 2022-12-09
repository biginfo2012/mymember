let Countdown = {
    model: {
        defaults: {
            tagName: 'div',
            droppable: true,
            attributes: { class: 'count-dwon element' },
            components: [
                {
                    tagName: 'count-down',
                    type: 'count-dwon',
                    components: 'Count Down',
                    draggable: true,
                    droppable: true,
                    selectable: true,
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
            ul {
                margin-top: 15px;
                list-style: none;
                display:flex;
                @include flexCenter;
                column-gap: 50px;
                li {
                    text-align: center;
                    h1 {
                        font-size: $h1-font-size;
                    }
                    p {
                        font-size: 14px;
                    }
                }
            }
        }
        @media screen and (max-width: 768px) {
            section {
                $h1-font-size: 40px;

                > h2 {
                    font-size: 20px;
                }
                > h1 {
                    font-size: $h1-font-size;
                }
                ul {
                    column-gap: 45px;
                    li {
                        h1 {
                            font-size: $h1-font-size;
                        }
                        p {
                            font-size: 12px;
                        }
                    }
                }
            }
        }
        @media screen and (max-width: 425px) {
            section {
                ul {
                    column-gap: 30px;
                }
            }
              `,
        }
    }
}

export default Countdown

