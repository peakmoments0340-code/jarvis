import subprocess
from typing import List

# Simple whitelist for allowed commands on Windows. Edit carefully.
WHITELIST = {
    "notepad": ["notepad.exe"],
    "code": ["code"],  # VSCode CLI
    "explorer": ["explorer"],
    "calc": ["calc.exe"],
}


def run_whitelisted_command(command: str, args: List[str]) -> str:
    cmd_candidates = WHITELIST.get(command)
    if not cmd_candidates:
        return f"Command '{command}' is not whitelisted. Edit backend/commands.py to add it."
    # pick the first candidate
    cmd = cmd_candidates[0]
    full = [cmd] + args
    try:
        proc = subprocess.Popen(full, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=False)
        stdout, stderr = proc.communicate(timeout=10)
        return stdout.decode(errors='ignore') or stderr.decode(errors='ignore') or "Started"
    except Exception as e:
        return f"Error running command: {e}"
