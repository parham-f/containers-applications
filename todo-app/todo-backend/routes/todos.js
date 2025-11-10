const express = require('express');
const { Todo } = require('../mongo');
const { getAsync, setAsync, incrAsync } = require('../redis');
const router = express.Router();

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

router.get('/statistics', async (_req, res) => {
  try {
    const raw = await getAsync('added_todos');
    const added_todos = parseInt(raw, 10) || 0;
    if (raw === null) await setAsync('added_todos', '0');
    res.json({ added_todos });
  } catch (err) {
    console.error('Failed to read stats:', err);
    res.json({ added_todos: 0 });
  }
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  await incrAsync('added_todos');
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.send(req.todo);
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const updateData = req.body
  try {
    const updatedItem = await Todo.findByIdAndUpdate(req.todo.id, updateData);

    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: 'Error updating item', error: error.message });
  }
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
