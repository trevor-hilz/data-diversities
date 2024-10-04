const databaseController = {
  request: (req, res, next) => {
  console.log('---> ENTERING REQUEST CONTROLLER <---');
  res.locals.request = console.log('hello world');
  return res.locals.request;
}
}

export default databaseController;