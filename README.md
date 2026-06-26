🎵 Playlist Faxina de Sábado

Um music player web com playlist de folk/viking metal, construído com HTML, CSS e JavaScript puro.

✨ Funcionalidades


▶️ Play / Pause
⏭️ Próxima música e música anterior
🔀 Modo shuffle (embaralha a playlist)
🔁 Modo repeat (repete a música atual)
❤️ Like nas músicas (salvo no localStorage)
📊 Barra de progresso clicável
⏱️ Tempo atual e duração total da música
🎨 Background dinâmico por música

🚀 Como usar


Clone ou baixe o repositório
Adicione os arquivos de áudio (.mp3) na pasta songs/
Adicione as capas (.webp) na pasta images/
Abra o index.html em um servidor local (ex: Live Server no VS Code)



⚠️ Por restrições do navegador, o player não funciona abrindo o index.html diretamente como arquivo local — é necessário um servidor HTTP.



🐳 Rodando com Docker

Pré-requisitos: ter o Docker instalado.

```bash
docker compose up -d
```

Acesse no navegador: http://localhost

Para parar:

```bash
docker compose down
```

> Caso a porta 80 já esteja em uso (ex: Apache), edite o `compose.yaml` e troque `"80:80"` por `"8080:80"`, depois acesse http://localhost:8080

🛠️ Tecnologias


HTML5 (Audio API)
CSS3
JavaScript (ES6+)
Bootstrap Icons
localStorage para persistir os likes
Docker + Nginx para servir o projeto


💾 Persistência

Os likes das músicas são salvos no localStorage do navegador, ou seja, persistem entre sessões na mesma máquina.
