module.exports = {
    indexView: (req, res, next) => {
        res.render('../views/home/index.pug');
    },

    about: (req, res, next) => {
        res.render('../views/home/about.pug');
    }
}