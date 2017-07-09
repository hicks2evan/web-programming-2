import uuidv4 from 'uuid/v4';

let users = [];

export function listContents(req, res) {
  return res.json(users);
}

export function findOne(req, res) {
  var currUser = users.filter(function(user) {
    if(user.id == req.params.id) {
      return true;
    }
  });

  if(currUser.length == 1) {
    res.json(currUser[0]);
  } else {
    res.status(404);//Set status to 404 as user was not found
    res.json({message: 'Not Found'});
  }
}

export function createUser(req, res) {
  if(!req.body.name || !req.body.address || !req.body.age) {
    res.status(400);
    return res.json({message: 'Bad Request'});
  } else {
    var newId = uuidv4();
    var person = {
      id: newId,
      name: req.body.name,
      address: req.body.address,
      age: req.body.age
    };
    users.push(person);
    res.status(201);
    return res.json(person);
  }
}

export function updateUser(req, res) {
  if(!req.body.name || !req.body.address || !req.body.age) {
    res.status(400);
    return res.json({message: 'Bad Request'});
  } else {
    var updateIndex = users.map(function(user) {
      return user.id;
    }).indexOf(req.params.id);

    if(updateIndex === -1) {
         //User not found, create new
      var newId = uuidv4();
      var person = {
        id: newId,
        name: req.body.name,
        address: req.body.address,
        age: req.body.age
      };
      users.push(person);
      res.status(201);
      res.json(person);
    } else {
         //Update existing user
      users[updateIndex] = {
        id: users[updateIndex].id,
        name: req.body.name,
        address: req.body.address,
        age: req.body.age
      };
      res.status(200);
      res.json(users[updateIndex]);
    }
  }
}

export function removeUser(req, res) {
  var removeIndex = users.map(function(user) {
    return user.id;
  }).indexOf(req.params.id); //Gets us the index of user with given id.

  if(removeIndex === -1) {
    res.json({message: 'Not found'});
  } else {
    users.splice(removeIndex, 1);
    res.status(204).send();
  }
}

