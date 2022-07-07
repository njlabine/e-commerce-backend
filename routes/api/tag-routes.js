const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
   try {
  const dataTag = await Tag.findAll({
      include: [{model: Product}]
    })
      res.status(200).json(dataTag);
  } catch ({ message }) {
    res.status(500).json({ message })
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const dataTag = await Tag.findByPk(req.params.id, {
      include: [{model: Product}]
    })
    if (!dataTag) {
      res.status(404).json({ message: 'Cannot find tags with this id!' })
    }
    res.status(200).json(dataTag);
  } catch ({ message }) {
    res.status(500).json({ message })
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const dataTag = await Tag.create(req.body)
    res.status(200).json(dataTag);
  } catch ({ message }) {
    res.status(500).json({ message })
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const dataTag = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    })
        if (!dataTag) {
      res.status(404).json({ message: 'Cannot find tags with this id!' })
    }
    res.status(200).json(tagData);
  } catch ({ message }) {
    res.status(500).json({ message })
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const dataTag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    })
    if (!dataTag) {
      res.status(404).json({ message: 'Cannot find tags with this id!' })
    }
    res.json(tagData)
  } catch ({ message }) {
    res.status(500).json({ message })
  }
});

module.exports = router;
