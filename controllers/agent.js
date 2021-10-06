const Users = require('./../models/users');
const Agent = require('./../models/agent');
const Cart = require('./../models/cart');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


const welcomeEmail = (to, from) => {
    const msg = {
        to: 'latifah.pres@gmail.com',
        from: 'admin@coopershomefurniture.com',
        subject: 'Sending with Twilio SendGrid is Fun',
        text: 'Thank you for registering',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
      };
      sgMail.send(msg);
};

exports.addAgent = async (req, res) => {
    try{
        const agent = {
            email: req.body.email,
            firebase_id: req.body.firebase_id,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            address: req.body.address,
           city: req.body.city,
           state: req.body.state,
           zip: req.body.zip,
           phone: req.body.phone,
            agent: true,
        }

        const agentData = {
            cash_app_name: req.body.cash_app_name,
            agent_id: req.body.firebase_id,
        }
        console.log("agent", agent)

        console.log("agent data", agentData)
        if (!agent.email || !agent.firebase_id || !agent.first_name || !agent.last_name || !agent.address || !agent.city || !agent.state || !agent.zip || !agent.phone || !agentData.cash_app_name) {
            res.status(400).json({message: 'Please enter all fields'})
        } else {
            const msg = {
                to: `${agent.email}`,
                bcc: 'admin@coopershomefurniture.com',
                from: 'admin@coopershomefurniture.com',
                subject: 'Thank you for signing up to be a Coopers Home Furniture sales agent.',
                text: 'Thank you for signing up to be a Coopers Home Furniture sales agent.',
                html: '<p>We’re excited to see you get started on making sales!!! Please don’t forget  to download Group Me https://apps.apple.com/us/app/groupme/id392796698The and the email that you used to register will be used to add you to our chat where you will get access to our team and be allowed to ask any questions you may have. Please carefully read through the material in your information portal located in your agent dash board. The getting started document will explain in detail how our processes work. Thanks again for signing up and welcome to our sales force.</p>',
              };
              sgMail.send(msg).then(() => {
                console.log('Message sent')
            }).catch((error) => {
                console.log(error.response.body)
            })
              console.log("msg", msg)
              const newUser = await Users.addUser(agent);
              const newAgent = await Agent.addAgent(agentData);
              const cart = await Cart.addCart(agent.firebase_id);
              res.status(201).json({message: "Agent account has been created"});
        }

         
        
           
    } catch (err) {
        if (err.code === "23505") {
            res.status(500).json({message: "User account already exists"});

        } else {
            res.status(500).json({message: err})
        }
        console.log("error from add agent: ", err)
    }
};

exports.getAgentById = async (req, res) => {
    try {
        const {firebase_id} = req.params;
        const agent = await Agent.agentById(firebase_id);
        console.log("agent", agent)
        if (!agent) {
            res.status(404).json({message: `That agent could not be found`});
        } else {
            res.status(200).json(agent);
        }
    } catch(err) {
        res.status(500).json({message:`An agent by that ID was not found, ${err.message}`});
        console.log('get agent by id error', err.message)
    }
};

exports.editAgent = async (req, res) => {
    try {
        const updatedAgent = req.body;
        const {id} = req.params;
        const agent = await Agent.editAgent(updatedAgent, id);
        if (!agent || !id) {
            res.status(404).json({message: `Agent information was not updated`});
        } else {
            res.status(201).json(agent);
        }
      } catch (error) {
        res.status(500).json({ message: `Error updating agent: ${error.message}` });     
     }
};