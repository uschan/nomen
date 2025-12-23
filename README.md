# Nomen (名·相)

> **Neo-Oriental Cyberpunk Name Analysis & Life Deconstruction System**
>
> *“知命不惧，改命不乱。”*

![Banner](https://img.shields.io/badge/Style-Neo--Oriental_Cyberpunk-050505?style=for-the-badge&labelColor=8ba694)
![Stack](https://img.shields.io/badge/Tech-React_19_+_Gemini_Pro-050505?style=for-the-badge&labelColor=aa3a3a)

## 📖 Introduction (缘起)

**Nomen (名·相)** is not just a fortune-telling app. It is a philosophical tool designed to deconstruct a user's life path through the lens of Semiotics, Jungian Psychology, and Traditional Five Elements (Wu Xing).

The core philosophy follows the **"Golden Spiral"** model:
1.  **Cognition (认命)**: Accepting one's "factory settings" and limitations.
2.  **Dialectic (辩证)**: Understanding how limitations can be transformed into weapons.
3.  **Ascension (改命)**: Making conscious choices at critical timeline nodes to spiral upwards.

## ✨ Features (功能)

*   **Deep Decoding (全维拆解)**:
    *   **Imagery**: Visual deconstruction of the name's characters.
    *   **Personality**: Psychological profiling based on Jungian archetypes.
    *   **Fortune**: Wealth, relationships, and hidden worries.
*   **Persona Modes**:
    *   **Ferryman (摆渡人)**: The core philosophical mode. Insightful, empathetic, yet sharp.
    *   **Sage (隐世高人)**: Cryptic, ancient wisdom.
    *   **Psychologist (心理咨询)**: Analytical and healing.
    *   **Mentor (毒舌导师)**: Ruthless career reality checks.
*   **The Spiral (流年抉择)**: AI-predicted future decision nodes (Timeline) rather than static predictions.
*   **Energy Totem (能量图腾)**: A specific Kanji/Symbol generated as a psychological anchor.
*   **Aesthetics**:
    *   Ink-wash Cyberpunk visuals.
    *   Generative AI art for "Soul Imagery".
    *   Atmospheric soundscapes and animations.

## 🛠 Tech Stack (工法)

*   **Frontend**: React 19, TypeScript, Vite (assumed build tool).
*   **Styling**: Tailwind CSS (Custom color palette: Ink, Celadon, Cinnabar).
*   **AI Engine**: Google Gemini API (`gemini-2.5-flash` for text, `gemini-2.5-flash-image` for visuals).
*   **State**: LocalStorage for persistence.

## 🚀 Getting Started (起卦)

### Prerequisites

*   Node.js (v18+)
*   A Google Gemini API Key ([Get it here](https://aistudio.google.com/))

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/nomen-project.git
    cd nomen-project
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Setup**:
    Create a `.env` file in the root directory:
    ```bash
    cp .env.example .env
    ```
    Edit `.env` and add your API Key:
    ```env
    API_KEY=AIzaSyYourActualKeyHere...
    ```

4.  **Run Local Development**:
    ```bash
    npm start
    # or
    npm run dev
    ```

## ☁️ Deployment on VPS (云端部署)

To deploy this on a VPS (Ubuntu/Debian) with Nginx:

### 1. Build the Project
Run the build command locally or on your server:
```bash
# Important: The API_KEY must be available during build time for Vite/Webpack to inline it
# (Note: For better security in production, consider a backend proxy, but for MVP this works)
export API_KEY=your_actual_key_here
npm run build
```
This generates a `dist` (or `build`) folder.

### 2. Configure Nginx
Install Nginx on your VPS:
```bash
sudo apt update
sudo apt install nginx
```

Create a site configuration (`/etc/nginx/sites-available/nomen`):

```nginx
server {
    listen 80;
    server_name your-domain.com;

    root /var/www/nomen/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Optional: Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript;
}
```

### 3. Deploy Files
Upload your `dist` folder to `/var/www/nomen/dist` on your server.

### 4. Enable Site
```bash
sudo ln -s /etc/nginx/sites-available/nomen /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## 🔮 Roadmap & Philosophy (道与术)

The project aims to implement a "Monetization as Tao" strategy:
*   **Phase 1 (Current)**: The Vessel. Core analysis and visual aesthetics.
*   **Phase 2**: The Tools. Digital Totem downloads (8K wallpapers), Scenario Simulation.
*   **Phase 3**: The Connection. "Relationship Mirroring" and Social Karma gifting.

## 📄 License

MIT License.

---

*"Everything is a symbol, if you know how to read it."*
