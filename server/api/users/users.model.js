import uuidv4 from 'uuid/v4';

class User {
  users = [];

  findById(userId) {
      // Find user by Id
      // Returns user, or null if not present
    var currUser = this.users.filter(function(u) {
      if(u.id == userId) {
        return true;
      } else {
        return false;
      }
    });

    if(currUser.length == 1) {
      return currUser[0];
    } else {
      return null;
    }
  }

  findA() {
      // Returns a list of all users
    return this.users;
  }

  create(user) {
      // Create a new user
      // Return created user
      // Generate the id and overwrite any id that may be present in user
    var newId = uuidv4();
    var person = {
      id: newId,
      name: user.name,
      address: user.address,
      age: user.age
    };
    this.users.push(person);
    return person;
  }

  findOneAndUpdate(user) {
      // Find user and update
      // If user does not exist, create it using Id provided
      // Return true if user was updated, false if user was created
    var updateIndex = this.users.map(function(u) {
      return u.id;
    }).indexOf(user.id);

    if(updateIndex === -1) {
        //User not found, create new
      var person = {
        id: user.id,
        name: user.name,
        address: user.address,
        age: user.age
      };
      this.create(person);
      return false;
    } else {
        //Update existing user
      this.users[updateIndex] = {
        id: user.id,
        name: user.name,
        address: user.address,
        age: user.age
      };
      return true;
    }
  }

  remove(user) {
      // Remove user if exists with the Id provided
      // Return true if removed
      // Return false if did user not exist
    var removeIndex = this.users.map(function(u) {
      return u.id;
    }).indexOf(user.id);

    if(removeIndex === -1) {
      return false;
    } else {
      this.users.splice(removeIndex, 1);
      return true;
    }
  }
}

export default new User();
