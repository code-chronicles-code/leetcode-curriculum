#!/bin/bash

set -euo pipefail

check_if_python3() {
  local python_cmd="$1"
  command -v "$python_cmd" >& /dev/null && "$python_cmd" -c 'import sys; sys.exit(0 if tuple(sys.version_info) >= (3,) else 1)'
}

if check_if_python3 python3; then
  python3 "$@"
elif check_if_python3 python; then
  python "$@"
else
  echo "Error: Did not find a \`python3\` or \`python\` command that's Python 3." >&2
  exit 1
fi