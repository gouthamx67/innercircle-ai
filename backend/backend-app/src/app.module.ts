import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './database/prisma/prisma.module';
import { ConversationsModule } from './conversations/conversations.module';
import { MessagesModule } from './messages/messages.module';
import { MemoriesModule } from './memories/memories.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    PrismaModule,
    ConversationsModule,
    MessagesModule,
    MemoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
