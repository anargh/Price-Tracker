const { emailValidator } = require("../helpers/regex");

module.exports = {
  $jsonSchema: {
    bsonType: "object",
    required: ["name", "email", "password"],
    properties: {
      name: {
        bsonType: "string",
        description: "Must be a string",
        minLength: 5
      },
      email: {
        bsonType: "string",
        description: "Must be a string"
      },
      password: {
        bsonType: "string",
        description: "Must be a string"
      },
      tokens: {
        bsonType: "array"
      }
    }
  }
};