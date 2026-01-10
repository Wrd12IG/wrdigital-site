import { google } from 'googleapis';

// Google Drive Service Account Configuration
const SCOPES = ['https://www.googleapis.com/auth/drive.readonly'];

// Function to get authenticated Google Drive client
export async function getGoogleDriveClient() {
    try {
        // Use environment variables for credentials
        const credentials = {
            type: 'service_account',
            project_id: process.env.GOOGLE_PROJECT_ID,
            private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
            private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            client_email: process.env.GOOGLE_CLIENT_EMAIL,
            client_id: process.env.GOOGLE_CLIENT_ID,
            auth_uri: 'https://accounts.google.com/o/oauth2/auth',
            token_uri: 'https://oauth2.googleapis.com/token',
            auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
            client_x509_cert_url: process.env.GOOGLE_CERT_URL,
        };

        const auth = new google.auth.GoogleAuth({
            credentials,
            scopes: SCOPES,
        });

        const drive = google.drive({ version: 'v3', auth });
        return drive;
    } catch (error) {
        console.error('Error creating Google Drive client:', error);
        throw error;
    }
}

// Folder ID for the client area (set in environment variable)
export const AREA_CLIENTI_FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID;

// File type icons mapping (use icon component names for frontend rendering)
export const FILE_ICONS: Record<string, string> = {
    'application/pdf': 'file-text',
    'application/vnd.google-apps.document': 'file-text',
    'application/vnd.google-apps.spreadsheet': 'table',
    'application/vnd.google-apps.presentation': 'presentation',
    'application/vnd.google-apps.folder': 'folder',
    'image/png': 'image',
    'image/jpeg': 'image',
    'image/gif': 'image',
    'video/mp4': 'video',
    'application/zip': 'archive',
    'default': 'file',
};

// Get file icon based on MIME type
export function getFileIcon(mimeType: string): string {
    return FILE_ICONS[mimeType] || FILE_ICONS['default'];
}

// Format file size
export function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Format date
export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('it-IT', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
}

// Type for Drive file
export interface DriveFile {
    id: string;
    name: string;
    mimeType: string;
    size?: string;
    modifiedTime?: string;
    webViewLink?: string;
    webContentLink?: string;
    iconLink?: string;
    thumbnailLink?: string;
    parents?: string[];
}

// Type for folder contents
export interface FolderContents {
    folders: DriveFile[];
    files: DriveFile[];
    currentFolder?: DriveFile;
    breadcrumbs: DriveFile[];
}
