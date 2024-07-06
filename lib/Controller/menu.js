module.exports = class Menu {
    constructor(req)
    {
        this.req = req;
    }

    list()
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
                },
                6: {
                    id: 6,
                    title: 'Капучино на бабановом',
                    available: true,
                    categoryId: 2,
                },
            },
        };
    }
}
