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
var db_1 = __importDefault(require("../models/db"));
var uuid_1 = require("uuid");
var createJob = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, jobName, languageFromName, languageToName, jobDescription, type, _id, jobType, languageFrom, languageTo, newJob, job, jobId, imageUrl, newImage, img, newChat, chat, newVideoChat, videoChat, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, jobName = _a.jobName, languageFromName = _a.languageFromName, languageToName = _a.languageToName, jobDescription = _a.jobDescription;
                type = req.params.type;
                _id = req.user._id;
                jobType = type;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 11, , 12]);
                return [4 /*yield*/, db_1.default.Language.findOne({
                        where: { languageName: languageFromName },
                    })];
            case 2:
                languageFrom = _b.sent();
                return [4 /*yield*/, db_1.default.Language.findOne({
                        where: { languageName: languageToName },
                    })];
            case 3:
                languageTo = _b.sent();
                newJob = new db_1.default.Job({
                    jobName: jobName,
                    jobType: jobType,
                    _id: uuid_1.v4(),
                    languageFrom: languageFrom._id,
                    languageFromName: languageFromName,
                    languageTo: languageTo._id,
                    languageToName: languageToName,
                    CustomerId: _id,
                    jobDescription: jobDescription,
                });
                return [4 /*yield*/, newJob.save()];
            case 4:
                job = _b.sent();
                jobId = job._id;
                if (!(type === 'image')) return [3 /*break*/, 6];
                imageUrl = req.body.imageUrl;
                newImage = new db_1.default.Image({
                    _id: uuid_1.v4(),
                    imageUrl: imageUrl,
                    JobId: jobId,
                });
                return [4 /*yield*/, newImage.save()];
            case 5:
                img = _b.sent();
                res.status(201).send(img);
                _b.label = 6;
            case 6:
                if (!(type === 'chat')) return [3 /*break*/, 8];
                newChat = new db_1.default.Conversation({
                    _id: uuid_1.v4(),
                    JobId: jobId,
                });
                return [4 /*yield*/, newChat.save()];
            case 7:
                chat = _b.sent();
                res.status(201).send(chat);
                _b.label = 8;
            case 8:
                if (!(type === 'video')) return [3 /*break*/, 10];
                newVideoChat = new db_1.default.VideoChat({
                    _id: uuid_1.v4(),
                    JobId: jobId,
                });
                return [4 /*yield*/, newVideoChat.save()];
            case 9:
                videoChat = _b.sent();
                res.status(201).send(videoChat);
                _b.label = 10;
            case 10: return [3 /*break*/, 12];
            case 11:
                error_1 = _b.sent();
                res.status(400).send({ error: '400', message: 'Not able to create a job' });
                return [3 /*break*/, 12];
            case 12: return [2 /*return*/];
        }
    });
}); };
var acceptJob = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _id, job, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _id = req.body._id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, db_1.default.Job.findOne({ where: { _id: _id } })];
            case 2:
                job = _a.sent();
                job.status = 'accepted';
                job.notification = true;
                job.TranslatorId = req.user._id;
                return [4 /*yield*/, job.save()];
            case 3:
                _a.sent();
                res.status(200).send(job);
                return [3 /*break*/, 5];
            case 4:
                error_2 = _a.sent();
                res.status(400).send({ error: '400', message: 'Not able to accept a job' });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var setNotificationToFalse = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _id, job, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _id = req.body._id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, db_1.default.Job.findOne({ where: { _id: _id } })];
            case 2:
                job = _a.sent();
                job.notification = false;
                return [4 /*yield*/, job.save()];
            case 3:
                _a.sent();
                res.status(200).send(job);
                return [3 /*break*/, 5];
            case 4:
                error_3 = _a.sent();
                res.status(400).send({
                    error: '400',
                    message: 'Not able to update notification status',
                });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var getJobs = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, role, _id, status, jobs, filteredJobs, filteredJobs, jobs, filteredJobs, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.user, role = _a.role, _id = _a._id;
                status = req.params.status;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, , 7]);
                if (!(role === 'customer')) return [3 /*break*/, 3];
                return [4 /*yield*/, db_1.default.Job.findAll({ where: { CustomerId: _id } })];
            case 2:
                jobs = _b.sent();
                if (status === 'pendingAndAccepted') {
                    filteredJobs = jobs.filter(function (job) { return job.status === 'pending' || job.status === 'accepted'; });
                    if (filteredJobs.length === 0) {
                        res.status(200).send([]);
                    }
                    else {
                        res.status(200).send(filteredJobs);
                    }
                }
                else {
                    filteredJobs = jobs.filter(function (job) { return job.status === status; });
                    res.status(200).send(filteredJobs);
                }
                return [3 /*break*/, 5];
            case 3:
                if (!(role === 'translator')) return [3 /*break*/, 5];
                return [4 /*yield*/, db_1.default.Job.findAll({ where: { TranslatorId: _id } })];
            case 4:
                jobs = _b.sent();
                filteredJobs = jobs.filter(function (job) { return job.status === status; });
                if (!filteredJobs) {
                    res.status(200).send([]);
                }
                res.status(200).send(filteredJobs);
                _b.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                error_4 = _b.sent();
                res
                    .status(404)
                    .send({ error: '404', message: 'Not able to retrieve the jobs' });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
var getAvailableJobs = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _id, language, langArray, jobsPending, suitedJobs, _i, jobsPending_1, job, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _id = req.user._id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, db_1.default.Translator.findOne({
                        where: { _id: _id },
                        include: [{ model: db_1.default.Language, as: 'language' }],
                    })];
            case 2:
                language = (_a.sent()).language;
                langArray = language.map(function (lang) { return lang._id; });
                return [4 /*yield*/, db_1.default.Job.findAll({
                        where: { status: 'pending' },
                    })];
            case 3:
                jobsPending = _a.sent();
                suitedJobs = [];
                for (_i = 0, jobsPending_1 = jobsPending; _i < jobsPending_1.length; _i++) {
                    job = jobsPending_1[_i];
                    if (langArray.includes(job.languageFrom) &&
                        langArray.includes(job.languageTo)) {
                        suitedJobs.push(job);
                    }
                }
                if (suitedJobs.length <= 0) {
                    res.status(200).send([]);
                }
                else {
                    res.status(200).send(suitedJobs);
                }
                return [3 /*break*/, 5];
            case 4:
                error_5 = _a.sent();
                res.status(400).send({
                    error: '400',
                    message: 'Not able to retrieve the available jobs',
                });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var changeStatus = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, jobId, status, job, error_6;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.params, jobId = _a.jobId, status = _a.status;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, db_1.default.Job.findOne({ where: { _id: jobId } })];
            case 2:
                job = _b.sent();
                job.status = status;
                return [4 /*yield*/, job.save()];
            case 3:
                _b.sent();
                res.status(200).send(job);
                return [3 /*break*/, 5];
            case 4:
                error_6 = _b.sent();
                res.status(400).send({
                    error: '400',
                    message: 'Not able to change the status of the job',
                });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var deleteJob = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, jobToDelete, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                console.log(id);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, db_1.default.Job.findOne({ where: { _id: id } })];
            case 2:
                jobToDelete = _a.sent();
                jobToDelete.destroy();
                res.status(200);
                return [3 /*break*/, 4];
            case 3:
                error_7 = _a.sent();
                res.status(400).send({
                    error: '400',
                    message: 'Not able to delete job',
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
module.exports = {
    createJob: createJob,
    acceptJob: acceptJob,
    getJobs: getJobs,
    getAvailableJobs: getAvailableJobs,
    changeStatus: changeStatus,
    setNotificationToFalse: setNotificationToFalse,
    deleteJob: deleteJob,
};
