import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import OpenAI from 'openai';

@Injectable()
export class MoodsService {
    private openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    constructor(private prisma: PrismaService) { }

    async detectMood(content: string) {
        const completion =
            await this.openai.chat.completions.create({
                model: 'gpt-4o-mini',
                messages: [
                    {
                        role: 'system',
                        content: `
Analyze the emotional state of the message.

Return ONLY valid JSON:

{
  "mood": "stress",
  "intensity": 7
}

Possible moods:
- happy
- sad
- anxious
- stressed
- lonely
- overwhelmed
- neutral
`,
                    },
                    {
                        role: 'user',
                        content,
                    },
                ],
            });

        return JSON.parse(
            completion.choices[0].message.content || '{}',
        );
    }

    async createMoodEntry(
        userId: number,
        mood: string,
        intensity: number,
        message: string,
    ) {
        return this.prisma.moodEntry.create({
            data: {
                userId,
                mood,
                intensity,
                message,
            },
        });
    }

    async getUserMoodHistory(userId: number) {
        return this.prisma.moodEntry.findMany({
            where: { userId },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
}