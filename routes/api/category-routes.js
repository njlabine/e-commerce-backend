const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product}]
    })
    res.status(200).json(categoryData);
  } catch ({ message }) {
    res.status(500).json({ message })
  }
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product}]
    })
     if (!categoryData) {
      res.status(404).json({ message: 'Cannot find category with this id found!' })
    }

    res.status(200).json(categoryData);
  } catch ({ message }) {
    res.status(500).json({ message })
  }
});

router.post('/', (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body)
    res.status(200).json(categoryData);
  } catch ({ message }) {
    res.status(500).json({ message })
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update(req.body,
      {
        where: {
          id: req.params.id
        }
      })
      if (!categoryData) {
      res.status(404).json({ message: 'Cannot find category with this id found!' })
    }

    res.status(200).json(categoryData);
  } catch ({ message }) {
    res.status(500).json({ message: "Category has Updated!" })
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
   try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    })
    if (!categoryDelete) {
      res.status(404).json({ message: "Cannot find product with this id!"})
    }
    res.status(200).json({ message: "Item has been Deleted"})
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
