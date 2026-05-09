import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/database/prisma/prisma.service';

@Injectable()
export class ConversationsService {
  constructor(private prisma: PrismaService) {}

  async createConversation(data: any, metadata?: any) {
    // Updated to accept 2 arguments
    return { id: 'placeholder', ...data };
  }

  async getUserConversations(userId: number) {
    // Updated to accept a number
    return [];
  }
}
