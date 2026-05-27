# Google TTS local setup (sample guide)

This sample uses pre-generated MP3 parts for `/residents/japan-mistakes-new-residents`.

## Local setup

1. Enable Google Cloud Text-to-Speech API.
2. Enable billing on the Google Cloud project.
3. Configure local credentials (Application Default Credentials, or set `GOOGLE_APPLICATION_CREDENTIALS` to your service-account JSON path).
4. Generate audio:
   - `npm run audio:google:mistakes`
5. Commit generated files under `public/audio/residents/japan-mistakes-new-residents/`.

Do not commit credentials. Only commit generated MP3 files and `manifest.json`.
