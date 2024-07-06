module.exports = class Menu {
    constructor(req)
    {
        this.req = req;
    }

    listAction()
    {
        return {
            categories: {
                1: {
                    id: 1,
                    title: 'Холодные напитки',
                },
                2: {
                    id: 2,
                    title: 'Кофе, чай, какао',
                },
            },
            items: {
                1: {
                    id: 1,
                    title: 'Бамбл',
                    available: true,
                    categoryId: 1,
                },
                2: {
                    id: 2,
                    title: 'Эспрессо тоник',
                    available: true,
                    categoryId: 1,
                },
                3: {
                    id: 3,
                    title: 'Тропический лимонад',
                    available: false,
                    categoryId: 1,
                },

                4: {
                    id: 4,
                    title: 'Тыквенный латте',
                    available: true,
                    categoryId: 2,
                },
                5: {
                    id: 5,
                    title: 'Латте с соленой карамелью',
                    available: false,
                    categoryId: 2,
                    modificators: [1, 2, 4, 5], //первое окошко(milk): банановое или кокосовое, второе окошко(cup): в бумажном стакане или в своей кружке,
                },
                6: {
                    id: 6,
                    title: 'Капучино',
                    available: true,
                    categoryId: 2,
                    modificators: [1, 2, 3, 4, 5], //первое окошко(milk): банановое, кокосовое или ананасовое, второе окошко(cup): в бумажном стакане или в своей кружке,
                },
            },
            modificators: {
                1: {
                    id: 1,
                    title: 'банановое',
                    type: 'milk',
                    available: true,
                },
                2: {
                    id: 2,
                    title: 'кокосовое',
                    type: 'milk',
                    available: true,
                },
                3: {
                    id: 3,
                    title: 'ананасовое',
                    type: 'milk',
                    available: false,
                },
                4: {
                    id: 4,
                    title: 'в своей кружке',
                    type: 'cup',
                    available: true,
                },
                5: {
                    id: 5,
                    title: 'в бумажном стакане',
                    type: 'cup',
                    available: true,
                },
            },
        };
    }
}
