// create a reference to the model
let CarModel = require('../models/car');

// Gets all cars from the Database and renders the page to list them all.
module.exports.carList = async function(req, res, next) {  

    try {
        let carsList = await CarModel.find({});

        res.render('cars/list', {
            title: 'Cars List', 
            CarsList: carsList,
            userName: req.user ? req.user.username : ''
        })  
    } catch (error) {
        console.log(error);
        next(error);
    }
}


// Gets a car by id and renders the details page.
module.exports.details = async (req, res, next) => {

    try {
        let id = req.params.id;

        let carToShow = await CarModel.findById(id);

        res.render('cars/details', {
            title: 'Car Details', 
            car: carToShow
        })
    } catch (error) {
        console.log(error);
        next(error);
    }
}

// Renders the Add form using the add_edit.ejs template
module.exports.displayAddPage = (req, res, next) => {
    
    // ADD YOUR CODE HERE 
    let blankCar = CarModel();

    res.render('cars/add_edit',
        {
            title: 'Add a new Car',
            car: blankCar,
            userName: req.user ? req.user.username : ''
        });       

}

// Processes the data submitted from the Add form to create a new car
module.exports.processAddPage = async (req, res, next) => {

    // ADD YOUR CODE HERE
    try {

        let newCar = CarModelModel({
            _id: req.body.id,
            make: req.body.make,
            model: req.body.model,
            year: req.body.year,
            kilometers: req.body.kilometers,
            doors: req.body.doors,
            seats: req.body.seats,
            color: req.body.color,
            price: req.body.price,
            tags: req.body.tags.split(",").map(word => word.trim())
        });

        let result = await CarModel.create(newCar)

        // refresh the car list
        console.log(result);
        res.redirect('/cars/list');

    } catch (error) {
        console.log(error);
        next(error);
    }
}

// Gets a car by id and renders the Edit form using the add_edit.ejs template
module.exports.displayEditPage = async (req, res, next) => {
    
    // ADD YOUR CODE HERE
    try {
        let id = req.params.id;

        let carToEdit = await CarModel.findById(id);

        res.render('cars/add_edit',
            {
                title: 'Edit a new Car',
                car: carToEdit,
                userName: req.user ? req.user.username : ''
            });
    } catch (error) {
        console.log(error);
        next(error);
    }

}

// Processes the data submitted from the Edit form to update a car
module.exports.processEditPage = async (req, res, next) => {
    
    // ADD YOUR CODE HERE
    try {

        let id = req.params.id

        // Builds updatedCar from the values of the body of the request.
        let updatedCar = CarModelModel({
            _id: req.body.id,
            make: req.body.make,
            model: req.body.model,
            year: req.body.year,
            kilometers: req.body.kilometers,
            doors: req.body.doors,
            seats: req.body.seats,
            color: req.body.color,
            price: req.body.price,
            tags: req.body.tags.split(",").map(word => word.trim())
        });

        // Submits updatedCar to the DB and waits for a result.
        let result = await CarModelModel.updateOne({ _id: id }, updatedCar);
        console.log(result);

        // If the car is updated redirects to the list
        if (result.modifiedCount > 0) {
            res.redirect('/cars/list');
        }
        else {
            // Express will catch this on its own.
            throw new Error('Car not udated. Are you sure it exists?') 
        }

    } catch (error) {
        next(error)
    }
}

// Deletes a car based on its id.
module.exports.performDelete = async (req, res, next) => {
    
    // ADD YOUR CODE HERE
    try {

        let id = req.params.id;

        let result = await CarModel.deleteOne({ _id: id });

        console.log("====> Result: ", result);
        if (result.deletedCount > 0) {
            // refresh the car list
            res.redirect('/cars/list');
        }
        else {
            // Express will catch this on its own.
            throw new Error('Car not deleted. Are you sure it exists?') 
        }

    } catch (error) {
        console.log(error);
        next(error);
    }

}