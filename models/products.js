const db = require('../dbconfig.js');


products = () => {
    return db('products')
    .innerJoin('colors', 'products.title', 'colors.product_title')
    .innerJoin('images', 'products.title', 'images.product_title')
    .select('products.id', 'products.title', 'products.price', 'products.description', 'products.category', 'products.quantity', 'products.item_number', 'products.supplier', 
    'products.out_of_stock', 'products.back_in_stock', 'colors.id as color_id', 'colors.name as colors', 'images.id as image_id', 'images.image_url as images')
};

productById = (id) => {
    console.log("id from model", id)
    return db('products')
    .select('products.id', 'products.title', 'products.price', 'products.description', 'products.category', 'products.quantity', 'products.item_number', 'products.supplier')
    .where({'products.id': id})
};

getByCategory = (cat) => {
    return db('products')
    .innerJoin('colors', 'products.title', 'colors.product_title')
    .innerJoin('images', 'products.title', 'images.product_title')
    .select('products.id', 'products.title', 'products.price', 'products.description', 'products.category', 'products.quantity', 'products.item_number', 'products.supplier', 'products.out_of_stock', 'products.back_in_stock', 'colors.name as colors', 'images.image_url as images')

    .where({'products.category': cat})
}

addProduct = (product) => {
    return db('products').insert(product)
};

filterBy = (col, filter) => {
  
    return db('products')
    .innerJoin('colors', 'products.title', 'colors.product_title')
    .innerJoin('images', 'products.title', 'images.product_title')
    .select(
        'products.id', 
        'products.title', 
        'products.price', 
        'products.description', 
        'products.category', 
        'products.quantity', 
        'products.item_number', 
        'products.item_name', 
        'products.item_price',
        'products.supplier', 
        'colors.id as color_id',  
        'colors.name as colors', 
        'products.out_of_stock', 
        'products.back_in_stock', 
        'images.id as image_id', 
        'images.image_url as images',
        )

    .where(`products.${col}`, filter)
};

editProduct = (id, product) => {
    return db('products').where({ id }).update(product)
};

deleteProduct = (id) => {
    return db('products').where({ id }).del()
};

//COLOR MODELS
getColors = () => {
    return db('colors');
};

colorBy = (product_title) => {
    console.log("title from backend", product_title)
    return db('colors')
    .where({'colors.product_title': product_title})
};

addColor =(color) => {
    return db('colors').insert(color);
};

editColor = (color_id, color) => {
    return db('colors').where({ 'colors.id': color_id }).update(color)
};

deleteColor = (color_id) => {
    return db('colors').where({ 'colors.id': color_id }).del()
};

//IMAGE MODELS
getImages = () => {
    return db('images');
};

imageBy = (product_title) => {
    console.log("title from backend", product_title)
    return db('images')
    .where({'images.product_title': product_title})
};

addImage =(image) => {
    return db('images').insert(image);
};

editImage = (image_id, image) => {
    return db('images').where({ 'images.id': image_id }).update(image)
};

deleteImage = (image_id) => {
    return db('images').where({ 'images.id': image_id }).del()
};

module.exports = {
    products,
    productById,
    addProduct,
    editProduct,
    deleteProduct,
    filterBy,
    addColor,
    colorBy,
    getColors,
    addImage,
    imageBy,
    getImages,
    getByCategory,
    editColor,
    deleteColor,
    editImage,
    deleteImage
}