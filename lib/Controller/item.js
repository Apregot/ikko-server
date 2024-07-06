module.exports = class Item {
    constructor(req)
    {
        this.req = req;
    }

    enableAction()
    {
        return true;
    }

    disableAction()
    {
        return false;
    }
}
