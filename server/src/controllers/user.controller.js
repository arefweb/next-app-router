let counter = 0;

const getUsers = (req, res) => {
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

const getUser = (req, res) => {
  const {id} = req.params;
  res.status(200).json({
    id,
    first_name: "John",
    last_name: "Doe",
  })
}

module.exports = {
  getUsers,
  getUser,
};