function Status({ children }) {
  const loggedIn = true;
  return children(loggedIn);
}

export default Status;
