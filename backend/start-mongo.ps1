
$mongodConfigPath = "\`"C:\Program Files\MongoDB\Server\8.0\bin\mongod.cfg\`""
$command = "mongod -f $mongodConfigPath"

$sendKeys = @"
    Set-Clipboard -Value '$command'
    Add-Type -AssemblyName System.Windows.Forms
    [System.Windows.Forms.SendKeys]::SendWait('^{v}')
    [System.Windows.Forms.SendKeys]::SendWait('~')
"@

Start-Process powershell -Verb runAs -ArgumentList '-NoExit', '-Command', $sendKeys
