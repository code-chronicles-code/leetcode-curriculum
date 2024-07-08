#!/bin/bash

set -euo pipefail

# Change directory to the directory of the script.
cd "$(dirname "$0")"

source .venv/bin/activate
bash run_python.sh -m pytest --color=yes
