const ROUTES = {
  home: "/home",
  profile: "/profile",
  login: "/login",
  signup: "/signup",
  dynamic: {
    users: (id = ":id") => `/users/${id}`,
  },
};

export default ROUTES;
