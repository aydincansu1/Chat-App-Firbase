import React, { useState } from "react";
import AuthPage from "./pages/AuthPage";
import RoomPage from "./pages/RoomPage";
import ChatPage from "./pages/ChatPage";

const App = () => {
  //kullanicinin sectigi oda
  const [room, setRoom] = useState();

  //kullanicinin yetkisi var mi
  const [isAuth, setIsAuth] = useState(localStorage.getItem("token"));

  // Kullanıcı kimlik doğrulamasını geçtiğinde, chat sayfasına yönlendir
  if (!isAuth) {
    return <AuthPage setIsAuth={setIsAuth} />;
  } else {
    return (
      <div className="container">
        {!room ? (
          //oda secilmediyse oda secme sayfasina
          <RoomPage setRoom={setRoom} setIsAuth={setIsAuth} />
        ) : (
          // oda secildyse sohbet sayfasina yonlendir
          <ChatPage room={room} setRoom={setRoom} />
        )}
      </div>
    );
  }
};

export default App;
