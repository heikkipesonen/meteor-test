Products = new Mongo.Collection('products');

Products.CATEGORIES = ['meat', 'fish', 'chicken', 'vegetable', 'eggs', 'seasoning'];
Products.UNITS = ['kg', 'l', 'pcs', 'g'];

Products.attachSchema({
  location_id: {
    type: String
  },
  name: {
    type: String
  },
  description: {
    type: String
  },
  company: {
    type: String
  },
  category: {
    type: String,
    allowedValues: Products.CATEGORIES
  },
  price: {
    type: Number,
    decimal: true
  },
  unit: {
    type: String,
    allowedValues: Products.UNITS
  },
  available: {
    type: Number
  },
  min_purchase: {
    type: Number
  },
  package_size: {
    type: Number
  }
});
