# If VSCode is running as admin in Windows(check the title bar [Administrator] will be written) then this script is not required directly run the $command . 
# We can also run the command as a service but I want to run the server as a terminal instance. 
# This script is useful if vscode is not running as admin which is normal in many case. 
# It runs a new admin powershell terminal and then paste the required command and then presses enter.
$mongodConfigPath = "\`"C:\Program Files\MongoDB\Server\8.0\bin\mongod.cfg\`""
$command = "mongod -f $mongodConfigPath"

$sendKeys = @"
    Set-Clipboard -Value '$command'
    Add-Type -AssemblyName System.Windows.Forms
    [System.Windows.Forms.SendKeys]::SendWait('^{v}')
    [System.Windows.Forms.SendKeys]::SendWait('~')
"@

Start-Process powershell -Verb runAs -ArgumentList '-NoExit', '-Command', $sendKeys
