import express from 'express';
import multer from 'multer';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

const app = express();
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.none(), (req, res) => {
  // Accede a la propiedad "modulo" que diferencia el módulo al que pertenece el enlace
  const modulo = req.body.modulo;
  
  // Crea una carpeta basada en la propiedad "modulo" si no existe
  const folderPath = join('uploads', modulo);
  if (!existsSync(folderPath)) {
    mkdirSync(folderPath);
  }
  
  // Obtiene la URL del enlace
  const url = req.body.url;
  
  // Crea un archivo de texto con la URL en la carpeta correspondiente
  const filePath = join(folderPath, 'enlace.txt');
  writeFileSync(filePath, url);

  // El enlace se ha subido correctamente
  res.json({ message: 'Enlace subido exitosamente' });
});

app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});
