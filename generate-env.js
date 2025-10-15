const fs = require('fs');
const path = require('path');

const envFile = `
export const environment = {
  production: true,
  youtubeApiKey: '${process.env.YOUTUBE_API_KEY || ''}',
  playlistId: '${process.env.PLAYLIST_ID || ''}'
};
`;

const envPath = path.join(__dirname, 'src/app/environments/environment.prod.ts');
fs.writeFileSync(envPath, envFile, 'utf8');
console.log('environment.prod.ts generated successfully');
