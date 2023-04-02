const express = require('express');
const router = express.Router();
const multer = require('multer');

const {Gym,validate} = require('../models/gym');
const Subscription = require('../models/subscription')

const upload = require('../config/multerConfig');
const path = require('path');
const { default: Stripe } = require('stripe');
const Joi = require("joi");





const stripe = require('stripe')('sk_test_51MqwXKLtZDUJknUFE722lacEc8I0b1kyH9OJyfQOIqDbnlX143oZCABQXWMheTwAaKptkpaXOxyTWzJzXAN72EHj00B8ej4W5b');

// router.post('/create-customer', async (req, res) => {
//   try {
//     const customer = await stripe.customers.create({
//       email: req.body.email,
//       name: req.body.name,
//       payment_method: req.body.payment_method,
//       invoice_settings: {
//         default_payment_method: req.body.payment_method,
//       },
//     });

//     res.json({ customerId: customer.id });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Something went wrong');
//   }
// });

// Define a function to create a product and price in Stripe
// async function createProductAndPrice() {
//   try {
//     // Create a product
//     const product = await stripe.products.create({
//       name: 'Gym Subscription',
//       description: 'Monthly subscription for access to our gym facilities',
//     });

//     // Create a price for the product
//     const price = await stripe.prices.create({
//       product: product.id,
//       unit_amount: 1000, // the price in cents (this represents $10.00)
//       currency: 'usd',
//       recurring: { interval: 'month' },
//     });

//     return { product, price };
//   } catch (err) {
//     console.error(err);
//     throw err;
//   }
// };

// Create a new subscription for the customer using the product and price
// router.post('/create-subscription', async (req, res) => {
//   const { customerId } = req.body;

//   try {
//     // Create product and price
//     const { product, price } = await createProductAndPrice();

//     // Create subscription
//     const subscription = await stripe.subscriptions.create({
//       customer: customerId,
//       items: [{ price: price.id }],
//       expand: ['latest_invoice.payment_intent'],
//     });

//     res.json(subscription);
//   } catch (error) {
//     res.status(400).send({ error: { message: error.message } });
//   }
// });


router.post("/stripe/:idg/:idu",async(req,res)=>{
	const {idg,idu}=req.params;
	let {amount , id}=req.body;
	try{
		const Payment=await stripe.paymentIntents.create({
			amount:amount,
			currency: 'EUR',
			description: 'Monthly subscription for access to our gym facilities',
			payment_method:id,
			confirm:true,
		});
		const startDate=new Date();
		const endDate = new Date();
		endDate.setMonth(endDate.getMonth() + 1);
		const newSubscription = new Subscription({
			user:idu, // Assuming you are using passport and req.user contains the user object
			gym: idg,
			startDate: startDate,
			endDate: endDate,
			// stripeSubscriptionId: subscription.id,
		  });

		await newSubscription.save();



		res.json({
			message:"Payment success ",
			success:true,
		})
	}catch(error){
		console.log("error...",error);
		res.json({
			message:"Payment failed ",
			success:false,
		})
	}
});







// Initialize Multer with desired configuration
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads/')
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.originalname)
//     }
//   });
  
//   const upload = multer({ storage: storage }).array('photo',5);

  // Handle file upload request
// router.post('/upload',upload.array('photo', 5), function(req, res) {
//     res.send('File uploaded successfully');
// });
router.use('/uploads', express.static(path.join(__dirname, '../uploads')));


//add new gym
router.post("/add", upload.array('photo', 5), async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		let gymExist = await Gym.findOne({ name: req.body.name });
		if (gymExist)
			return res
				.status(409)
				.send({ message: "Gym already Exist!" });
        const gym=new Gym({
            name: req.body.name,
            description: req.body.description,
            services: req.body.services,
            photo: req.files.map(file =>file.filename),
            localisation: req.body.localisation,

        });

		await gym.save();
		res.status(201)
			.send({ message: "Gym added successfully" });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

/*
router.post("/addd", upload.single('photo'), async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		let gymExist = await Gym.findOne({ name: req.body.name });
		if (gymExist)
			return res
				.status(409)
				.send({ message: "Gym already Exist!" });
        const gym=new Gym({
            name: req.body.name,
            description: req.body.description,
            services: req.body.services,
            photo: req.file.filename,
            localisation: req.body.localisation,

        });

		await gym.save();
		res.status(201)
			.send({ message: "Gym added successfully" });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});
*/




//getAll
router.get("/getAll", async (req, res) => {
    try {
      const gyms = await Gym.find();
      res.status(200).send(gyms);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

//get



//getById
router.get("/getbyid/:id",async (req, res) => {
	try {
		const data=await Gym.findById(req.params.id);
		res.json(data);
		//res.status(200).send(data);
	} catch (err) {
		res.send(err)
	}
});


//find by localisation

  router.get("/findbyloc/:localisation", async (req, res) => {
	const localisation = req.params.localisation;
	const filteredGyms = await Gym.find({ localisation: localisation }).exec();
	res.json(filteredGyms);
  });

  


/*find by name
 router.get("/findbyName/:name", async (req, res) => {
	const name = req.params.name;
	const filteredGyms = await Gym.find({ name: name }).exec();
	res.json(filteredGyms);
  });*/

 /* //find by service
  router.get("/findbyService/:services", async (req, res) => {
	const services = req.params.services;
	const filteredGyms = await Gym.find({ services: services }).exec();
	res.json(filteredGyms);
  });*/

//delete

router.delete("/:id", async (req, res) => {
	try {
	  const gym = await Gym.findById(req.params.id);
	  if (!gym)
		return res.status(404).send({ message: "Gym not found" });
  
	  await gym.remove();
  
	  res.status(200).send({ message: "Gym deleted successfully" });
	} catch (error) {
	  console.log(error);
	  res.status(500).send({ message: "Internal Server Error" });
	}
  }); 




  
// update
router.put("/update/:id", upload.array('photo', 5),async (req,res)=>{
	
	try{
		const { error } = validate(req.body);
	
		if (error)
			return res.status(400).send({ message: error.details[0].message });
			
		const updatedFields = {
			name: req.body.name,
			description: req.body.description,
			services: req.body.services,
			photo: req.files.map(file =>file.filename),
			localisation: req.body.localisation,
		};	
		await Gym.findByIdAndUpdate(req.params.id,updatedFields,{new:true});
		res.status(201).send("updated successfully");

	}catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});



// Route to update gym rating
// router.put('/rating/:id', async (req, res) => {
// 	try {
//         const {rating}=req.body;
// 		await Gym.findByIdAndUpdate(req.params.id,{rating},{new:true});
// 	  // Return the updated gym object
// 	    res.status(201).send("rated successfully");

// 	} catch (err) {
// 	  console.error(err.message);
// 	  res.status(500).send('Server Error');
// 	}
// });

router.put('/rating/:id', async (req, res) => {
	try {
	  const { rating } = req.body;
  
	  const updatedGym = await Gym.findByIdAndUpdate(req.params.id,{$push:{ ratings:req.body.rating },}, { new: true });
  
	  // Calculate the average rating
	  const ratings = updatedGym.ratings;
	  const avgRating = Math.round((ratings.reduce((acc, cur) => acc + cur, 0) + rating) / (ratings.length + 1));
  
	  // Update the average rating of the gym
	  updatedGym.rating = avgRating;
	  await updatedGym.save();
  
	  res.send("rated successfully");
	} catch (err) {
	  console.error(err);
	  res.status(500).json({ message: 'Server Error' });
	}
  });





//add an offer and associate it to a gym
router.post('/:gymId/offers', async (req, res) => {
	const { name, type, price } = req.body;
	const gymId = req.params.gymId;
  
	try {
	  // Validate offer details
	  if (!name || !type || !price) {
		return res.status(400).json({ error: 'Please provide name, type, and price for the offer' });
	  }
	  const createdAt=new Date();
	  const updatedAt = new Date();
  
	  // Create new offer object
	  const offer = new Offer({
		name:name,
		type:type,
		price:price,
		createdAt:createdAt,
		updatedAt:updatedAt,

	  });
  
	  // Associate the offer with the gym
	  const updatedGym = await Gym.findByIdAndUpdate(gymId, { $push: { offers: offer } }, { new: true });
  
	  if (!updatedGym) {
		return res.status(404).json({ error: 'Gym not found' });
	  }
  
	  offer.save();
	  res.json({ offer });
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ error: 'Internal Server Error' });
	}
});




// GET gym offer by ID
router.get('/:gymId/offer/:offerId', async (req, res) => {
	try {
	  const { gymId, offerId } = req.params;
	  const gym = await Gym.findById(gymId);
	  if (!gym) {
		return res.status(404).json({ error: 'Gym not found' });
	  }
	  const offer = gym.offers.find(offer => offer._id.toString() === offerId);
	  if (!offer) {
		return res.status(404).json({ error: 'Offer not found' });
	  }
	  res.json(offer);
	} catch (error) {
	  console.error(error);
	  res.status(500).send('Server error');
	}
  });

  //get offer by its id
  router.get('/offers/:id', async (req, res) => {
	try {
	  const offer = await Offer.findById(req.params.id);
	  if (!offer) {
		return res.status(404).json({ message: 'Offer not found' });
	  }
	  res.json(offer);
	} catch (err) {
	  console.error(err);
	  res.status(500).send('Server Error');
	}
  });
  



module.exports = router;