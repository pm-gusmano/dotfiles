{
  description = "pm-gusmano's user tools";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    nixpkgs-apptainer.url = "github:NixOS/nixpkgs/master";
  };

  outputs =
    { self, nixpkgs, nixpkgs-apptainer }:
    let
      system = "x86_64-linux";
      pkgs = import nixpkgs { inherit system; };
      pkgsApptainer = import nixpkgs-apptainer { inherit system; };

      tools = with pkgs; [
        alacritty
        neovim
        nixd
        nixfmt
        atuin
        bat
        delta
        eza
        git
        jujutsu
        jjui
        just
        navi
        fd
        fzf
        ripgrep
        starship
        yazi
        zellij
        zoxide
        rustup
        uv
        docker
        pkgsApptainer.apptainer
        dep-tree
        difftastic
        ast-grep
        tree-sitter
        stow
      ];
    in
    {
      packages.${system} = {
        default = pkgs.buildEnv {
          name = "pm-gusmano-tools";
          paths = tools;
        };
      };

      devShells.${system}.default = pkgs.mkShell {
        packages = tools;
      };
    };
}
