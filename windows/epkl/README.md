# EPKL

Windows source:

`C:\Users\paulg.000\Desktop\EPKL\EPKL_Layouts_Override.ini`

Tracked file:

`windows/epkl/EPKL_Layouts_Override.ini`

To restore the tracked override into the Windows EPKL install from WSL:

```sh
scripts/sync-epkl-to-windows
```

Override the defaults when needed:

```sh
WINDOWS_USER=paulg.000 scripts/sync-epkl-to-windows
EPKL_DIR=/mnt/c/Users/paulg.000/Desktop/EPKL scripts/sync-epkl-to-windows
```
