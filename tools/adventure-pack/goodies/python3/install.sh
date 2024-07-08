#!/bin/bash

set -euo pipefail

# Change directory to the directory of the script.
cd "$(dirname "$0")"

bash run_python.sh -m venv .venv
source .venv/bin/activate
bash run_python.sh -m pip install -r requirements.txt