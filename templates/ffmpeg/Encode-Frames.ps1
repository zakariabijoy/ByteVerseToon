[CmdletBinding()]
param(
    [Parameter(Mandatory=$true)][string]$Frames,
    [Parameter(Mandatory=$true)][string]$Audio,
    [Parameter(Mandatory=$true)][string]$Output,
    [int]$Fps = 30,
    [int]$StartNumber = 0,
    [string]$FFmpeg = 'ffmpeg'
)
$ErrorActionPreference = 'Stop'
if ($Fps -le 0 -or $StartNumber -lt 0) { throw 'Invalid frame settings.' }
if (Test-Path -LiteralPath $Output) { throw 'Output already exists; choose a new version.' }
if (-not (Test-Path -LiteralPath $Audio -PathType Leaf)) { throw 'Missing soundtrack.' }
# Supply exactly the intended frame count and a matching soundtrack. No silent trim.
# Example frames argument: E:\ByteVerseToon\work\episode\frames\frame-%06d.png
& $FFmpeg -n -framerate $Fps -start_number $StartNumber -i $Frames -i $Audio `
    -map 0:v:0 -map 1:a:0 -c:v libx264 -crf 18 -pix_fmt yuv420p `
    -c:a aac -b:a 192k -ar 48000 -movflags +faststart $Output
if ($LASTEXITCODE -ne 0) { throw "FFmpeg failed: $LASTEXITCODE" }
