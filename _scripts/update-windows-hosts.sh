#!/usr/bin/env bash
# Update Windows hosts file with current WSL IP
# Run on WSL startup

WSL_IP=$(ip addr show eth0 | grep "inet " | awk '{print $2}' | cut -d/ -f1)
WINDOWS_HOSTS="/mnt/c/Windows/System32/drivers/etc/hosts"

if [[ -f "$WINDOWS_HOSTS" ]]; then
    # Remove old entry
    sed -i '/# WSL-OpenClaw/d' "$WINDOWS_HOSTS"
    # Add new entry
    echo "$WSL_IP openclaw.local  # WSL-OpenClaw" >> "$WINDOWS_HOSTS"
    echo "Updated Windows hosts: openclaw.local -> $WSL_IP"
fi
