#!/bin/bash

set -euo pipefail

# Change directory to the directory of the script.
cd "$(dirname "$0")"

# Prepare Python virtual environment.
bash run_python.sh -m venv .venv

# Activate Python virtual environment.
if [ -f .venv/bin/activate ]; then
  source .venv/bin/activate
elif [ -f .venv/Scripts/activate ]; then
  source .venv/Scripts/activate
else
  echo "Error: Could not activate the Python virtual environment." >&2
  exit 1
fi

bash run_python.sh -m pip install -r requirements.txt
