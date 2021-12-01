const imageUpload = require("../../middleware/imageUpload");
const { ensureAuthenticated } = require("../../middleware/auth");
const { ensureValidObjectId } = require("../../middleware/validation");

const {
  signup,
  login,
  logout,
  refresh,
  profile,
  updateProfilePic,
  removeProfilePic,
  search,
  acceptInvitation,
  removeInvitation,
} = require("../../controllers/users");

const userRoutes = (router) => {
  router.post("/signup", signup);
  router.post("/login", login);
  router.post("/refresh", refresh);
  router.post("/logout", ensureAuthenticated, logout);
  router.get("/profile", ensureAuthenticated, profile);
  router.patch("/profile", ensureAuthenticated, imageUpload, updateProfilePic);
  router.delete("/profile", ensureAuthenticated, removeProfilePic);
  router.get("/search/:username", ensureAuthenticated, search);

  router.post(
    "/invitations/:invitationId",
    ensureAuthenticated,
    ensureValidObjectId("invitation"),
    acceptInvitation
  );

  router.delete(
    "/invitations/:invitationId",
    ensureAuthenticated,
    ensureValidObjectId("invitation"),
    removeInvitation
  );
};

module.exports = userRoutes;
