## Projekt: Schach-Koordinaten-Generierer

### **Technologie**

Next.js, React, JavaScript, Speech Synthesis API

### **Beschreibung**
Diese Webanwendung hilft beim Lernen der Schachfeld-Koordinaten. Beim Öffnen der Webseite wird ein zufälliger Name eines Schachfeldes (z. B. "e4") in der Mitte des Bildschirms angezeigt. Der Hintergrund passt sich der Farbe des Feldes (schwarz oder weiß) an. Zusätzlich wird der Name laut vorgelesen.

### **Funktionen**
1. **Zufällige Feldgenerierung**: Bei jedem Klick oder Tippen auf den Bildschirm wird eine neue Schachfeld-Koordinate generiert.
2. **Hintergrundfarbe**: Die Hintergrundfarbe der Webseite passt sich an das Feld an (z. B. e4 Weiß, d4 Schwarz).
3. **Sprachausgabe**: Der Name des Feldes wird automatisch durch den Browser laut vorgelesen (mittels Speech Synthesis API).
4. **Zähler**: Ein Zähler oben auf der Seite zeigt an, wie viele Felder bereits generiert wurden.

### **Anwendungsfall**
Nutzer setzen sich mit einem realen Schachbrett hin, lassen ein zufälliges Feld generieren und setzen es auf ihrem Schachbrett um. Dann klicken sie für das nächste Feld.

### **Technische Details**
- **Next.js** wird für das Frontend und das Server-Side-Rendering genutzt.
- **React-States** verwalten die aktuelle Koordinate und die Zählerwerte.
- **Speech Synthesis API** sorgt für die Sprachausgabe.
- **CSS** und **Tailwind CSS** steuert das UI-Design.

### **Installation & Nutzung**
1. Repository klonen:
   ```
   git clone https://github.com/bugixtix/chess-field-generator
   ```
2. Abhängigkeiten installieren:
   ```
   npm install
   ```
3. Lokale Entwicklung starten:
   ```
   npm run dev
   ```
7. Webseite im Browser unter `http://localhost:3000` öffnen.

### **Zukünftige Erweiterungen**
- Sprachausgabe in Englisch
- Möglichkeit zur Anpassung der Stimme und Geschwindigkeit der Sprachausgabe.
- Option zur Wiederholung des letzten Feldes.
- Nächste 3 kommende Felder zeigen -in kleine Schrift.
Diese Anwendung ist ein effektives Tool für Schachspieler, um die Koordinaten besser zu verinnerlichen.

### **Beitragen**
Wir freuen uns über jeden Beitrag zur Verbesserung dieses Projekts! Wenn du eine Idee hast oder eine Änderung vorschlagen möchtest, kannst du gerne einen Pull Request erstellen. Bitte beschreibe in deinem Pull Request kurz, welche Änderung du vorschlägst und warum sie das Projekt verbessert. Vielen Dank für deine Unterstützung!
