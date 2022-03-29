const { CartsDao } = require('../models/daos/index');

const MyCartsDao = new CartsDao();

const getAllCarts = async (req, res, next) => {
  try {
    const carts = await MyCartsDao.getAll();
    res.json({ success: true, carts });
  }
  catch(error) {
    next(error);
  }
};

const getCartById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const cart = await MyCartsDao.getById(id);
    res.json({ success: true, cart });
  }
  catch(error) {
    next(error);
  }
};

const createCart = async (req, res, next) => {
  try {
    const newCart = await MyCartsDao.save(req.body);
    res.json({ success: true, result: newCart });
  }
  catch(error) {
    next(error);
  }
};

const updateCartById = async (req, res, next) => {
  const { params: { id }, body } = req;
  try {
    const updatedCart = await MyCartsDao.updateById(id, body);
    res.json({ success: true, result: updatedCart });
  }
  catch(error) {
    next(error);
  }
};

const deleteCartById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedCart = await MyCartsDao.deleteById(id);
    res.json({ success: true, result: deletedCart });
  }
  catch(error) {
    next(error);
  }
};

module.exports = {
  getAllCarts,
  getCartById,
  createCart,
  updateCartById,
  deleteCartById,
}