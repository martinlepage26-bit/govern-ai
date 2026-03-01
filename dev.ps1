[CmdletBinding()]
param(
  [switch]$Frontend = $true,
  [switch]$Backend  = $true,
  [switch]$CompassAI = $true,
  [switch]$AurorAI   = $true,
  [switch]$Agency    = $true
)

function Get-RunCommand {
  param([Parameter(Mandatory)][string]$Path)

  $pkg       = Join-Path $Path "package.json"
  $pyProject = Join-Path $Path "pyproject.toml"
  $req       = Join-Path $Path "requirements.txt"
  $manage    = Join-Path $Path "manage.py"

  $sln = Get-ChildItem -Path $Path -Filter *.sln -File -ErrorAction SilentlyContinue | Select-Object -First 1
  $csproj = $null
  if (-not $sln) {
    $csproj = Get-ChildItem -Path $Path -Filter *.csproj -File -Recurse -ErrorAction SilentlyContinue | Select-Object -First 1
  }

  if (Test-Path $pkg) {
    # prefer dev if present, else start
    try {
      $json = Get-Content $pkg -Raw | ConvertFrom-Json
      if ($json.scripts.dev)   { return "npm install; npm run dev" }
      if ($json.scripts.start) { return "npm install; npm run start" }
    } catch { }
    return "npm install; npm run dev"
  }

  if (Test-Path $manage) {
    return "python -m pip install -U pip; pip install -r requirements.txt; python manage.py runserver"
  }

  if (Test-Path $pyProject) {
    # Generic python guess (adjust once you tell me your entrypoint)
    return "python -m pip install -U pip; python -m pip install -e .; python -m pytest -q"
  }

  if (Test-Path $req) {
    return "python -m pip install -U pip; pip install -r requirements.txt; python -m pytest -q"
  }

  if ($sln -or $csproj) {
    return "dotnet restore; dotnet run"
  }

  return "Write-Host 'No known runner detected in this folder.' -ForegroundColor Yellow; Get-ChildItem"
}

function Start-AppWindow {
  param(
    [Parameter(Mandatory)][string]$Title,
    [Parameter(Mandatory)][string]$Path
  )

  $full = (Resolve-Path $Path).Path
  $cmd  = Get-RunCommand -Path $full

  # Build a single command that changes directory then runs the startup command
  $invoke = "Set-Location -LiteralPath `"$full`"; `$host.UI.RawUI.WindowTitle = `"$Title`"; $cmd"

  Start-Process -FilePath "powershell.exe" -ArgumentList @(
    "-NoExit",
    "-ExecutionPolicy", "Bypass",
    "-Command", $invoke
  ) -WorkingDirectory $full | Out-Null
}

if ($Frontend -and (Test-Path ".\frontend"))   { Start-AppWindow -Title "frontend"  -Path ".\frontend" }
if ($Backend  -and (Test-Path ".\backend"))    { Start-AppWindow -Title "backend"   -Path ".\backend" }
if ($CompassAI -and (Test-Path ".\CompassAI")) { Start-AppWindow -Title "CompassAI" -Path ".\CompassAI" }
if ($AurorAI   -and (Test-Path ".\AurorAI"))   { Start-AppWindow -Title "AurorAI"   -Path ".\AurorAI" }
if ($Agency    -and (Test-Path ".\Agency"))    { Start-AppWindow -Title "Agency"   -Path ".\Agency" }

Write-Host "Launched selected apps in separate PowerShell windows." -ForegroundColor Green
