import { auth } from "../firebase/config";

const Message = ({ data }) => {
  // oturumu acik olan kullanicinin id'si
  // mesaji atan kullanicinin id'sine esitse
  // sadece mesaj icerigini bas
  if (auth.currentUser.uid === data.author.id) {
    return <p className="msg-user">{data.text}</p>;
  }

  // esit degilse
  // kullanici bilgisi + mesaj icerigini bas
  return (
    <div className="msg-other">
      <img src={data.author.photo} />
      <div className="user-info">
        <span>{data.author.name}</span>
      </div>

      <p className="msg-text">{data.text}</p>
    </div>
  );
};

export default Message;
