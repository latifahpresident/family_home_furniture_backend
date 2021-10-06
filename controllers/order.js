const Orders = require("../models/orders.js");
const Products = require("../models/products");

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Orders.getOrders();
    console.log("orders", orders)
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(`No orders found: ${err}`);
    console.log(err);
  }
};


exports.filterOrderBy = async (req, res) => {
    //products?col=catergory&filter=rings
    try {
        const {col, filter} = req.query
        console.log("col", col)
        console.log("filter", filter)

        if (!col && !filter) {
            res.status(404).json({message: "Enter a column and filter"})
        } else {
            const orders = await Orders.filterOrdersBy(col, filter)
          
            console.log("orders", orders)
            res.status(200).json(orders)
        }        
    } catch (err) {
        res.status(500).json(err)
        console.log(err, "error from filter by")
    }
}

exports.getOrderById = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log(id);
    const order = await Orders.getOrderById(id);
    console.log("get order by id", order)
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: `error getting order` });
    console.log(err, "error from order by id");
  }
};

exports.getOrdersByAgentId = async (req, res, next) => {
  try {
    const agent_id = req.params.agent_id;
    console.log("agent id,", agent_id);
    if (!agent_id) {
      res.status(404).json({ message: "That agent could not be found" });
    } else {
      const orders = await Orders.getOrdersByAgentId(agent_id);
      console.log("Order Data:", orders);
      res.status(200).json(orders);
    }
  } catch (err) {
    res.status(500).json(`No orders found: ${err}`);
    console.log(err);
  }
};

exports.addOrder = async (req, res, next) => {
  try {
    console.log("req.body", req.body.orderObj)
    const order = 
    {
      customer_first_name: req.body.orderObj.customer_first_name, 
      customer_last_name: req.body.orderObj.customer_last_name, 
      customer_email: req.body.orderObj.customer_email, 
      customer_address: req.body.orderObj.customer_address, 
      customer_city: req.body.orderObj.customer_city, 
      customer_state: req.body.orderObj.customer_state, 
      customer_zip: req.body.orderObj.customer_zip, 
      customer_phone: req.body.orderObj.customer_phone, 
      agent_id: req.body.orderObj.agent_id, 
      order_total: req.body.orderObj.order_total, 
      notes: req.body.orderObj.notes,
      product_id: req.body.orderObj.product_id,
      status: req.body.orderObj.status,
      order_total: req.body.orderObj.order_total,
    } 
   console.log("order notes", order.notes)
   const order_items = req.body.order_items
    if (!order) {
      res.status(404).json({ message: "Error processing your order"  });
    } else {
      const addedOrder = await Orders.addOrder(order);

      const addedOrderItems =  order_items.map(item => ({
        order_id: addedOrder[0],
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price,
        color_id: item.color_id,
        image_id: item.image_id,
      }));

      console.log("added order items", addedOrderItems);

      const addItem = await Orders.addToOrderItems(addedOrderItems)

      //GET ADDED ITEMS 
      const new_order = await Orders.getOrderById(parseInt(addedOrder));
      const mapItem = new_order.map(item => {
      return JSON.stringify(item) 
      })

      const string = JSON.stringify(new_order)
      let arritems = {}
      const orderItem = new_order.forEach(item => {
        console.log("item",  item.title),       
       arritems = { 
         title: item.title,
        price: item.price,
        color: item.colors,
        image_url: item.image_url,
        quantity: item.quantity,
      }
      return arritems
      })
      let prodTitle = {}
      const sendEmail = () => {
        let msg = {}
       new_order.forEach(item=> {
          console.log(item.title);
          console.log(item.price);
          prodTitle = item.title  
        });
           
  
      }
   
      console.log("prodTitle", prodTitle)
  
     const msg = {
        to: [order.customer_email],
         from: 'latifah.pres@gmail.com',
        subject: `Cooper's Home Furniture Order Confirmation`,
        html:
        `<head>
          <title></title>
        </head>
        <body>
          <div data-role="module-unsubscribe" class="module" role="module" data-type="unsubscribe" style="color:#444444; font-size:12px; line-height:20px; padding:16px 16px 16px 16px; text-align:Left;" data-muid="4e838cf3-9892-4a6d-94d6-170e474d21e5">
            <p>This is a conformation that your order has been processed.
            You will receive a delivery time within the next 24 hours. Thanks for being a valued customer. Please see order below. If any part of this order is incorrect please reach out to us at booking@coopershomefurniture.com</p>
            <h3 style="margin-top:4rem;">Order #${addedOrder}</h3>
            <p style="font-size:12px; line-height:20px;"> Name on order:  ${order.customer_first_name} ${order.customer_last_name}</p>
             <p style="text-transform:capitalize">Address: ${order.customer_address} ${order.customer_city} ${order.customer_state}, ${order.customer_zip}</p>
            <p>Phone Number: ${order.customer_phone}</p>
            <p>Order Status: ${order.status}</p>
            <div>
              <img src=${new_order[0].image_url} alt=${new_order[0].title}/>
            </div>
             <p>${new_order[0].title} </p>
          <p>Price: $${new_order[0].price}</p>
     <p>Order Total: ${order.order_total}</p>
     <p>Order Notes: ${order.notes}</p>
          </div>
        </body>`
     
      };
      sgMail.send(msg).then(() => {
        console.log('Message sent', msg)
    }).catch((error) => {
        console.log(error.response.body)
        console.log(error.response.body.errors[0].message)
    })

      res.status(200).json(addedOrder);
    }
  } catch (err) {
    res.status(500).json(`Cannot add order: ${err.message}`);
    console.log(err);
  }
};

exports.updateOrder = async (req, res, next) => {
  try {
    const id = req.params.order_id;
    console.log("order ID:", id);
    if (!id) {
      res.status(404).json({ message: "You are missing an order id" });
    } else {
      let order = req.body;
      const updatedOrder = await Orders.updateOrder(order, id);
      console.log("Updated Order:", updatedOrder);
      res.status(200).json(updatedOrder);
    }
  } catch (err) {
    res.status(500).json(`Cannot update order: ${err}`);
    console.log(err);
  }
};

exports.removeOrder = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log("order ID:", id);
    if (!id) {
      res.status(404).json({ message: "You are missing a order id" });
    } else {
      const deletedOrder = await Orders.deleteOrder(id);
      console.log("Deleted order", deletedOrder);
      res.status(200).json(deletedOrder);
    }
  } catch (err) {
    res.status(500).json(`Cannot delete order: ${err}`);
    console.log(err);
  }
};


