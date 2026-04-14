import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
    // Percorsi
    const DATA_DIR = path.join(process.cwd(), 'data');
    const CUSTOM_HERO_PNG = path.join(DATA_DIR, 'hero-bg-custom.png');
    const CUSTOM_HERO_JPG = path.join(DATA_DIR, 'hero-bg-custom.jpg');
    // Fallback all'immagine originale in public se non c'è quella custom
    const DEFAULT_HERO_PATH = path.join(process.cwd(), 'public', 'hero-bg.png');

    let imagePath = DEFAULT_HERO_PATH;

    // Se c'è un'immagine custom, usiamo quella (priorità al JPG se appena caricato)
    if (fs.existsSync(CUSTOM_HERO_JPG)) {
        imagePath = CUSTOM_HERO_JPG;
    } else if (fs.existsSync(CUSTOM_HERO_PNG)) {
        imagePath = CUSTOM_HERO_PNG;
    }

    try {
        const imageBuffer = fs.readFileSync(imagePath);

        // Determina il content type (assumiamo png o jpg in base a estensione file originale, o genericamente immagine)
        // Per semplicità serviamo come image/png o image/jpeg
        const ext = path.extname(imagePath).toLowerCase();
        const contentType = ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' : 'image/png';

        return new NextResponse(imageBuffer, {
            headers: {
                'Content-Type': contentType,
                'Cache-Control': 'no-store, must-revalidate', // Importante per vedere subito i cambi
            },
        });
    } catch (error) {
        console.error("Errore lettura immagine hero:", error);
        return new NextResponse("Image not found", { status: 404 });
    }
}
