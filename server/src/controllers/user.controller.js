let counter = 0;

const getUsers = (req, res, next) => {
  if (counter % 2 === 0) {
    res.status(200).json([
      {
        id: 1,
        first_name: "John",
        last_name: "Doe",
      },
      {
        id: 2,
        first_name: "Alex",
        last_name: "Jones",
      },
    ]);
  } else {
    res.sendStatus(401);
  }
  counter += 1;
}

const getUser = (req, res, next) => {
  const id = req.params.id;
  res.status(200).json({
    id: id,
    first_name: "John",
    last_name: "Doe",
  })
}

module.exports = {
  getUsers,
  getUser,
};