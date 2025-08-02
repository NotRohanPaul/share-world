# MongoDB base directory inside user's temp folder
$mongoBasePath = Join-Path ([System.IO.Path]::GetTempPath()) "mongodb\mongodb-windows"
$dataPath = Join-Path $mongoBasePath "data"
$logPath = Join-Path $mongoBasePath "logs"
$logFile = Join-Path $logPath "mongod.log"

# Ensure directories exist
foreach ($path in @($dataPath, $logPath)) {
    if (-not (Test-Path $path)) {
        New-Item -ItemType Directory -Path $path | Out-Null
    }
}

# Function to wait until MongoDB is ready
function Wait-ForMongo {
    param ([int]$TimeoutSeconds = 20)
    $waited = 0
    while ($waited -lt $TimeoutSeconds) {
        try {
            $test = mongosh --quiet --eval "db.adminCommand('ping').ok" 2>$null
            if ($test -eq 1) { return $true }
        }
        catch { }
        Start-Sleep -Seconds 1
        $waited++
    }
    return $false
}

# Trap Ctrl+C to stop MongoDB gracefully
Register-EngineEvent -SourceIdentifier ConsoleBreak -Action {
    Write-Host "`nStopping MongoDB..."
    try {
        mongosh --quiet --eval "db.adminCommand({ shutdown: 1 })" 2>$null
    }
    catch {
        Write-Host "MongoDB already stopped or could not connect."
    }
    Stop-Process -Name mongod -Force -ErrorAction SilentlyContinue
    exit
} | Out-Null

# Check if mongod is already running
if (Get-Process -Name mongod -ErrorAction SilentlyContinue) {
    Write-Host "MongoDB is already running. Press Ctrl+C to stop it."
    while ($true) { Start-Sleep -Seconds 1 }
}

# Build start command arguments as array
$mongodCommand = @(
    "--dbpath", $dataPath,
    "--logpath", $logFile,
    "--port", "27017",
    "--bind_ip", "127.0.0.1",
    "--replSet", "rs0",
    "--logappend"
)

# Start mongod in same terminal and log to file
Write-Host "Starting mongod..."
Start-Process mongod -ArgumentList $mongodCommand -NoNewWindow


# Wait for MongoDB to be ready
Write-Host "Waiting for MongoDB to start..."
if (-not (Wait-ForMongo -TimeoutSeconds 20)) {
    Write-Host "MongoDB failed to start in time." -ForegroundColor Red
    exit 1
}

# Check replica set status
Write-Host "Checking replica set status..."
$replStatus = mongosh --quiet --eval "try { rs.status().ok } catch(e) { 0 }"

if ($replStatus -ne 1) {
    Write-Host "Initializing replica set..."
    mongosh --quiet --eval "rs.initiate({_id: 'rs0', members: [{ _id: 0, host: '127.0.0.1:27017' }]})"
}
else {
    Write-Host "Replica set already initialized."
}

Write-Host "MongoDB is running. Press Ctrl+C to stop it."
while ($true) { Start-Sleep -Seconds 1 }
