import app from './app.js';

app.listen(app.get('port'), () => {
    const port = app.get('port');
    console.log(`Servidor funcionando en: http://localhost:${port}`);
});

