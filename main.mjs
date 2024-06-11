import ddTrace from "dd-trace";

ddTrace.init();

function getUser(userId) {
  const span = ddTrace.startSpan("db.get_user")
  span.setTag("user_id", userId);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name: "John Doe" });
      span.finish(); 
    }, 100);
  });
}

getUser(123)
  .then((user) => console.log(`User: ${user.name}`))
  .catch((error) => console.error(error));