import * as process from "node:process";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import "reflect-metadata"

async function start(){
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);

  await app.listen(PORT, () => console.log(`Listening on ${PORT}`));
}

start()