import http from "../connection/Connection";

const route = "messages";

const getMessagesOfProblem = (id) => {
  return http.get(`${route}/${id}`);
};

const MessageService = { getMessagesOfProblem };

export default MessageService;
