const Products = require('../models/products');
const Users = require('./../models/users');
const Cart = require('./../models/cart');
const generateAdmin = require("./../middleware/auth");

exports.addAdmin = async (req, res) => {
    try{
        const admin = {
            email: req.body.email,
            firebase_id: req.body.firebase_id,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            admin: true,
        }
        console.log("admin", admin)
        if (!admin.email || !admin.firebase_id || !admin.first_name || !admin.last_name) {
            res.status(400).json({message: 'Please enter all fields'})
        } else {
            const newUser = await Users.addUser(admin);
            const cart = await Cart.addCart(admin.firebase_id);
            console.log("admin", newUser)

            res.status(201).json({message: "Admin account has been created"});
        }
    } catch (err) {
        res.status(500).json({message: err});
        console.log("error from add admin: ", err)
    }
};

exports.addProducts = async (req, res) => {
    try {
        const product = {
            title: req.body.title,
            price: req.body.price,
            description: req.body.description,
            // image_url: req.body.image_url,
            category: req.body.category,
            quantity: req.body.quantity,
            item_number: req.body.item_number,
            item_name: req.body.item_name,
            item_price: req.body.item_number,
            supplier: req.body.supplier,
            
        }
        const colors = req.body.color
        const images = req.body.image_url
        console.log("body colors", colors)
        console.log("body images from add product", images)
        console.log("added product", product)

    if (!product.title || !product.price || !product.description  || !product.category || !product.quantity || !product.item_number || !product.item_name  || !product.supplier) {
        res.status(400).json({message: `Please enter all required fields`})
    } else {
        const addedColors = colors.map(color => ({
           name: color,
           product_title: product.title
          }));
          const addedImages = images.map(image => ({
            image_url: image,
            product_title: product.title
           }));
          console.log("added colors", addedColors)
          console.log("added images", addedImages)

        const productData = await Products.addProduct(product);
        const newColor = await Products.addColor(addedColors);
        const newImage = await Products.addImage(addedImages);

        res.status(201).json('Product added')
    }
} catch (err) {
    if (err.code === '23505') {
        res.status(500).json({message: "That product already exists"});

    } else {
        res.status(500).json({message: "There was an error adding that product please try again"});

    }
    console.log(err, 'error from add product')
}
};

exports.editProduct = async (req, res, next) => {
    const { id }  = req.params;
    const color_id  = req.body.color_id
    console.log(req.body.colors, "colors")
    const updatedProduct = {
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        quantity: req.body.quantity,
        item_number: req.body.item_number,
        supplier: req.body.supplier,
        out_of_stock: req.body.out_of_stock,
        back_in_stock: req.body.back_in_stock,
    };

    console.log("updatedProduct", updatedProduct)

    const updatedColor = {
        name: req.body.color
    }
    console.log("updatedColor", updatedColor)

    try {
        const product = await Products.productById(id)
        if(!product) {
            //TODO: BETTER ERROR HANDLING NOT THROWING ERROR HERE
            res.status(404).json({message: "That product was not found"})
        } else {
            
            const newProduct = await Products.editProduct(id, updatedProduct);
            console.log("newroduct", newProduct)

            const newColor = await Products.editColor(color_id, updatedColor);
            console.log("newColor", newColor)
            res.status(200).json({message: `Producted updated!`})
        }
    } catch (err) {
        res.status(500).json(err)
        console.log(err, 'error from edit');
    }
};

exports.deleteProduct = async (req, res, next) => {
    //products?id=12y&color_id=1&image_id=1
    const { id, color_id, image_id } = req.query;
    console.log("id", id)
    try {
       
        if (id ) {
            const productData = await Products.deleteProduct(id)
            const ColorData = await Products.deleteColor(color_id)
            const ImageData = await Products.deleteImage(image_id)
            res.status(204).json({message: `product deleted`})
        } else {
            res.status(404).json({message: `No product was provide to be deleted. Please try again`})
        }
    } catch (err) {
        res.status(500).json({message: `There was a problem deleting that product, ${err.message}`})
    }
};

exports.getUsers = async (req, res) => {
    try {
        const UserData = await Users.users();
        if (UserData.length === 0) {
            res.status(404).json({message: "No customers found"})
        } else {
        res.status(200).json(UserData);
        }
    } catch (err) {
        res.status(500).json({message: "Error getting users: ", err});

    }
};

exports.deleteUser = async (req, res) => {
    try {
        const {id} = req.params;
        if (!id) {
            res.status(404).json(`User not deleted`);
        } else {
            const deletedUser = await Users.deleteUser(id);
            res.status(200).json(`User has been deleted`);
        }
    } catch(err) {
        res.status(500).json({message: `error deleting user`, err});
    }
};

exports.addOrder = async (req, res, next) => {
    try {
        const {customer_email} = req.body
      if (!customer_email) {
        res.status(404).json({ message: "Please add the customers email to complete this order" });
      } else {
        const orders = req.body;
        const OrdersToInsert = orders.map(order => ({
          product_id: order.product_id,
          customer_id: order.customer_id,
          status: order.status,
          order_total: order.order_total,
          customer_email: order.customer_email,
          agent_id: order.agent_id,
        }));
        console.log("OrdersToInsert: ", OrdersToInsert);
  
        const addedOrder = await Orders.addOrderByVendorId( OrdersToInsert);
  
        console.log("Added Order:", addedOrder);
        res.status(201).json({message: "Your order has beend added"});
      }
    } catch (err) {
      res.status(500).json(`Cannot add order: ${err}`);
      console.log(err);
    }
  };

  exports.getAgents = async (req, res) => {
    try {
        const UserData = await Users.getAgents();
        if (UserData.length === 0) {
            res.status(404).json({message: "No agents found"})
        } else {
        res.status(200).json(UserData);
        }
    } catch (err) {
        res.status(500).json({message: "Error getting agents: ", err});

    }
};