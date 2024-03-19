import { useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import Message from "../components/Message";

const ChatPage = ({ room, setRoom }) => {
  const [messages, setMessages] = useState([]);

  //mesaj gonderme fonksiyonu
  const sendMessage = async (e) => {
    e.preventDefault();

    try {
      //kolleksiyonun referansini al
      const messagesCol = collection(db, "messages");

      //koleksiyona yeni dokuman ekle
      await addDoc(messagesCol, {
        text: e.target[0].value,
        room,
        author: {
          id: auth.currentUser.uid,
          name: auth.currentUser.displayName,
          photo: auth.currentUser.photoURL,
        },
        createdAt: serverTimestamp(),
      });

      // formu sıfırla
      e.target.reset();
    } catch (error) {
      console.error("Hata oluştu:", error);
    }
  };

  //mevcut odada gonderilen mesajları anlık olarak al
  useEffect(() => {
    // kolleksiyonun referansini al
    const messagesCol = collection(db, "messages");

    //sorgu ayarlarini olustur
    const q = query(
      messagesCol,
      where("room", "==", room),
      orderBy("createdAt", "asc")
    );

    //mesajlar koleksiyonundaki verileri al
    //anlik olarak bir koleksiyondaki degisimleri izler
    //koleksiyon her degistiginde verdigimiz fonksiyon ile
    //koleksiyondaki butun dokumanlara erisiriz
    onSnapshot(q, (snapshot) => {
      //verilerin gecici olarak tutulacagi bos dizi olustur
      const tempMsg = [];

      //dokumanlara don verılere erıs
      snapshot.docs.forEach((doc) => {
        tempMsg.push(doc.data());

        //mesajlaei state aktar
        setMessages(tempMsg);
      });
    });
  }, []);

  return (
    <div className="chat-page">
      <header>
        <p>{auth.currentUser?.displayName}</p>
        <p>{room}</p>
        <button onClick={() => setRoom(null)}>Farklı Oda</button>{" "}
        {/* Farklı Oda düzeltildi */}
      </header>
      <main>
        {messages.map((data, i) => (
          <Message data={data} key={i} />
        ))}
      </main>
      <form onSubmit={sendMessage}>
        <input type="text" placeholder="mesajinizi yaziniz" />
        <button type="submit">Gonder</button> {/* onClick() kaldırıldı */}
      </form>
    </div>
  );
};

export default ChatPage;
