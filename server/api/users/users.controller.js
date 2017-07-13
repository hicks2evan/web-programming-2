import User from './users.model.js';

export function index(req, res) {
  res.json(User.findA());
}

export function show(req, res) {
  var user = User.findById(req.param.id);
  if(user) {
    res.status(200);
    res.json(user);
  } else {
    res.status(404);
    res.json({message: 'Not Found'});
  }
}

export function create(req, res) {
  if(!req.body.name || !req.body.address || !req.body.age) {
    res.status(400);
    return res.json({message: 'Bad Request'});
  } else {
    var user = {
      name: req.body.name,
      address: req.body.address,
      age: req.body.age
    };
    var newUser = User.create(user);
    if(newUser) {
      res.status(201);
      return res.json(newUser);
    }
  }
}

export function upsert(req, res) {
  if(!req.body.name || !req.body.address || !req.body.age) {
    res.status(400);
    return res.json({message: 'Bad Request'});
  } else {
    var person = {
      id: req.param.id,
      name: req.body.name,
      address: req.body.address,
      age: req.body.age
    };
    if(User.findOneAndUpdate(person)) {
      res.status(201);
    } else {
      res.status(200);
    }
  }
}

export function destroy(req, res) {
  if(User.remove(User.findOne(req.param.id))) {
    res.status(204);
  } else {
    res.status(404);
  }
}

