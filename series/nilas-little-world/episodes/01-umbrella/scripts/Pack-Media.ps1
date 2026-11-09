[CmdletBinding()]
param([string]$Output)
$ErrorActionPreference = 'Stop'
$episode = Split-Path -Parent $PSScriptRoot
if (-not $Output) { $Output = Join-Path $episode 'out/nila-e01-media.zip' }
if (Test-Path -LiteralPath $Output) { throw 'Choose a new archive filename; existing media bundles are preserved.' }
$manifest = Get-Content -LiteralPath (Join-Path $episode 'production/media-manifest.json') -Raw | ConvertFrom-Json
$files = @()
foreach ($asset in $manifest.assets) {
    $file = Join-Path $episode $asset.projectPath
    if (-not (Test-Path -LiteralPath $file)) { throw "Missing $($asset.projectPath)" }
    if ((Get-FileHash -LiteralPath $file -Algorithm SHA256).Hash.ToLowerInvariant() -ne $asset.sha256) { throw "Hash mismatch: $($asset.projectPath)" }
    if ([IO.Path]::GetFileName($file) -ne $asset.bundleName) { throw 'Bundle basename differs from the media manifest.' }
    $files += $file
}
$parent = Split-Path -Parent ([IO.Path]::GetFullPath($Output))
New-Item -ItemType Directory -Path $parent -Force | Out-Null
Compress-Archive -LiteralPath $files -DestinationPath $Output -CompressionLevel Optimal
Write-Output "Created $Output ($($files.Count) approved assets only)."
