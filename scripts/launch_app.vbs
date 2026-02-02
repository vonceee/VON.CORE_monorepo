Set WshShell = CreateObject("WScript.Shell")

Const BACKEND_DIR = "C:\Users\von\Website-Projects\Personal-Website\backend"
Const FRONTEND_DIR = "C:\Users\von\Website-Projects\Personal-Website\frontend"
Const ARTISAN_PATH = "C:\Users\von\Website-Projects\Personal-Website\backend\artisan"


' check if a process is running with a specific command line fragment
Function IsProcessRunning(processName, matchText)
    Dim objWMIService, colProcess, objProcess
    Set objWMIService = GetObject("winmgmts:{impersonationLevel=impersonate}!\\.\root\cimv2")
    Set colProcess = objWMIService.ExecQuery("Select * from Win32_Process Where Name = '" & processName & "'")
    
    IsProcessRunning = False
    For Each objProcess in colProcess
        On Error Resume Next
        If InStr(LCase(objProcess.CommandLine), LCase(matchText)) > 0 Then
            IsProcessRunning = True
            Exit For
        End If
        On Error GoTo 0
    Next
End Function



' start MariaDB (Global check)
If Not IsProcessRunning("mysqld.exe", "") Then
    WshShell.Run "C:\xampp\mysql_start.bat", 0, False
End If

' start laravel backend
WshShell.CurrentDirectory = BACKEND_DIR
' startup command: php "PATH\TO\ARTISAN" serve
If Not IsProcessRunning("php.exe", ARTISAN_PATH) Then
    WshShell.Run "cmd /c php """ & ARTISAN_PATH & """ serve", 0, False
End If

' start react frontend
WshShell.CurrentDirectory = FRONTEND_DIR
' startup command: node "PATH\TO\VITE"
If Not IsProcessRunning("node.exe", "vite") Then
    WshShell.Run "cmd /c npm run dev", 0, False
End If

' wait 5 seconds for the servers to actually boot up
WScript.Sleep 10000

' open the UI (do not wait for it to close)
WshShell.Run "chrome --app=http://localhost:3000 --kiosk", 1, False
