"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("./models/db");
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var http_1 = __importDefault(require("http"));
var _a = require('socket.io'), Server = _a.Server, Socket = _a.Socket;
require('dotenv').config();
var PORT = process.env.SERVER_PORT;
var CLIENT_PORT = process.env.CLIENT_PORT;
var router = require('./router');
var app = express_1.default();
var corsConfig = {
    origin: "http://localhost:" + CLIENT_PORT,
    credentials: true,
};
app.use(cors_1.default(corsConfig)).use(express_1.default.json()).use(router);
var server = http_1.default.createServer(app);
var io = new Server(server, {
    cors: {
        origin: "http://localhost:" + CLIENT_PORT,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    },
});
io.on('connection', function (socket) {
    // console.log('User Connected', socket.id);
    socket.on('join_room', function (data) {
        // room = data.room;
        // name = data.name;
        socket.join(data.room);
        io.in(data.room).emit('welcome_message', data);
        // console.log(`User with name: ${data.name} joined room: ${data.room}`);
    });
    socket.on('send_message', function (data) {
        console.log(data.message);
        socket.to(data.room).emit('receive_message', data);
    });
    socket.on('leave_chat', function (data) {
        socket.to(data.room).emit('leave_message', data);
    });
    socket.on('disconnect', function () { });
    //----------------------------------------------------------
    //Video Socket Info
    socket.emit('me', socket.id);
    socket.on('disconnect', function () {
        socket.broadcast.emit('callEnded');
    });
    // Takes an action from the frontend = in this case 'callUser'
    // Callback takes a data argument, which we will destructure
    // userToCall - id of user we'll be calling
    // signalData - massive chunk of data
    // From - ID of the person starting the call
    // Name - name of the person starting the call, entered into text field
    socket.on('callUser', function (_a) {
        var userToCall = _a.userToCall, signalData = _a.signalData, from = _a.from, name = _a.name;
        io.to(userToCall).emit('callUser', { signal: signalData, from: from, name: name });
    });
    //Data contains the ID of the person making the call as well as a huge data chunk
    socket.on('answerCall', function (data) {
        io.to(data.to).emit('callAccepted', data.signal);
    });
    //---------------------------------------------------------
});
try {
    (function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            server.listen(PORT, function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            console.log("Server \uD83C\uDF39 listening on port " + PORT);
                            //sequelize.sync because db on has access to the models, whereas
                            //sequelize is what is connected to the sync.
                            return [4 /*yield*/, db_1.sequelize.sync()];
                        case 1:
                            //sequelize.sync because db on has access to the models, whereas
                            //sequelize is what is connected to the sync.
                            _a.sent();
                            console.log('Database connection established');
                            return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    }); })();
}
catch (error) {
    console.log("Server failed: " + error);
}
