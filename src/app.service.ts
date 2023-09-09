import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from './prisma.service';
import { Response } from 'express';

const generateCode = () => {
  let text = ''
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

  for(let i = 0; i < 6; i++){
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}
  
  getHello(): string {
    return 'Hello World!';
  }

  urlData(url: string): any {
    const code = generateCode()

    return [
      { url: url },
      { obj: process.env.DOMAIN + code },
      { code: code }
    ]

  }

}
