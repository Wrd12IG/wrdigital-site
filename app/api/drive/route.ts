import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getGoogleDriveClient, AREA_CLIENTI_FOLDER_ID, DriveFile, FolderContents } from '@/lib/googleDrive';

// GET - List files in a folder
export async function GET(request: NextRequest) {
    try {
        // Check authentication
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json(
                { error: 'Non autorizzato. Effettua il login.' },
                { status: 401 }
            );
        }

        // Get folder ID from query params (default to root Area Clienti folder)
        const { searchParams } = new URL(request.url);
        const folderId = searchParams.get('folderId') || AREA_CLIENTI_FOLDER_ID;

        if (!folderId) {
            return NextResponse.json(
                { error: 'Folder ID non configurato. Contatta l\'amministratore.' },
                { status: 500 }
            );
        }

        // Get Google Drive client
        const drive = await getGoogleDriveClient();

        // Get folder contents
        const response = await drive.files.list({
            q: `'${folderId}' in parents and trashed = false`,
            fields: 'files(id, name, mimeType, size, modifiedTime, webViewLink, webContentLink, iconLink, thumbnailLink, parents)',
            orderBy: 'folder,name',
        });

        const files = response.data.files || [];

        // Separate folders and files
        const folders: DriveFile[] = [];
        const regularFiles: DriveFile[] = [];

        files.forEach((file) => {
            const driveFile: DriveFile = {
                id: file.id || '',
                name: file.name || '',
                mimeType: file.mimeType || '',
                size: file.size ?? undefined,
                modifiedTime: file.modifiedTime ?? undefined,
                webViewLink: file.webViewLink ?? undefined,
                webContentLink: file.webContentLink ?? undefined,
                iconLink: file.iconLink ?? undefined,
                thumbnailLink: file.thumbnailLink ?? undefined,
                parents: file.parents ?? undefined,
            };

            if (file.mimeType === 'application/vnd.google-apps.folder') {
                folders.push(driveFile);
            } else {
                regularFiles.push(driveFile);
            }
        });

        // Get current folder info
        let currentFolder: DriveFile | undefined;
        if (folderId !== AREA_CLIENTI_FOLDER_ID) {
            const folderResponse = await drive.files.get({
                fileId: folderId,
                fields: 'id, name, mimeType, parents',
            });
            currentFolder = folderResponse.data as DriveFile;
        }

        // Build breadcrumbs
        const breadcrumbs: DriveFile[] = [];
        if (currentFolder) {
            let parentId = currentFolder.parents?.[0];
            const visited = new Set<string>();

            while (parentId && parentId !== AREA_CLIENTI_FOLDER_ID && !visited.has(parentId)) {
                visited.add(parentId);
                try {
                    const parentResponse = await drive.files.get({
                        fileId: parentId,
                        fields: 'id, name, mimeType, parents',
                    });
                    const parentFolder = parentResponse.data as DriveFile;
                    breadcrumbs.unshift(parentFolder);
                    parentId = parentFolder.parents?.[0];
                } catch {
                    break;
                }
            }
            breadcrumbs.push(currentFolder);
        }

        const result: FolderContents = {
            folders,
            files: regularFiles,
            currentFolder,
            breadcrumbs,
        };

        return NextResponse.json(result);
    } catch (error) {
        console.error('Google Drive API Error:', error);
        return NextResponse.json(
            { error: 'Errore nel recupero dei file. Riprova più tardi.' },
            { status: 500 }
        );
    }
}
