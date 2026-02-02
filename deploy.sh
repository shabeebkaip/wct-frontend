#!/bin/bash

# Deployment script for WCT Frontend
# This script pulls the latest code, builds the project, and restarts PM2

set -e  # Exit on any error

echo "🚀 Starting deployment process..."

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print colored output
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

# Check if we're in a git repository
if [ ! -d .git ]; then
    print_error "Not a git repository!"
    exit 1
fi

# Step 1: Stash any local changes
print_info "Stashing local changes..."
git stash

# Step 2: Pull latest code
print_info "Pulling latest code from repository..."
git pull origin main
print_success "Code pulled successfully"

# Step 3: Install dependencies (if needed)
print_info "Installing dependencies..."
pnpm install
print_success "Dependencies installed"

# Step 4: Build the project
print_info "Building the project..."
pnpm build
print_success "Build completed successfully"

# Step 5: Restart PM2
print_info "Restarting PM2 process..."
if pm2 list | grep -q "wecaretech"; then
    pm2 restart wecaretech
    print_success "PM2 process restarted"
else
    print_info "PM2 process 'wecaretech' not found. Starting new process..."
    pm2 start npm --name "wecaretech" -- start
    print_success "PM2 process started"
fi

# Step 6: Save PM2 configuration
pm2 save

print_success "Deployment completed successfully! 🎉"
echo ""
echo "View logs with: pm2 logs wecaretech"
echo "Check status with: pm2 status"
