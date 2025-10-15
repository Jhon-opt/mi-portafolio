const fs = require('fs');
const path = require('path');

// Define la ruta del archivo environment.prod.ts
const envPath = path.join(__dirname, 'src/app/environments/environment.prod.ts');

// Crea la carpeta src/app/environments/ si no existe
const envDir = path.dirname(envPath);
if (!fs.existsSync(envDir)) {
  fs.mkdirSync(envDir, { recursive: true });
}

// Genera el contenido del archivo environment.prod.ts
const envFile = `
export const environment = {
  production: true,
  youtubeApiKey: '${process.env.YOUTUBE_API_KEY || ''}',
  playlistId: '${process.env.PLAYLIST_ID || ''}'
};
`;

// Escribe el archivo
fs.writeFileSync(envPath, envFile, 'utf8');
console.log('environment.prod.ts generated successfully');
