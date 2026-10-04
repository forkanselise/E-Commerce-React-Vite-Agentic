param([string]$DevHost = "dbehpl-eikdd.slsblx.com")
$p = "$env:WINDIR\System32\drivers\etc\hosts"
$rx = "(^|\s)$([regex]::Escape($DevHost))(\s|$)"
$active = @(Get-Content $p | Where-Object { $_ -notmatch '^\s*#' -and $_ -match $rx })
if ($active.Count -eq 0) { Add-Content -Path $p -Value "127.0.0.1 $DevHost" }
Write-Host "Hosts file updated. 127.0.0.1 -> $DevHost"
