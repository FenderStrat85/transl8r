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
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var db_1 = __importDefault(require("../models/db"));
var SECRET_KEY = process.env.SECRET_KEY;
var uuid_1 = require("uuid");
var register = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, firstName, lastName, role, languages, user, _b, hash, newCustomer, _id, accessToken, newTranslator, translator, _i, languages_1, lang, languageSpoken, _id, accessToken, error_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password, firstName = _a.firstName, lastName = _a.lastName, role = _a.role, languages = _a.languages;
                if (!(role === 'customer')) return [3 /*break*/, 2];
                return [4 /*yield*/, db_1.default.Customer.findOne({ where: { email: email } })];
            case 1:
                _b = _c.sent();
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, db_1.default.Translator.findOne({ where: { email: email } })];
            case 3:
                _b = _c.sent();
                _c.label = 4;
            case 4:
                user = _b;
                if (user)
                    return [2 /*return*/, res
                            .status(409)
                            .send({ error: '409', message: 'Could not create user' })];
                _c.label = 5;
            case 5:
                _c.trys.push([5, 15, , 16]);
                if (password === '')
                    throw new Error();
                return [4 /*yield*/, bcrypt.hash(password, 10)];
            case 6:
                hash = _c.sent();
                if (!(role === 'customer')) return [3 /*break*/, 8];
                newCustomer = new db_1.default.Customer({
                    _id: uuid_1.v4(),
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: hash,
                    role: role,
                });
                return [4 /*yield*/, newCustomer.save()];
            case 7:
                _id = (_c.sent())._id;
                accessToken = jwt.sign({ _id: _id }, SECRET_KEY);
                res.status(201).send({ accessToken: accessToken, role: role, _id: _id, firstName: firstName, lastName: lastName });
                return [3 /*break*/, 14];
            case 8:
                if (!languages) return [3 /*break*/, 14];
                newTranslator = new db_1.default.Translator({
                    _id: uuid_1.v4(),
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: hash,
                    role: role,
                });
                return [4 /*yield*/, newTranslator.save()];
            case 9:
                translator = _c.sent();
                _i = 0, languages_1 = languages;
                _c.label = 10;
            case 10:
                if (!(_i < languages_1.length)) return [3 /*break*/, 13];
                lang = languages_1[_i];
                return [4 /*yield*/, db_1.default.Language.findOne({
                        where: { languageName: lang },
                    })];
            case 11:
                languageSpoken = _c.sent();
                translator.addLanguage(languageSpoken._id);
                translator.save();
                _c.label = 12;
            case 12:
                _i++;
                return [3 /*break*/, 10];
            case 13:
                _id = translator._id;
                accessToken = jwt.sign({ _id: _id }, SECRET_KEY);
                res.status(201).send({ accessToken: accessToken, role: role, _id: _id, firstName: firstName, lastName: lastName });
                _c.label = 14;
            case 14: return [3 /*break*/, 16];
            case 15:
                error_1 = _c.sent();
                res.status(400).send({ error: error_1, message: 'Could not create user' });
                return [3 /*break*/, 16];
            case 16: return [2 /*return*/];
        }
    });
}); };
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, _b, validatedPass, accessToken, _id, role, firstName, lastName, error_2;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 6, , 7]);
                return [4 /*yield*/, db_1.default.Customer.findOne({ where: { email: email } })];
            case 2:
                _b = (_c.sent());
                if (_b) return [3 /*break*/, 4];
                return [4 /*yield*/, db_1.default.Translator.findOne({ where: { email: email } })];
            case 3:
                _b = (_c.sent());
                _c.label = 4;
            case 4:
                user = _b;
                return [4 /*yield*/, bcrypt.compare(password, user.password)];
            case 5:
                validatedPass = _c.sent();
                if (!validatedPass)
                    throw new Error();
                accessToken = jwt.sign({ _id: user._id }, SECRET_KEY);
                _id = user._id, role = user.role, firstName = user.firstName, lastName = user.lastName;
                res.status(200).send({ accessToken: accessToken, _id: _id, role: role, firstName: firstName, lastName: lastName });
                return [3 /*break*/, 7];
            case 6:
                error_2 = _c.sent();
                res
                    .status(401)
                    .send({ error: '401', message: 'Username or password not valid' });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
var isTokenValid = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var accessToken, userInfo, id, user, _a, _id, role, firstName, lastName, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                accessToken = req.body.accessToken;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                userInfo = jwt.verify(accessToken, SECRET_KEY);
                id = userInfo._id;
                return [4 /*yield*/, db_1.default.Customer.findOne({ where: { _id: id } })];
            case 2:
                _a = (_b.sent());
                if (_a) return [3 /*break*/, 4];
                return [4 /*yield*/, db_1.default.Translator.findOne({ where: { _id: id } })];
            case 3:
                _a = (_b.sent());
                _b.label = 4;
            case 4:
                user = _a;
                if (!user) {
                    return [2 /*return*/, res
                            .status(402)
                            .send({ error: '402', message: 'access token not valid' })];
                }
                _id = user._id, role = user.role, firstName = user.firstName, lastName = user.lastName;
                res.status(200).send({ accessToken: accessToken, _id: _id, role: role, firstName: firstName, lastName: lastName });
                return [3 /*break*/, 6];
            case 5:
                error_3 = _b.sent();
                res.status(402).send({ error: '402', message: 'access token not valid' });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
module.exports = { register: register, login: login, isTokenValid: isTokenValid };
