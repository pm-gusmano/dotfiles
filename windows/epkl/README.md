# EPKL

Windows source:

`C:\Users\User\Desktop\EPKL_Executable_v1-4-2\EPKL_Layouts_Override.ini`

Tracked file:

`windows/epkl/EPKL_Layouts_Override.ini`

To restore the tracked override into the Windows EPKL install from WSL:

```sh
scripts/sync-epkl-to-windows
```

Override the defaults when needed:

```sh
WINDOWS_USER=User scripts/sync-epkl-to-windows
EPKL_DIR=/mnt/c/Users/User/Desktop/EPKL_Executable_v1-4-2 scripts/sync-epkl-to-windows
```
