const RoomPage = ({ setRoom, setIsAuth }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const room = e.target[0].value;
    setRoom(room.toLowerCase());
  };

  return (
    <form onSubmit={handleSubmit} className="room-page">
      <h1>Chat Odası</h1>
      <p>Hangi Odaya Gireceksiniz:</p>
      <input
        className="input"
        type="text"
        placeholder="örn:haftaiçi"
        required
      />
      <button onClick={() => setRoom()} type="submit">
        Odaya Gir
      </button>
      <button
        onClick={() => {
          //yetki stat'ini false cekerek oda logine yonlendir
          setIsAuth(false);
          // localdeki kaydi kaldir
          localStorage.removeItem("token");
        }}
        type="button"
      >
        Cikis Yap
      </button>
    </form>
  );
};

export default RoomPage;
