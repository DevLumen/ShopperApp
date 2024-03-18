export default function Splash() {
  return (
    <div>
      <form action="" method="post">
        <label for="username">Username:</label>  
        <input id="username" type="text" name="username" placeholder="Username" required/>
        <label for="password">Password:</label> 
        <input id="password" type="password" name="password" placeholder="Password" required/>
        <button type="submit" value="login">Submit</button>
      </form>
    </div>
  );
}