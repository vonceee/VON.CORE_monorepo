Set WshShell = CreateObject("WScript.Shell")

' Paths
Const ARTISAN_PATH = "C:\Users\von\Website-Projects\Personal-Website\backend\artisan"

' Function to kill a process if its command line matches the text
Function KillProcessByPath(processName, matchText)
    Dim objWMIService, colProcess, objProcess
    Set objWMIService = GetObject("winmgmts:{impersonationLevel=impersonate}!\\.\root\cimv2")
    Set colProcess = objWMIService.ExecQuery("Select * from Win32_Process Where Name = '" & processName & "'")
    
    For Each objProcess in colProcess
        On Error Resume Next
        If InStr(LCase(objProcess.CommandLine), LCase(matchText)) > 0 Then
            objProcess.Terminate()
        End If
        On Error GoTo 0
    Next
End Function

' cleanup / shutdown
' Kill only OUR processes
KillProcessByPath "php.exe", ARTISAN_PATH
KillProcessByPath "node.exe", "vite"

' stop MariaDB (Global, but standard for this workflow)
WshShell.Run "C:\xampp\mysql_stop.bat", 0, True
