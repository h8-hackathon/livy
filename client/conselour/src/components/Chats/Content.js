import ChatItem from "./ChatItem";

export default function Content() {
  return (
    <div className="flex-1 p-10 space-y-3 overflow-auto">
      <ChatItem isMe={true} message="apa kabar mas" />
      <ChatItem isMe={true} message="baik baik" />
      <ChatItem isMe={true} message="Moga moga allaha ajsdhj" />
      <ChatItem isMe={false} message="allhadmulillah mas sulkhan teh harus banak olahraga " />
      <ChatItem isMe={false} message="Phase 1 - Paradigm (OOP), Design Pattern (MVC), Web Server (Framework -- Express), Database (Postresql --SQL) +ORM (Sequelize) +JSON  [5:08 PM] Phase 0 - Web Page (HTML, CSS, JS)  [5:12 PM] Phase 2 - Framework / Library, Front end framework Vue, Design Pattern (TDD), JWT, oAuth Phase 3 - ReactJS, Unit Testing (Jest), NoSQL (MongoDB), Rest API, GraphQL, Microservice (Docker), AWS The Rest - Career" />
      <ChatItem isMe={true} message="askdajshdjha" />
      <ChatItem isMe={false} message="akjshdjhs" />
      <ChatItem isMe={false} message="akjshdjhs" />
      <ChatItem isMe={false} message="akjshdjhs" />
      <ChatItem isMe={false} message="akjshdjhs" />
      <ChatItem isMe={false} message="akjshdjhs" />
      <ChatItem isMe={false} message="akjshdjhs" />
      <ChatItem isMe={false} message="akjshdjhs" />
      <ChatItem isMe={false} message="akjshdjhs" />
      <ChatItem isMe={false} message="akjshdjhs" />
    </div>
  )
}
