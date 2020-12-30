import { IsEmail, Min } from "class-validator";
import { Controller, Get, Post } from "../src/decorators/RoutingDecorators";
import { EventManager } from "../src/EventManager";
import { Request } from "../src/Request";
import { Response } from "../src/Response";
import { MyEvent } from "./MyEvent";
import { MyMiddleware } from "./MyMiddleware";

export class TestDto {
  @Min(1, { message: "i must be a number greater or equal to 1" })
  i!: number;

  @IsEmail()
  email!: string;
}

class TestQueries {
  @Min(0)
  id!: number;

  @IsEmail()
  email!: string;
}

@Controller("test", [MyMiddleware])
export class MyController {
  constructor(private _eventManager: EventManager) {}

  @Get("ab")
  async test(req: Request, res: Response) {
    const queries = await req.queries(TestQueries);
    this._eventManager.enqueue(MyEvent);
    res.send({ message: "worked" });
  }
}
