import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const sendMessage = async (message) => {
  const res = await axios.post("http://localhost:3001/messages", {
    ...message,
    createdAt: new Date().toISOString(),
  });
  return res.data;
};

const useSendMessage = () => useMutation({ mutationFn: sendMessage });

export default useSendMessage;