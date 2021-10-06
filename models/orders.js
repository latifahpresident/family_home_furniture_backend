const db = require("./../dbconfig");
const { where } = require("./../dbconfig");

 addOrder = (addedOrder, order_total) => {
     let newOrder = {
         addedOrder,
     }
  return db("order").insert(addedOrder, order_total)
  .returning('id')
.into('order')


};

filterOrdersBy = (col, filter) => {
    return db("order").where(`${col}`, filter)
};

getOrders = () => {
    return db("order")
    .innerJoin("order_items", "order.id", "order_items.order_id")
    .innerJoin("products", "order_items.product_id", "products.id")
    .select(
        "order.id", 
        "order.order_total", 
        "order.customer_email", 
        "order.customer_first_name", 
        "order.customer_last_name", 
        "order.customer_address", 
        "order.customer_city", 
        "order.customer_state", 
        "order.customer_zip", 
        "order.customer_phone", 
        "order.agent_id", 
        "order.agent_commision", 
        "products.title", 
        "order_items.price",
        "order.notes",
        "order.status",
        
        )
};

getOrdersByAgentId = (agent_id) => {
    return db("order")
    .innerJoin("users", "order.agent_id", "users.firebase_id")
    .innerJoin("agents", "order.agent_id", "agents.agent_id")
    .innerJoin("order_items", "order.id", "order_items.order_id")

    .innerJoin("products", "order_items.product_id", "products.id")

    .select(
        "order.id", 
        "order.order_total", 
        "order.customer_email", 
        "order.customer_first_name", 
        "order.customer_last_name", 
        "order.customer_address", 
        "order.customer_city", 
        "order.customer_state", 
        "order.customer_zip", 
        "order.customer_phone", 
        "order.agent_id", 
        "order.agent_commision", 
        "order.status",
        "products.title", 
        "order_items.price",
        "order.notes",
        "users.first_name",
        "users.last_name",
        "users.email",
        "agents.cash_app_name"
        )
    .where({"order.agent_id": agent_id})
};

getOrdersByCustomer = (customer_email) => {
    return db("order")
    .innerJoin("products", "order.product_id", "products.id")
    .select("order.id", "order.order_total", "order.customer_email", "order.customer_email", "order.customer_address", "order.customer_city", "order.customer_state", "order.customer_zip", "order.customer_phone", "order.agent_id", "order.agent_commision", "products.title", "products.price", "products.item_number", "products.item_name" )
    .where({"customer_email": customer_email})
};

getOrderItems = (id) => {
    return db('order_items')
    .innerJoin('products', 'order_items.product_id', 'products.id')
    .innerJoin('colors', 'order_items.color_id', 'colors.id') 
    .innerJoin('images', 'order_items.image_id', 'images.id') 
    .innerJoin('order', 'order_items.order_id', 'order.id')
    .select(
        [
            "order.id",
            "order.status",
            "order.customer_first_name",
            "order.customer_last_name",
            "order.customer_email",
            "order.customer_address",
            "order.customer_city",
            "order.customer_state",
            "order.customer_zip",
            "order.customer_phone",
            "order.agent_id",
            "order.notes",
            "order.created_at",

            "order_items.product_id",
            "products.title",
            "products.description",
            "products.price",
            "colors.name as colors",
            "images.image_url",
            "order_items.quantity"
        ]
    )
    .where({'order_items.id': id})

};

async function deleteOrder (id) {
    try{
        return db("order").where({id: id}).delete();
    }
    catch(err){
        console.log(err);
    }
};

async function updateOrder(order, id) {
    try{
        console.log("Our updated order :", order);
        return db("order").where({id: id}).update(order);
    }
    catch(err){
        console.log(err);
    }
}

addToOrderItems = (items) => {
    
  
    console.log("added item", items);
    return db("order_items").insert(items);
  };

  getOrderById = (id) => {
    console.log("id from model", id)
    return db("order")
    .innerJoin("order_items", 'order.id', 'order_items.order_id')
    .innerJoin("products", "order_items.product_id", "products.id")
    .innerJoin("colors", "order_items.color_id", "colors.id")
    .innerJoin("images", "order_items.image_id", "images.id"  )
    .select(
        
            "order.id",
            "order.status",
            "order.customer_first_name",
            "order.customer_last_name",
            "order.customer_email",
            "order.customer_address",
            "order.customer_city",
            "order.customer_state",
            "order.customer_zip",
            "order.customer_phone",
            "order.agent_id",
            "order.notes",
            "order.created_at",
            'order.order_total',
            "order_items.product_id",
            "products.title",
            "products.description",
            "products.price",
            "colors.name as colors",
            "images.image_url",
            "order_items.quantity"
        
    )
    .where({'order.id': id})

};
module.exports = {
    addOrder,
    getOrders,
    filterOrdersBy,
    getOrdersByAgentId,
    
    deleteOrder,
    updateOrder,
    getOrdersByCustomer,
    addToOrderItems,
    getOrderItems,
    getOrderById
}