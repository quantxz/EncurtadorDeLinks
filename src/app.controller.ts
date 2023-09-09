import { Body, Controller, Get, Param, Post, Redirect, Render, Res} from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaClient, URLs } from '@prisma/client';
import Response from "express"
import { join } from 'path';

const prisma = new PrismaClient()

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  @Render("../public/index.ejs")
  getHello() {}

  @Post('check')
  @Render(join(__dirname, "..", "public", "stats.ejs"))
  async getUrl(@Body() formData: any, @Res() res: Response): Promise<any> {

    const shortedUrl: any = this.appService.urlData(formData)

    await prisma.uRLs.create({
      data: {
        id: shortedUrl[2].code,
        url: shortedUrl[0].url["url"]
      }
    })

    const url: URLs = await prisma.uRLs.findFirst({
      where: {
        id: shortedUrl[2].code
      }
    });

    return { url }

  };

  @Get(":code")
  @Redirect() 
  async newPage(@Param('code') code: string) {
    const url: URLs = await prisma.uRLs.findFirst({
      where: {
        id: code
      }
    });
    await prisma.uRLs.update({
      data: {
        visits: url.visits += 1
      },
      where: {
        id: code
      }
    });

    if (url) {
      return { url: url.url }; // Retorne o objeto de redirecionamento com a URL
    } else {
      throw new Error(); // Trate o caso em que o código não foi encontrado
    }
  };

  @Get(":code/stats")
  @Render(join(__dirname, "..", "public", "stats.ejs")) // Use a anotação @Redirect
  async stats(@Param('code') code: string): Promise<any> {
    const url: URLs = await prisma.uRLs.findFirst({
      where: {
        id: code
      }
    });


    return { url }

  };

}
