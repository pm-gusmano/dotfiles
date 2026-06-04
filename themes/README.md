# Themes

`current.toml` selects the active theme. Named theme files next to it hold the
actual palettes and semantic color roles.

The default mode is `auto`, which checks `DOTFILES_COLOR_SCHEME`, the Windows
app theme registry value when running in WSL, then GNOME `gsettings`. If no
system preference is available, it uses `fallback`.

To switch to light mode once, run:

```sh
scripts/render-theme --mode light
```

To keep light mode as the selector, set `mode = "light"` in `themes/current.toml`
and then run:

```sh
scripts/render-theme
```

To enable auto switching based on the system theme again, leave
`themes/current.toml` set to `mode = "auto"` and keep this running:

```sh
scripts/render-theme --watch --sync-windows-alacritty
```

That regenerates the checked-in configs for Alacritty, LazyVim, jjui, Zellij,
and Codex. If `~/.config/zellij` is not the stowed dotfiles path, the renderer
also patches that live Zellij config directory. The sync flag updates the
Windows Alacritty profile path.
