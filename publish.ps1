param(
    [string]$CommitMessage = "",
    [ValidateSet("patch", "minor", "major")]
    [string]$Bump = "patch",
    [switch]$NoPush
)

$ErrorActionPreference = "Stop"

function Get-VersionParts([string]$version) {
    if (-not $version -or $version -notmatch '^\d+\.\d+\.\d+$') {
        return @(1, 0, 0)
    }
    return $version.Split('.') | ForEach-Object { [int]$_ }
}

function Get-NextVersion([string]$currentVersion, [string]$bumpType) {
    $parts = Get-VersionParts $currentVersion
    $major = $parts[0]
    $minor = $parts[1]
    $patch = $parts[2]

    switch ($bumpType) {
        "major" {
            $major++
            $minor = 0
            $patch = 0
        }
        "minor" {
            $minor++
            $patch = 0
        }
        default {
            $patch++
        }
    }

    return "$major.$minor.$patch"
}

$repoRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $repoRoot

$versionFile = Join-Path $repoRoot "version.json"
$currentMeta = @{ version = "1.0.0" }

if (Test-Path $versionFile) {
    $raw = Get-Content $versionFile -Raw
    if ($raw.Trim()) {
        $currentMeta = $raw | ConvertFrom-Json
    }
}

$nextVersion = Get-NextVersion -currentVersion $currentMeta.version -bumpType $Bump
$now = Get-Date
$publishedAt = $now.ToString("yyyy-MM-ddTHH:mm:ssK")
$publishedAtDisplay = $now.ToString("dd-MM-yyyy HH:mm")

$newMeta = [ordered]@{
    version = $nextVersion
    publishedAt = $publishedAt
    publishedAtDisplay = $publishedAtDisplay
}

$newMeta | ConvertTo-Json | Set-Content -Path $versionFile -Encoding UTF8

git add version.json
git add .

if (-not $CommitMessage) {
    $CommitMessage = "chore: publish v$nextVersion"
}

git commit -m $CommitMessage

if (-not $NoPush) {
    git push
}

Write-Host "Publicado $nextVersion - $publishedAtDisplay"
