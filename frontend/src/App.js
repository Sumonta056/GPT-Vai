import "./App.css";
import axios from "axios";
import { useState } from "react";
import avatar from "./logo.png";
import avatar1 from "./bot.png";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  MessageInput,
  Message,
  Loader,
  Avatar,
} from "@chatscope/chat-ui-kit-react";

function App() {
  const [formData2, setFormData2] = useState([]);
  const [load, setload] = useState(false);

  const handleSubmit = async (messageText) => {
    const newMessage = {
      content: messageText,
      // Add other properties such as sender, timestamp, etc. if needed.
    };
    setload(true);
    axios
      .post("http://localhost:8082/chat", newMessage)
      .then((res) => {
        // Assuming that the server responds with the updated chat messages in res.data
        setFormData2(res.data);
        setload(false);
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  };

  return (
    //

    <div className="App">
      <div className="App-header">
        <Avatar src={avatar1} />
        <h1>GPT ভাই</h1>
      </div>
      <div
        style={{
          position: "relative",
          height: "600px",
          width: "700px",
        }}
      >
        <MainContainer>
          <ChatContainer>
            <MessageList
              scrollBehavior="smooth"
              style={{ padding: "40px", textAlign: "justify" }}
            >
              <Message
                model={{
                  message: formData2,
                }}
              >
                <Avatar src={avatar} name="AI Assistant" status="available" />
              </Message>
              <div
                style={{
                  position: "relative",
                  height: "100%", // 100% of the viewport height
                  display: "flex",
                  justifyContent: "center", // Center horizontally
                  alignItems: "center", // Center vertically
                }}
              >
                {load && <Loader variant="default">Loading</Loader>}
              </div>
            </MessageList>

            <MessageInput
              style={{ padding: "20px" }}
              placeholder="Type message here"
              onSend={handleSubmit}
            />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
}

export default App;
