import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
    try {
        const { pageId, blocks, publish } = await request.json();

        if (!pageId || !blocks) {
            return NextResponse.json(
                { error: 'Page ID and blocks are required' },
                { status: 400 }
            );
        }

        const data: any = {
            content: JSON.stringify(blocks),
            updatedAt: new Date()
        };

        // If publish flag is present, update the published status
        if (typeof publish === 'boolean') {
            data.published = publish;
        }

        // Update the page content JSON
        const page = await prisma.page.update({
            where: { id: pageId },
            data
        });

        // Optional: In the future, we could also sync the PageBlock relations here
        // for advanced querying, but for now the JSON source of truth is enough.

        return NextResponse.json({
            success: true,
            message: 'Page blocks saved successfully'
        });

    } catch (error: any) {
        console.error('Error saving page blocks:', error);
        return NextResponse.json(
            { error: error.message || 'Internal server error' },
            { status: 500 }
        );
    }
}
