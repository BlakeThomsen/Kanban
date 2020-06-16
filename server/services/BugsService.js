import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class BugsService {
  async getAll(query = {}) {
    return await dbContext.Bugs.find(query)
  }

  async getById(id) {
    let data = await dbContext.Bugs.findOne({ _id: id, })
    if (!data) {
      throw new BadRequest("Invalid ID")
    }
    return data
  }


  async create(rawData) {
    let data = await dbContext.Bugs.create(rawData)
    return data
  }

  async edit(id, userEmail, update) {
    let data = await dbContext.Bugs.findOneAndUpdate(
      { _id: id, creatorEmail: userEmail, status: "Open" },
      update,
      { new: true }
    );
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this bug");
    }
    return data;
  }

  async close(id, userEmail) {
    let data = await dbContext.Bugs.findOneAndUpdate(
      { _id: id, creatorEmail: userEmail },
      { status: "Closed" },
      { new: true }
    );
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this bug");
    }
    return data;
  }
}

export const bugsService = new BugsService();
