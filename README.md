
# 1. Kloniraš prazan repozitorijum
git clone https://github.com/<tvoje-korisnicko-ime>/chat-agent-api-template.git
cd chat-agent-api-template

# 2. Kreiraj potrebne foldere i fajlove
mkdir public
touch public/index.html public/style.css public/script.js ping.mp3 server.js package.json README.md

# 3. Otvori projekat u VSCode i kopiraj sadržaj:
# - public/index.html, public/style.css, public/script.js
# - server.js
# - package.json
# - u README.md opis projekta i instrukcije kao što sam naveo

# 4. Dodaj fajlove u git
git add .
git commit -m "Initial commit: chat agent template for Render deployment"

# 5. Poveži i push na GitHub
git push -u origin main
