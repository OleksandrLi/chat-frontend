const ROUTES = {
  home: "/home",
  profile: "/profile",
  login: "/login",
  signup: "/signup",
  dynamic: {
    users: (id = ":id") => `/users/${id}`,
    chats: (chatId = ":chatId") => `/chats/${chatId}`,
  },
};

export default ROUTES;
