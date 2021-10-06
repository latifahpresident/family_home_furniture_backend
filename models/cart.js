const db = require('./../dbconfig');
getCartById = id => {
  return db("cart")
    .where({ firebase_id: id })
    .first();
};

getCartItems = id => {
  return db('cart_item')
    .innerJoin('products', 'cart_item.product_id', 'products.id')
    .innerJoin('colors', 'cart_item.color_id', 'colors.id') 
    .innerJoin('images', 'cart_item.image_id', 'images.id') 
    .innerJoin('cart', 'cart_item.cart_id', 'cart.firebase_id')
    .select([
      "cart_item.id",
      "product_id",
      "products.title",
      "products.description",
      "products.price",
      "colors.name as colors",
      "images.image_url",
      "images.id as image_id",
      "colors.id as color_id"
    ])
    .where({ cart_id: id });
};

  addToCart = (product_id,  cart_id, price,  color_id, image_id, quantity,) => {
    let addedItem = {
      product_id,
      cart_id,
      price,
      color_id,
      image_id,
      // quantity,
    };
  
    console.log("added item", addedItem.image_id);
    return db("cart_item").insert(addedItem);
  };

  removeFromCart = (id) => {
    return db("cart_item").where({ id }).delete();
  };


  editCart = (id, updates) => {
    return db("cart_item").where({ id }).update(updates);
  };

  async function addCart(firebaseId) {
    try {
      let addedCart = {
        firebase_id: firebaseId
      };
      const [id] = await db("cart")
        .insert(addedCart)
        .returning("id");
      return getCartById(id);
    } catch (err) {
      console.log(err);
    }
  };

  module.exports = {
      addToCart,
      getCartItems,
      removeFromCart,
      addCart,
      
  };