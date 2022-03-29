const { Schema } = require('mongoose');
const MongoContainer = require('../../containers/MongoContainer');

const collection = 'products';

const productsSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  code: { type: String, unique: true, required: true },
  img: { type: String },
  price: { type: Number, min: 0, required: true },
  stock: { type: Number, min: 0, required: true },
  timestamp: { type: Date, min: Date.now() }
});

class MongoProductsDao extends MongoContainer {
  constructor() {
    super(collection, productsSchema);
  }
}

module.exports = MongoProductsDao;
