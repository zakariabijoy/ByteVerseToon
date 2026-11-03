[CmdletBinding()]
param([string]$Repository = (Split-Path -Parent $PSScriptRoot))
$ErrorActionPreference = 'Stop'
function Invoke-Git([string[]]$Arguments) {
    & git -C $Repository @Arguments
    if ($LASTEXITCODE -ne 0) { throw "Git failed: $($Arguments -join ' ')" }
}
$root = Invoke-Git -Arguments @('rev-parse', '--show-toplevel')
if ([IO.Path]::GetFullPath($root).TrimEnd('\','/') -ne [IO.Path]::GetFullPath($Repository).TrimEnd('\','/')) {
    throw 'Select the checkout root, not a folder inside another repository.'
}
$changes = Invoke-Git -Arguments @('status', '--porcelain', '--untracked-files=normal')
if ($changes) { throw 'Local changes exist. Review and commit them before pulling. No files changed.' }
$branch = Invoke-Git -Arguments @('symbolic-ref', '--quiet', '--short', 'HEAD')
if (-not $branch) { throw 'Detached checkout; select a branch first.' }
$null = Invoke-Git -Arguments @('rev-parse', '--abbrev-ref', '--symbolic-full-name', '@{upstream}')
Invoke-Git -Arguments @('pull', '--ff-only')
Invoke-Git -Arguments @('status', '--short', '--branch')
