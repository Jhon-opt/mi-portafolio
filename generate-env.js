const fs = require('fs');
const path = require('path');

// Define las rutas de los archivos
const envPath = path.join(__dirname, 'src/app/environments/environment.ts');
const envProdPath = path.join(__dirname, 'src/app/environments/environment.prod.ts');

// Crea la carpeta src/app/environments/ si no existe
const envDir = path.dirname(envPath);
if (!fs.existsSync(envDir)) {
  fs.mkdirSync(envDir, { recursive: true });
}

// Genera el contenido de environment.ts (valores por defecto para desarrollo)
const envFile = `
export const environment = {
  production: false,
  youtubeApiKey: '${process.env.YOUTUBE_API_KEY || ''}',
  playlistId: '${process.env.PLAYLIST_ID || ''}'
};
`;

// Genera el contenido de environment.prod.ts (para producción)
const envProdFile = `
export const environment = {
  production: true,
  youtubeApiKey: '${process.env.YOUTUBE_API_KEY || ''}',
  playlistId: '${process.env.PLAYLIST_ID || ''}'
};
`;

// Escribe los archivos
fs.writeFileSync(envPath, envFile, 'utf8');
fs.writeFileSync(envProdPath, envProdFile, 'utf8');
console.log('environment.ts and environment.prod.ts generated successfully');
