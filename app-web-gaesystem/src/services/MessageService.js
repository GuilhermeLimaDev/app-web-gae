import http from "../connection/Connection";

const route = "messages";

const getMessagesOfProblem = (id) => {
  return http.get(`${route}/problem/${id}`);
};

const createMessage = (data) => {
  return http.post(`${route}`, data);
};

const MessageService = { getMessagesOfProblem, createMessage };

export default MessageService;
