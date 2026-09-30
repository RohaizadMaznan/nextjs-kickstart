# Setup Guide: From a Fresh Machine to a Running App

Follow these steps in order. Each one ends with a **check** so you know it worked before moving on.

| Step | What | Time |
|---|---|---|
| 1 | Install Node.js | 5 min |
| 2 | Install Git | 5 min |
| 3 | Install VS Code | 5 min |
| 4 | Get the project | 2 min |
| 5 | Install packages | 2 min |
| 6 | Run the app | 1 min |

> **Requirement:** Next.js 16 needs **Node.js 20.9 or newer**. Install the current **LTS** version.

---

## Step 1: Install Node.js (this also installs npm)

### Windows
1. Go to https://nodejs.org
2. Download the **LTS** installer (`.msi`).
3. Run it and keep the default options. Leave **"Add to PATH"** ticked.
4. **Close and reopen** any terminal windows. PATH changes only reach new terminals.

Or with winget (built into Windows 10/11):
```bash
winget install OpenJS.NodeJS.LTS
```

### macOS
Download the LTS `.pkg` from https://nodejs.org, or with Homebrew:
```bash
brew install node@22
```

### Linux (Ubuntu/Debian)
Use nvm (Node Version Manager):
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
```
Then reopen the terminal and run:
```bash
nvm install --lts
```

### ✅ Check
```bash
node -v
```
You should see `v20.9.0` or higher (for example `v22.x.x` or `v24.x.x`).

```bash
npm -v
```
You should see a version number (for example `10.x.x`).

---

## Step 2: Install Git

- **Windows:** https://git-scm.com/download/win (keep the defaults), or `winget install Git.Git`
- **macOS:** `xcode-select --install` (or `brew install git`)
- **Linux:** `sudo apt install git`

First-time setup (use your own name and email):
```bash
git config --global user.name "Your Name"
```
```bash
git config --global user.email "you@example.com"
```

### ✅ Check
```bash
git --version
```

---

## Step 3: Install VS Code (editor)

Download it from https://code.visualstudio.com and install.

Recommended extensions (open the Extensions panel with `Ctrl+Shift+X`):
- **ESLint**: shows lint errors inline
- **Tailwind CSS IntelliSense**: autocompletes class names
- **Prettier**: formats code on save (optional)

---

## Step 4: Get the project

Open a terminal (Windows: **Git Bash** or **PowerShell**; macOS/Linux: **Terminal**) and go to a folder where you keep your code:

```bash
cd ~/Documents
```

Clone the repository:
```bash
git clone https://github.com/RohaizadMaznan/nextjs-kickstart.git
```

Go into the project folder:
```bash
cd nextjs-kickstart
```

Open it in VS Code:
```bash
code .
```

> No Git? Download the ZIP from the GitHub page (**Code → Download ZIP**), extract it, and open the folder in VS Code.

---

## Step 5: Install the project's packages

Run this **inside the project folder** (VS Code terminal: `` Ctrl+` ``):

```bash
npm install
```

This reads `package.json` and downloads every library into `node_modules/`: Next.js, React, react-hook-form, zod, TanStack Query, and the rest. It takes 1–2 minutes the first time.

### ✅ Check
- A `node_modules/` folder now exists.
- The output ends with something like `added 400 packages` and shows no red `ERR!` lines.

---

## Step 6: Run the app

```bash
npm run dev
```

Wait for this output:
```
▲ Next.js 16.x
- Local:   http://localhost:3000
✓ Ready
```

Open these in your browser:

| URL | Page |
|---|---|
| http://localhost:3000 | Home |
| http://localhost:3000/dashboard | Dashboard layout |
| http://localhost:3000/demo/form | React Hook Form + Zod demo |
| http://localhost:3000/demo/query | TanStack Query demo |

Edit any file and save. The browser updates by itself (hot reload).

Stop the server with `Ctrl + C` in the terminal.

---

## Useful commands

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server (use this while coding) |
| `npm run lint` | Check the code for mistakes |
| `npm run build` | Build a production version (also catches type errors) |
| `npm start` | Run the production build (after `npm run build`) |

---

## Troubleshooting

| Problem | Fix |
|---|---|
| `node` / `npm` **is not recognized** | Close **all** terminals and VS Code, then reopen them. If it still fails, reinstall Node and keep "Add to PATH" ticked. |
| `You are using Node.js 18... Next.js requires >=20.9.0` | Your Node is too old. Install the LTS version (Step 1) and check with `node -v`. |
| PowerShell: **running scripts is disabled** (`npm.ps1`) | Run `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` once, or use **Git Bash** / **Command Prompt** instead. |
| `Port 3000 is in use` | Another app is already on port 3000. Next.js picks 3001 automatically, so use the URL it prints. Or close the other terminal running `npm run dev`. |
| `npm install` fails / `ERESOLVE` errors | Delete `node_modules` and `package-lock.json`, then run `npm install` again. |
| `Module not found: Can't resolve '...'` | You pulled new code that added packages. Run `npm install` again. |
| Page shows old content | Hard-refresh with `Ctrl + Shift + R`. |
| Behind an office/campus proxy | Ask IT for the proxy address, then run `npm config set proxy http://proxy:port`. |

---

## Next step

Read [LESSON-forms-and-queries.md](./LESSON-forms-and-queries.md) and follow the `[Q#]`, `[Z#]`, `[F#]`, `[U#]` markers in the code.
