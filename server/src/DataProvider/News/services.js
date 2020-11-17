const News = require('../data').News;

/**
 * Add news
 * @param {String} title 
 * @param {String} newsText 
 * @param {String} postedBy 
 * @param {Date} date 
 * @param {String} course 
 */
const add = async (title, newsText, postedBy, date, course) => {

    const news = new News({
        title,
        newsText,
        postedBy,
        date,
        course
    });
    await news.save();
};

/**
 * Get all news
 */
const getAll = async () => {
    return await News.find();
};

/**
 * Get news by id
 * @param {String} id 
 */
const getById = async (id) => {
    return await News.findById(id);
};

/**
 * Update news by id
 * @param {String} id 
 * @param {String} title 
 * @param {String} newsText 
 * @param {String} course 
 */
const updateById = async (id, title, newsText, course) => {
    await News.findByIdAndUpdate(id, {
        $set: {
            "title": title,
            "newsText": newsText,
            "course": course
        }
    });
};

/**
 * Delete news by id
 * @param {String} id 
 */
const deleteById = async (id) => {
    await News.findByIdAndDelete(id);
};

module.exports = {
    add,
    getAll,
    getById,
    updateById,
    deleteById
}