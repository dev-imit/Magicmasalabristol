# Magic Masala — VPS Deployment Guide

Deploy the Magic Masala website to a VPS for **client preview** at `www.magicmasala.gitdr.com`.

---

## Prerequisites

- A VPS (Ubuntu 20.04+ recommended) with root/sudo access
- Domain `magicmasala.gitdr.com` — **point DNS A records** to your VPS IP:
  - `magicmasala.gitdr.com` → `YOUR_VPS_IP`
  - `www.magicmasala.gitdr.com` → `YOUR_VPS_IP`
- SSH access to the VPS
- GitHub repository with your code pushed

---

## Step 1: Push Code to GitHub

On your **local machine**:

```bash
cd /Users/febikaji16/Documents/IMIT/magic-masala

# Initialize git (if not already)
git init

# Create .gitignore
cat > .gitignore << 'EOF'
node_modules/
build/
backend/data.db
backend/.env
.env
.DS_Store
backend/uploads/gallery/*
backend/uploads/offers/*
backend/uploads/certificates/*
!backend/uploads/gallery/.gitkeep
!backend/uploads/offers/.gitkeep
!backend/uploads/certificates/.gitkeep
EOF

# Create .gitkeep files to preserve upload directories
touch backend/uploads/gallery/.gitkeep
touch backend/uploads/offers/.gitkeep
touch backend/uploads/certificates/.gitkeep

# Add and commit
git add .
git commit -m "Initial commit"

# Add remote and push
git remote add origin https://github.com/YOUR_USERNAME/magic-masala.git
git branch -M main
git push -u origin main
```

---

## Step 2: VPS Initial Setup

SSH into your VPS:

```bash
ssh root@YOUR_VPS_IP
```

### Install Node.js (v18+)

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
node -v  # verify
```

### Install Nginx

```bash
sudo apt update
sudo apt install -y nginx
sudo systemctl enable nginx
```

### Install PM2 (Process Manager)

```bash
sudo npm install -g pm2
```

### Install build tools (needed for better-sqlite3)

```bash
sudo apt install -y build-essential python3
```

---

## Step 3: Clone the Repository

```bash
cd /var/www
git clone https://github.com/YOUR_USERNAME/magic-masala.git
cd magic-masala
```

---

## Step 4: Build the Frontend

```bash
# Install frontend dependencies and build
npm install
npm run build
```

---

## Step 5: Setup the Backend

```bash
cd backend
npm install

# Create the .env file
cat > .env << 'EOF'
PORT=3001
JWT_SECRET=your-strong-secret-key-change-this
ADMIN_EMAIL=admin@magicmasala.com
ADMIN_PASSWORD=YourStrongPassword123!
EOF
```

> **Important:** Change `JWT_SECRET` to a long random string and set a strong `ADMIN_PASSWORD`.

---

## Step 6: Start Backend with PM2

```bash
cd /var/www/magic-masala/backend
pm2 start server.js --name "magic-masala-backend"
pm2 save
pm2 startup  # follow the instructions it prints to enable auto-start on reboot
```

### Useful PM2 Commands

```bash
pm2 status                    # check running processes
pm2 logs magic-masala-backend # view logs
pm2 restart magic-masala-backend
pm2 stop magic-masala-backend
```

---

## Step 7: Configure Nginx

Create the Nginx config:

```bash
sudo nano /etc/nginx/sites-available/magicmasala
```

Paste the following:

```nginx
server {
    listen 80;
    server_name magicmasala.gitdr.com www.magicmasala.gitdr.com;

    # Serve React build
    root /var/www/magic-masala/build;
    index index.html;

    # Frontend routes — let React Router handle them
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Proxy API requests to backend
    location /api/ {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_cache_bypass $http_upgrade;
        client_max_body_size 10M;
    }

    # Serve uploaded files from backend
    location /uploads/ {
        alias /var/www/magic-masala/backend/uploads/;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/magicmasala /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default  # remove default site
sudo nginx -t                              # test config
sudo systemctl restart nginx
```

---

## Step 8: Setup SSL (HTTPS) with Let's Encrypt

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d magicmasala.gitdr.com -d www.magicmasala.gitdr.com
```

Follow the prompts. Certbot will auto-renew. Verify with:

```bash
sudo certbot renew --dry-run
```

---

## Step 9: Set Environment Variable for Production

Create a `.env` file in the project root for the React app (used at build time):

```bash
cd /var/www/magic-masala
cat > .env << 'EOF'
REACT_APP_API_URL=https://www.magicmasala.gitdr.com
EOF

# Rebuild frontend with production API URL
npm run build
```

---

## Updating the Site (After Code Changes)

### On your local machine:

```bash
git add .
git commit -m "your changes"
git push origin main
```

### On the VPS:

```bash
cd /var/www/magic-masala
git pull origin main

# If frontend changed:
npm install
npm run build

# If backend changed:
cd backend
npm install
pm2 restart magic-masala-backend
```

### Quick one-liner for VPS update:

```bash
cd /var/www/magic-masala && git pull origin main && npm install && npm run build && cd backend && npm install && pm2 restart magic-masala-backend
```

---

## Firewall Setup (Optional but Recommended)

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| 502 Bad Gateway | `pm2 status` — check if backend is running |
| API returns 404 | Verify Nginx proxy config and restart Nginx |
| Upload fails | Check `client_max_body_size` in Nginx config |
| White screen | Check `npm run build` completed without errors |
| Permission denied on uploads | `sudo chown -R www-data:www-data /var/www/magic-masala/backend/uploads` |
| better-sqlite3 build error | `sudo apt install build-essential python3` then `npm rebuild` |

---

## Directory Structure on VPS

```
/var/www/magic-masala/
├── build/              ← React production build (served by Nginx)
├── backend/
│   ├── server.js       ← Express API (managed by PM2)
│   ├── .env            ← Environment variables
│   ├── data.db         ← SQLite database (auto-created)
│   └── uploads/        ← User-uploaded files
└── .env                ← REACT_APP_API_URL (build-time)
```
