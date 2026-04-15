exports.isLoggedIn = (req, res, next) => {
  if (!req.session.userId) {
    return res.redirect("/login");
  }
  next();
};

exports.isOwner = (Model) => {
  return async (req, res, next) => {
    const data = await Model.findById(req.params.id);
    if (!data || data.postedBy.toString() !== req.session.userId) {
      return res.redirect("/items");
    }
    next();
  };
};
