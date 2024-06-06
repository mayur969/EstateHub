import { Server } from "socket.io";

const io = new Server({
    cors: {
        origin: "http://localhost:5173",
        credentials: true
    }
})

let onlineUser = [];

const addUser = (userId, socketId) => {
    const userExists =onlineUser.find((user) => user.userId === userId);
    if(!userExists){
        onlineUser.push({userId, socketId});
    }
}

const removeUser = (socketId)=> {
    onlineUser.filter((user)=> user.socketId !== socketId);
};

const getUser = (userId)=> {
    return onlineUser.find((user) => user.userId === userId)
}

io.on("connection", (socket)=>{

    socket.on("newUser", (userId)=> {
        addUser(userId, socket.id)
    });

    socket.on("sendMessage", ({receiverId, data})=> {
        const receiver = getUser(receiverId);
        console.log(receiverId, data)
        // io.to(receiver.socketId).emit("getMessage", data);

    })

    socket.on("disconnect", ()=> {
        removeUser(socket.id);
    })
})

io.listen("4000");