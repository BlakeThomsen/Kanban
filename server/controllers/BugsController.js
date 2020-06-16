import express from "express";
import BaseController from "../utils/BaseController";
import auth0provider from "@bcwdev/auth0provider";
import { bugsService } from "../services/BugsService";
import { commentsService } from "../services/CommentsService";


//PUBLIC
export class BugsController extends BaseController {
  constructor() {
    super("api/bugs");
    this.router
      .get("", this.getAll)
      .get("/:id", this.getById)
      .get('/:id/comments', this.getCommentsByBugId)
      .use(auth0provider.getAuthorizedUserInfo)
      .post("", this.create)
      .put("/:id", this.edit)
      .delete("/:id", this.delete);
  }

  async getAll(req, res, next) {
    try {
      let data = await bugsService.getAll(req.query)
      return res.send(data)
    }
    catch (err) { next(err) }
  }

  async getById(req, res, next) {
    try {
      let data = await bugsService.getById(req.params.id);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async getCommentsByBugId(req, res, next) {
    try {
      let data = await commentsService.find({ bugId: req.params.id })
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email
      let data = await bugsService.create(req.body)
      return res.status(201).send(data)
    } catch (error) { next(error) }
  }

  async edit(req, res, next) {
    try {
      let data = await bugsService.edit(
        req.params.id,
        req.userInfo.email,
        req.body
      );
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await bugsService.close(req.params.id, req.userInfo.email);
      return res.send("Successfully deleted");
    } catch (error) {
      next(error);
    }
  }
}
