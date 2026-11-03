[CmdletBinding()]
param(
    [Parameter(Mandatory=$true)][string]$Target,
    [switch]$Apply
)
$ErrorActionPreference = 'Stop'
$source = Split-Path -Parent $PSScriptRoot
$targetRoot = (Resolve-Path -LiteralPath $Target).Path
if ((Get-Item -LiteralPath $targetRoot).Attributes -band [IO.FileAttributes]::ReparsePoint) {
    throw 'Target must be a real directory, not a junction or symbolic link.'
}
$manifest = Get-Content -LiteralPath (Join-Path $source 'setup-manifest.json') -Raw | ConvertFrom-Json
$plan = @()
foreach ($relative in $manifest.files) {
    $from = Join-Path $source $relative
    $to = [IO.Path]::GetFullPath((Join-Path $targetRoot $relative))
    if (-not $to.StartsWith($targetRoot.TrimEnd('\') + '\', [StringComparison]::OrdinalIgnoreCase)) {
        throw "Manifest path escapes target: $relative"
    }
    $ancestor = Split-Path -Parent $to
    while ($ancestor -and $ancestor -ne $targetRoot) {
        if ((Test-Path -LiteralPath $ancestor) -and
            ((Get-Item -LiteralPath $ancestor).Attributes -band [IO.FileAttributes]::ReparsePoint)) {
            throw "Target contains a junction or symbolic link: $ancestor"
        }
        $ancestor = Split-Path -Parent $ancestor
    }
    if (-not (Test-Path -LiteralPath $from -PathType Leaf)) { throw "Missing source: $relative" }
    $state = 'ADD'
    if (Test-Path -LiteralPath $to) {
        $state = 'CONFLICT'
        if ((Test-Path -LiteralPath $to -PathType Leaf) -and
            (Get-FileHash -LiteralPath $from).Hash -eq (Get-FileHash -LiteralPath $to).Hash) { $state = 'SAME' }
    }
    $plan += [pscustomobject]@{State=$state; Path=$relative; From=$from; To=$to}
}
$plan | Select-Object State,Path | Format-Table -AutoSize | Out-String | Write-Output
if (-not $Apply) { Write-Output 'Preview only. Resolve conflicts, then rerun with -Apply.'; return }
if ($plan.State -contains 'CONFLICT') { throw 'Differing files exist. Merge manually; nothing copied.' }
# Preflight completed for the whole batch. Never overwrite existing files.
foreach ($item in $plan | Where-Object State -eq 'ADD') {
    $null = New-Item -ItemType Directory -Path (Split-Path -Parent $item.To) -Force
    [IO.File]::Copy($item.From, $item.To, $false)
}
Write-Output 'Added missing files. Nothing committed or pushed.'
