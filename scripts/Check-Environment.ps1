[CmdletBinding()]
param([string]$Config = (Join-Path (Split-Path -Parent $PSScriptRoot) 'config/local.json'))
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
if (-not (Test-Path -LiteralPath $Config)) {
    throw 'Create config/local.json from config/local.example.json and set this PC paths first.'
}
$settings = Get-Content -LiteralPath $Config -Raw | ConvertFrom-Json
$pins = Get-Content -LiteralPath (Join-Path $root 'versions.json') -Raw | ConvertFrom-Json
$failed = $false
foreach ($name in @('node','python','ffmpeg','ffprobe')) {
    $exe = $settings.$name
    try {
        if (-not $exe) { throw "No $name executable configured" }
        $flag = '--version'
        if ($name -in @('ffmpeg','ffprobe')) { $flag = '-version' }
        $output = & $exe $flag 2>&1
        if ($LASTEXITCODE -ne 0) { throw "$name failed" }
        $line = [string]($output | Select-Object -First 1)
        $expected = $pins.runtime.$name
        if (-not $line.Contains($expected)) { throw "$line; expected baseline $expected" }
        Write-Output "OK $name`: $line"
    } catch { Write-Warning $_; $failed = $true }
}
if ($failed) { throw 'Runtime baseline differs or tools are missing. Review before installing or upgrading.' }
Write-Output 'Runtime baselines match. This does not validate optional voice/model or GPU dependencies.'
