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
  if(false /*!req.body.name || !req.body.address || !req.body.age*/) {
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

