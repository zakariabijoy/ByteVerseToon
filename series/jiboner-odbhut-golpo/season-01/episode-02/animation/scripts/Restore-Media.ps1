[CmdletBinding()]
param([Parameter(Mandatory=$true)][string]$MediaDirectory)
$ErrorActionPreference = 'Stop'
$manifest = Get-Content -LiteralPath (Join-Path $PSScriptRoot '../../media-manifest.json') -Raw | ConvertFrom-Json
$target = Join-Path $PSScriptRoot '../public'
foreach ($asset in $manifest.assets) {
    $source = Join-Path $MediaDirectory $asset.file
    if (-not (Test-Path -LiteralPath $source -PathType Leaf)) { throw "Missing asset: $($asset.file)" }
    if ((Get-FileHash -LiteralPath $source -Algorithm SHA256).Hash -ne $asset.sha256) { throw "Source hash differs: $($asset.file)" }
    $destination = Join-Path $target $asset.file
    if ((Test-Path -LiteralPath $destination) -and ((Get-FileHash -LiteralPath $destination -Algorithm SHA256).Hash -ne $asset.sha256)) { throw "Existing asset differs; no copying performed: $($asset.file)" }
}
New-Item -ItemType Directory -Force -Path $target | Out-Null
foreach ($asset in $manifest.assets) {
    $destination = Join-Path $target $asset.file
    if (-not (Test-Path -LiteralPath $destination)) {
        Copy-Item -LiteralPath (Join-Path $MediaDirectory $asset.file) -Destination $destination
    }
    if ((Get-FileHash -LiteralPath $destination -Algorithm SHA256).Hash -ne $asset.sha256) { throw "Copy hash differs: $($asset.file)" }
}
Write-Output 'Declared assets restored and hashes verified; existing differing assets were not overwritten.'
